<template>
  <div>
    <router-view class="content"></router-view>
    <tabbar>
      <tabbar-item :link="{path: '/main/groups', replace: true}" :selected="url === '/main/groups'">
        <span slot="label">团</span>
        <img slot="icon" :src="`${pathname}static/img/groups.png`">
        <img slot="icon-active" :src="`${pathname}static/img/groups-active.png`">
      </tabbar-item>
      <tabbar-item :link="{path: '/main/profile', replace: true}" :selected="url === '/main/profile'">
        <span slot="label">是我</span>
        <img slot="icon" :src="`${pathname}static/img/profile.png`">
        <img slot="icon-active" :src="`${pathname}static/img/profile-active.png`">
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
      }
    }
  }
</script>

<style scoped>
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
  }
</style>
