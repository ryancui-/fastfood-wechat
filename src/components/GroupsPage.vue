<template>
  <div class="groups-block">
    <div v-if="groups.length === 0" class="none-tips">
      不存在的
    </div>
    <div v-for="group in groups" class="group" @click="navigateToOrders(group)">
      <div class="group-line">
        <f-avatar :src="group.composer.avatar_url" :size="2"></f-avatar>
        <span style="margin-left: 0.5rem;">{{group.composer.username}}</span>
      </div>
      <div class="group-line">
        <span>{{group.name}}</span>
      </div>
      <div class="group-line">
        <span>截止时间：{{group.due_time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import groupService from '@/api/group';
  import FAvatar from '@/components/common/FAvatar';

  export default {
    components: {
      FAvatar
    },
    created() {
      this.$store.commit('setMainTitle', '点餐中');
      this.listActiveGroup();
    },
    data() {
      return {
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
      // 跳转到订单团详情页面
      navigateToOrders(group) {
        this.$router.push(`/orders/${group.id}`);
      }
    }
  }
</script>

<style scoped>
  .groups-block {
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .group {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    box-shadow: #e2e2e2 0 0.5rem 0.5rem;
    background-color: white;
  }

  .group-line {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
  }

  .none-tips {
    text-align: center;
    font-size: 1rem;
    color: #aaa;
    padding: 20px;
  }
</style>
