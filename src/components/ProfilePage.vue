<template>
  <div>
    <div class="avatar-block">
      <f-avatar :src="user.avatar_url" :size="5"></f-avatar>
      <span style="margin-top: 1rem;">{{user.username}}</span>
    </div>
    <group>
      <cell title="退出登录" :is-link="true" @click.native="logout"></cell>
    </group>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Group, Cell } from 'vux';
  import FAvatar from '@/components/common/FAvatar';
  import authService from '@/api/auth';

  export default {
    components: {
      Group, Cell, FAvatar
    },
    created() {
      this.$store.commit('setMainTitle', '我的信息');
    },
    methods: {
      logout() {
        authService.logout().then(() => {
          this.$vux.toast.text('已退出登录', 'middle');
          this.$router.replace('/login');
        });
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>
  .avatar-block {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40%;
  }
</style>
