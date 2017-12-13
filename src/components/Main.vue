<template>
  <div>
    <x-header :left-options="{showBack: false}" :title="mainTitle"></x-header>
    <router-view></router-view>
    <tabbar>
      <tabbar-item link="/main/groups" :selected="url === '/main/groups'">
        <span slot="label">点餐</span>
      </tabbar-item>
      <tabbar-item link="/main/profile" :selected="url === '/main/profile'">
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

</style>
