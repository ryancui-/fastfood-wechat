<template>
  <div>
    <div class="logo">
      <img :src="`${pathname}static/img/logo.png`" alt="Logo">
    </div>

    <div class="login-form">
      <div class="form-row">
        <span class="form-label">账号</span>
        <input type="text" v-model="params.username">
      </div>
      <div class="form-row">
        <span class="form-label">密码</span>
        <input type="password" v-model="params.password">
      </div>
      <div class="register-link" @click="toRegister()">没有账号？这里注册！</div>
      <div class="ff-btn login-btn" @click="login()">
        <span>登录</span>
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
      },
      toRegister() {
        this.$vux.toast.text('程序猿沉迷奥德赛<br>无心编码', 'middle');
      }
    }
  };
</script>

<style scoped lang="scss">
  @import 'src/styles/custom.scss';

  .logo {
    text-align: center;
    margin-top: 80px;
    img {
      height: 70px;
    }
  }

  .login-form {
    width: 77vw;
    margin: 0 auto;
    margin-top: 25px;
    height: 235px;
    border-radius: 8px;
    background-color: $white-color;
    box-shadow: 0 1px 3px $shadow-color;
    padding: 40px 26px 0 26px;
    box-sizing: border-box;
    .form-row {
      padding: 14px 6px 5px 6px;
      border-bottom: 1px $theme-color solid;
      display: flex;
      align-items: center;
      font-size: 17px;
      &:nth-child(2) {
        margin: 15px 0 37px 0;
      }
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
        text-align: right;
      }
    }

    .register-link {
      text-align: center;
      font-size: 13px;
      color: $grey-color;
    }

    .login-btn {
      border-radius: 8px;
      margin: 9px auto;
    }
  }


</style>
