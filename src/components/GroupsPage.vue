<template>
  <div>
    <sub-header class="group-sub-header" name="订单团"></sub-header>
    <div class="groups-block">
      <div v-if="groups.length === 0" class="group-none">
        <img :src="`${pathname}static/no-group.png`" height="106">
        <span class="none-text">暂时没有团噢！</span>
      </div>

      <div class="group" v-for="group in groups" @click="navigateToOrders(group)">
        <div class="group-avatar">
          <f-avatar :src="group.composer.avatar_url" :size="40" :unit="'px'"></f-avatar>
          <span class="group-composer">{{group.composer.username}}</span>
        </div>
        <div class="group-main">
          <span class="group-name">{{group.name}}</span>
          <div v-if="formatDueTime(group.due_time) > 0 && group.status === 1" class="group-due">
            离截止时间还有<span style="color: red;">{{formatDueTime(group.due_time)}}</span>分钟
          </div>
          <div v-if="formatDueTime(group.due_time) < 0 && group.status === 1" class="group-due">
            已经截止啦~
          </div>
        </div>
        <div class="group-status"
             :style="getGroupStatusStyleObj(group.status)">
          <span>{{formatGroupStatus(group.status) + '！'}}</span>
        </div>
      </div>
    </div>

    <sub-header class="order-sub-header" name="我的点单"></sub-header>
    <div class="finish-groups-block">
      <div class="finish-group" v-for="finishGroup in finishGroups">
        <div class="finish-group-date">
          {{formatFinishGroupTime(finishGroup.create_time)}}
        </div>
        <div class="finish-orders" v-for="order in finishGroup.orders">
          <span>{{order.product_name}}</span>
          <span>￥{{order.total_price}}</span>
        </div>
      </div>
    </div>

    <div class="ff-btn create-btn" @click="navigateToCreateGroup()">
      <span>我要发起</span>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux';
  import groupService from '@/api/group';
  import FAvatar from '@/components/common/FAvatar';
  import SubHeader from '@/components/common/SubHeader';
  import groupStatusMixin from '@/mixins/group-status';

  export default {
    mixins: [groupStatusMixin],
    components: {
      FAvatar, XButton, SubHeader
    },
    created() {
      this.fetchData();
    },
    data() {
      return {
        groups: [],
        finishGroups: []
      }
    },
    methods: {
      /**
       * 获取数据
       */
      fetchData() {
        groupService.listGroup().then(({errno, data}) => {
          if (errno === 0) {
            this.groups = data.slice(0, 2);
            this.finishGroups = data.filter(group => group.status === 2);
          }
        });
      },
      /**
       * 格式化过期时间
       * @param dueTime
       */
      formatDueTime(dueTime) {
        const date = new Date(dueTime.replace(/-/g, '/'));
        return Math.floor((date.getTime() - Date.now()) / 1000 / 60);
      },
      /**
       * 格式化订单时间
       */
      formatFinishGroupTime(timeStr) {
        return timeStr.substr(5, 11);
      },
      /**
       * 跳转到订单团详情页面
       */
      navigateToOrders(group) {
        this.$router.push(`/orders/${group.id}`);
      },
      /**
       * 跳转到新建订单团页面
       */
      navigateToCreateGroup() {
        this.$router.push('/createGroup');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/styles/custom.scss';

  // 当前团
  .group-sub-header {
    margin: 10px 0;
  }

  .groups-block {
    height: 195px;
  }

  .group {
    height: 91px;
    width: 90vw;
    padding: 18px 15px;
    margin: 10px auto;
    box-shadow: 0 1px 3px $shadow-color;
    background-color: $white-color;
    border-radius: 8px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    &:first-child {
      margin-top: 1px;
    }

    &:last-child {
      margin-bottom: 1px;
    }

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

  .group-none {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .none-text {
      font-size: 17px;
      color: $grey-color;
    }
  }

  // 我参与的订单列表
  .order-sub-header {
    margin: 20px 0 5px 0;
  }

  .finish-groups-block {
    position: absolute;
    bottom: 50px;
    top: 290px;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .finish-group {
    margin: 0 auto;
    width: 90vw;
    .finish-group-date {
      color: $grey-color;
      font-size: 13px;
      margin: 5px 0 5px 10px;
    }
    .finish-orders {
      height: 42px;
      padding: 9px 15px 9px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 17px;
      color: $black-color;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      background-color: $white-color;
      border-radius: 8px;
      box-sizing: border-box;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 1px;
      }
    }
  }

  // 发起团按钮
  .create-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
