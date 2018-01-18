<template>
  <div>
    <div class="group-overview" @click="showActionSheet()">
      <div class="group-deadline">
        截止时间为{{group.due_time}}
      </div>
      <div class="group">
        <div class="group-avatar">
          <f-avatar :src="group.composer.avatar_url" :size="40" :unit="'px'"></f-avatar>
          <span class="group-composer">{{group.composer.username}}</span>
        </div>
        <div class="group-main">
          <span class="group-name">{{group.name}}</span>
          <div v-if="formatDueTime(group.due_time) > 0 && group.status === 1" class="group-due">
            离截止时间还有<span style="color: red;">{{formatDueTime(group.due_time)}}</span>分钟
          </div>
          <div v-if="formatDueTime(group.due_time) <= 0 && group.status === 1" class="group-due">
            已经截止啦~
          </div>
        </div>
        <div class="group-status"
             :style="getGroupStatusStyleObj(group.status)">
          <span>{{formatGroupStatus(group.status) + '！'}}</span>
        </div>
      </div>
    </div>

    <sub-header class="order-sub-header" name="大家吃了什么"></sub-header>
    <div v-if="orders.length === 0" class="none-tips">
      不存在的
    </div>
    <div class="orders-block">
      <div class="user-order" v-for="order in orders" :key="order.user.id">
        <div class="user-detail">
          <f-avatar :src="order.user.avatar_url" :size="25" unit="px"></f-avatar>
          <span class="user-name">{{order.user.username}}</span>
          <span class="user-price">￥{{order.totalPrice}}</span>
        </div>
        <div class="order-detail" v-for="row in order.rows" :key="row.id">
          <span>{{row.product_name}}</span>
          <span>￥{{row.total_price}}</span>
        </div>
      </div>
    </div>

    <div class="ff-btn bottom-btn" @click="navigateToProducts()">
      <span>我也要点</span>
    </div>

    <!-- 更改团组状态 -->
    <actionsheet v-model="showAction"
                 :menus="statusMenus"
                 theme="android"
                 @on-click-menu="changeGroupStatus"></actionsheet>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { XHeader, Group, Cell, Actionsheet } from 'vux';
  import FAvatar from '@/components/common/FAvatar';
  import SubHeader from '@/components/common/SubHeader';
  import groupService from '@/api/group';
  import orderService from '@/api/order';
  import groupStatusMixin from '@/mixins/group-status';

  export default {
    mixins: [groupStatusMixin],
    components: {
      XHeader, Group, Cell, FAvatar, Actionsheet, SubHeader
    },
    created() {
      this.refreshGroupData(this.$route.params.groupId);
    },
    data() {
      return {
        showAction: false,
        statusMenus: [{
          label: '下单成功',
          value: '2'
        }, {
          label: '下单失败',
          value: '3'
        }],
        group: {
          composer: {}
        },
        orders: []
      }
    },
    methods: {
      /**
       * 刷新订单团信息
       */
      refreshGroupData(groupId) {
        groupService.getGroupDetail(groupId).then(({data}) => {
          this.group = data;
          this.initOrders(data.orders);
        });
      },
      /**
       * 按人初始化订单
       */
      initOrders(orders) {
        const result = [];
        orders.forEach(order => {
          let obj = result.find(r => r.user.id === order.user_id);
          if (!obj) {
            obj = {
              user: order.user,
              rows: []
            };
            result.push(obj);
          }
          obj.rows.push(order);
        });

        // 计算每个人的总价
        for (let i = 0; i < result.length; i++) {
          const rows = result[i].rows;
          result[i].totalPrice = rows.map(r => r.total_price).reduce((p, c) => p + c, 0);
        }

        this.orders = result;
        this.group.totalPrice = orders.map(o => o.total_price).reduce((p, c) => p + c, 0);
      },
      /**
       * 格式化过期时间
       * @param dueTime
       */
      formatDueTime(dueTime) {
        if (!dueTime) {
          return 0;
        }

        const date = new Date(dueTime.replace(/-/g, '/'));
        return Math.floor((date.getTime() - Date.now()) / 1000 / 60);
      },
      /**
       * 确认是否删除订单
       */
      confirmDelete(order) {
        if (order.user_id !== this.user.id || this.group.status !== 1) {
          return;
        }

        const that = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否删除该订单？',
          onCancel () {
          },
          onConfirm () {
            orderService.remove(order.id).then(res => {
              if (res.errno === 0) {
                that.$vux.toast.text('删除成功', 'middle');
                that.getGroupDetail();
              }
            });
          }
        });
      },
      /**
       * 判断是否是订单团创建人且为征集中状态才能改变状态
       */
      showActionSheet() {
        if (this.group.composer.id === this.user.id && this.group.status === 1) {
          this.showAction = true;
        }
      },
      /**
       * 改变订单团状态
       */
      changeGroupStatus(menuKey) {
        groupService.changeStatus(this.group.id, menuKey).then(data => {
          this.$vux.toast.text('更改成功', 'bottom');
          this.refreshGroupData(this.group.id);
        });
      },
      /**
       * 跳转至菜单页面
       */
      navigateToProducts() {
        this.$router.push(`/products/group/${this.group.id}`);
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/styles/custom.scss';

  .group-overview {
    box-shadow: 0 1px 3px $shadow-color;
  }

  .group-deadline {
    height: 28px;
    color: #FF5253;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $white-color;
  }

  .group {
    height: 80px;
    padding: 9px 15px;
    background-color: white;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .group-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .group-composer {
        width: 50px;
        word-wrap: break-word;
        font-size: 11px;
        color: $grey-color;
        text-align: center;
        line-height: 11px;
        padding-top: 4px;
      }
    }

    .group-main {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 15px;
      .group-name {
        font-size: 17px;
        color: $black-color;
      }
      .group-due {
        font-size: 13px;
        color: $grey-color;
      }
    }

    .group-status {
      width: 70px;
      font-size: 17px;
      text-align: right;
    }
  }

  // 订单详情
  .order-sub-header {
    margin: 10px 0;
  }

  .orders-block {
    position: absolute;
    top: 155px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .user-order {
      border-radius: 6px;
      margin: 0 auto;
      width: 90vw;
      padding: 5px;
      font-size: 17px;
      margin-bottom: 10px;

      &:nth-of-type(3n+1) {
        background-color: #F6490D;
      }
      &:nth-of-type(3n+2) {
        background-color: #59C0BE;
      }
      &:nth-of-type(3n+3) {
        background-color: #4A4A4A;
      }

      .user-detail {
        background-color: transparent;
        display: flex;
        align-items: center;
        margin: 9px 0;
        color: $white-color;
      }
      .user-name {
        margin-left: 5px;
        flex-grow: 1;
      }
      .user-price {
        padding-right: 15px;
      }
      .order-detail {
        background-color: $white-color;
        height: 47px;
        padding: 12px 15px 12px 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .none-tips {
    text-align: center;
    font-size: 1rem;
    color: $grey-color;
    padding: 20px;
  }

  // 我也点餐按钮
  .bottom-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
