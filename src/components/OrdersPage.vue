<template>
  <div>
    <div>
      <div class="group-overview">
        <div class="group-line">
          <f-avatar :src="group.composer.avatar_url" :size="2"></f-avatar>
          <span style="flex: 1;margin-left: 0.5rem;">{{group.composer.username}}</span>
          <span style="color: red;width: 100px;font-size: 1.2rem;text-align: right;">￥{{group.totalPrice}}</span>
        </div>
        <div class="group-line">
          <span>{{group.name}}</span>
        </div>
        <div class="group-line">
          <span>截止时间：{{group.due_time}}</span>
        </div>
      </div>

      <div v-if="orders.length === 0" class="none-tips">
        不存在的
      </div>
      <div class="orders-block">
        <group v-for="order in orders" :key="order.user.id">
          <div slot="title" class="order-user">
            <f-avatar :src="order.user.avatar_url" :size="2"></f-avatar>
            <span style="flex: 1;margin-left: 0.5rem;">{{order.user.username}}</span>
            <span style="color: red;width: 100px;font-size: 1.2rem;text-align: right;">￥{{order.totalPrice}}</span>
          </div>
          <cell v-for="row in order.rows"
                :key="row.id"
                :title="row.product_name"
                @click.native="confirmDelete(row)">
            <div>
              <span>× {{row.quantity}} = </span>
              <span>{{'￥' + row.total_price}}</span>
            </div>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { XHeader, Group, Cell } from 'vux';
  import FAvatar from '@/components/common/FAvatar';
  import groupService from '@/api/group';
  import orderService from '@/api/order';

  export default {
    components: {
      XHeader, Group, Cell, FAvatar
    },
    created() {
      this.$store.commit('setMainTitle', '订单团');

      this.groupId = this.$route.params.groupId;
      this.$store.commit('updateGroupId', {groupId: this.groupId});
      this.getGroupDetail();
    },
    data() {
      return {
        groupId: null,
        group: {
          composer: {}
        },
        orders: []
      }
    },
    methods: {
      // 加载订单团详情
      getGroupDetail() {
        groupService.getGroupDetail(this.groupId).then(({data}) => {
          this.group = data;
          this.initOrders(data.orders);
        });
      },
      // 按人初始化订单
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
      // 确认是否删除订单
      confirmDelete(order) {
        if (order.user_id !== this.user.id) {
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
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped lang="scss">
  $preview-height: 110px;

  .group-overview {
    height: $preview-height;
    padding: 0.5rem 1rem;
    box-shadow: #e2e2e2 0 0.5rem 0.5rem;
    background-color: white;
  }

  .group-line {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
  }

  .order-user {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 20px;
  }

  .orders-block {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: $preview-height + 30px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .none-tips {
    text-align: center;
    font-size: 1rem;
    color: #aaa;
    padding: 20px;
  }
</style>
