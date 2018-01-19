<template>
  <div>
    <div class="avatar-block">
      <f-avatar :src="user.avatar_url" :size="90" unit="px"></f-avatar>
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
  import FAvatar from '@/components/common/FAvatar';
  import authService from '@/api/auth';

  export default {
    components: {
      Group, Cell, FAvatar
    },
    created() {
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

<style scoped lang="scss">
  @import 'src/styles/custom.scss';

  .avatar-block {
    margin: 30px 0 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      margin-top: 10px;
      font-size: 15px;
      color: $black-color;
    }
  }
</style>
