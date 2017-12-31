<template>
  <div>
    <router-view class="content"></router-view>
    <tabbar>
      <tabbar-item :link="{path: '/main/groups', replace: true}" :selected="url === '/main/groups'">
        <span slot="label">点餐</span>
      </tabbar-item>
      <tabbar-item :link="{path: '/main/profile', replace: true}" :selected="url === '/main/profile'">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { XHeader, Tabbar, TabbarItem } from 'vux';
  import { mapState } from 'vuex';

  export default {
    components: {
      XHeader, Tabbar, TabbarItem
    },
    data() {
      return {
        title: ''
      }
    },
    computed: {
      url() {
        return this.$route.fullPath;
      },
      ...mapState([
        'mainTitle'
      ])
    }
  }
</script>

<style scoped>
  .content {
    bottom: 50px;
  }
</style>
