<template>
  <div>
    <div class="logo">
      <img :src="`${pathname}static/img/logo.png`" alt="Logo">
    </div>

    <div class="login-form">
      <div class="form-row">
        <span class="form-label">用户名</span>
        <input type="text" v-model="params.username">
      </div>
      <div class="form-row">
        <span class="form-label">密码</span>
        <input type="password" v-model="params.password">
      </div>
    </div>

    <div class="ff-btn login-btn" @click="login()">
      <span>登录</span>
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

<style scoped lang="scss">
  @import 'src/styles/custom.scss';

  .logo {
    text-align: center;
    margin-top: 57px;
    img {
      height: 70px;
    }
  }

  .login-form {
    width: 75vw;
    margin: 0 auto;
    margin-top: 100px;
    .form-row {
      padding: 3px 10px;
      border-bottom: 1px $theme-color solid;
      display: flex;
      align-items: center;
      font-size: 17px;
      margin: 30px 0;
      .form-label {
        color: $theme-color;
        width: 100px;
      }
      input {
        flex-grow: 1;
        outline: 0;
        border: 0;
        background-color: transparent;
        font-size: 17px;
      }
    }
  }

  .login-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
