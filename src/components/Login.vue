<template>
  <Group label-width="90px">
    <x-input title="用户名"
             placeholder="输入用户名"
             v-model="params.username"
             :required="true"></x-input>
    <x-input type="password"
             placeholder="输入密码"
             title="密码"
             v-model="params.password"
             :required="true"></x-input>
    <XButton type="primary">登录</XButton>
  </Group>
</template>

<script>
  import { Group, XInput, XButton } from 'vux';

  export default {
    data() {
      return {
        params: {
          username: '',
          password: ''
        }
      };
    },
    components: {
      Group, XInput, XButton
    }
  };
</script>
