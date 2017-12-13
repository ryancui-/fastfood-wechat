<template>
  <div>
    <div class="avatar-block">
      <img :src="user.avatar_url || 'static/avatar.png'" class="avatar">
      <span>{{user.username}}</span>
    </div>
    <group>
      <cell title="退出登录" :is-link="true" @click.native="logout"></cell>
    </group>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Group, Cell } from 'vux';
  import authService from '@/api/auth';

  export default {
    components: {
      Group, Cell
    },
    created() {
      this.$store.commit('setMainTitle', '我的信息');
    },
    methods: {
      logout() {
        authService.logout().then(() => {
          this.$vux.toast.text('已退出登录', 'middle');
          this.$router.push('/login');
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40%;
  }

  .avatar {
    height: 5rem;
    width: 5rem;
    border-radius: 2.5rem;
    margin-bottom: 1rem;
  }
</style>
