<template>
  <div>
    <div class="groups-block">
      <div v-if="groups.length === 0" class="none-tips">
        <img :src="`${pathname}static/no-group.png`" height="106">
        <span class="none-text">暂时没有团噢！</span>
      </div>
      <div v-for="group in groups" class="group" @click="navigateToOrders(group)">
        <div class="group-avatar">
          <f-avatar :src="group.composer.avatar_url" :size="40" :unit="'px'"></f-avatar>
          <span class="group-composer">{{group.composer.username}}</span>
        </div>
        <div class="group-main">
          <span class="group-name">{{group.name}}</span>
          <div class="group-due">
            离截止时间还有<span style="color: red;">{{formatDueTime(group.due_time)}}</span>分钟
          </div>
        </div>
        <div class="group-status">
          <span>{{formatStatus(group.status)}}</span>
        </div>
      </div>
    </div>
    <div class="create-btn" @click="navigateToCreateGroup()">
      <span>发起团</span>
    </div>
  </div>

</template>

<script>
  import { XButton } from 'vux';
  import groupService from '@/api/group';
  import FAvatar from '@/components/common/FAvatar';

  export default {
    components: {
      FAvatar, XButton
    },
    created() {
      this.$store.commit('setMainTitle', '所有团');
      this.listActiveGroup();
    },
    data() {
      return {
        pathname: process.env.ASSET_ROOT,
        groups: []
      }
    },
    methods: {
      // 获取订单团列表
      listActiveGroup() {
        groupService.listActiveGroup().then(({errno, data}) => {
          if (errno === 0) {
            this.groups = data;
          }
        });
      },
      /**
       * 格式化订单团状态
       * @param status
       * @return {*}
       */
      formatStatus(status) {
        switch (status) {
          case 1:
            return '征集中！';
          case 2:
            return '已完成！';
          case 3:
            return '已取消！';
        }
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
  $create-button-height: 51px;

  .groups-block {
    position: absolute;
    top: 0;
    bottom: 50px + $create-button-height;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .group {
    height: 91px;
    width: 90vw;
    padding: 18px 15px;
    margin: 10px auto;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    background-color: white;
    border-radius: 8px;
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
        color: #999999;
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
      }
      .group-due {
        font-size: 13px;
        color: #999999;
      }
    }

    .group-status {
      width: 70px;
      color: #09BB07;
      font-size: 17px;
      text-align: right;
    }
  }

  .create-btn {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    height: $create-button-height;
    background-color: #FEC640;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    &:hover {
      cursor: pointer;
    }
  }

  .none-tips {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .none-text {
      font-size: 17px;
      color: #999999;
    }
  }
</style>
