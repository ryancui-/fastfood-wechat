<template>
  <div class="wrapper">
    <div style="height: 50%;">
      <group label-width="90px">
        <x-input title="用户名"
                 placeholder="输入用户名"
                 v-model="params.username"
                 :required="true"></x-input>
        <x-input type="password"
                 placeholder="输入密码"
                 title="密码"
                 v-model="params.password"
                 :required="true"></x-input>
      </group>
      <div class="btn">
        <x-button type="primary" @click.native="login()">登录</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, XButton, Toast } from 'vux';
  import md5 from 'js-md5';
  import authService from '@/api/auth';

  export default {
    components: {
      Group, XInput, XButton
    },
    data() {
      return {
        params: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      login() {
        const params = Object.assign({}, this.params);
        params.password = md5(params.password);

        // 显示
        this.$vux.loading.show({
          text: 'Loading'
        });
        authService.login(params).then(res => {
          this.$vux.loading.hide();

          if (res.errno === 0) {
            this.$router.replace('/main/groups');
          } else {
            this.$vux.toast.text(res.errmsg, 'middle');
          }
        });
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .btn {
    margin-top: 1rem;
    padding: 0 1rem;
  }
</style>
