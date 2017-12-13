<template>
  <div>
    <div v-for="group in groups" class="group">
      <div class="group-line">
        <img :src="group.composer.avatar_url || 'static/avatar.png'" alt="头像" class="avatar">
        <span>{{group.composer.username}}</span>
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

  export default {
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
        this.$vux.loading.show({
          text: 'Loading'
        });

        groupService.listActiveGroup().then(({errno, data}) => {
          this.$vux.loading.hide();
          if (errno === 0) {
            this.groups = data;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .group {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    box-shadow: #e2e2e2 0 0.5rem 0.5rem;
  }

  .group-line {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
  }

  .avatar {
    height: 2rem;
    width: 2rem;
    border-radius: 1rem;
    margin-right: 0.5rem;
  }
</style>
