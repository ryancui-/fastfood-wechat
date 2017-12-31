<template>
  <div id="app">
    <x-header :left-options="showBackOption" :title="mainTitle" v-if="url !== '/login'">
      <div v-if="url.startsWith('/orders')" slot="right" @click="navigateToProducts">
        <span>点餐</span>
      </div>
    </x-header>
    <transition :name="viewTransition">
      <router-view class="main-content"></router-view>
    </transition>
  </div>
</template>

<script>
  import { XHeader } from 'vux';
  import { mapState } from 'vuex';

  export default {
    name: 'app',
    components: {
      XHeader
    },
    methods: {
      navigateToProducts() {
        this.$router.push(`/products/group/${this.$store.state.groupId}`);
      }
    },
    computed: {
      url() {
        return this.$route.fullPath;
      },
      showBackOption() {
        return {
          backText: '',
          showBack: !['/main/groups', '/main/profile', '/', '/login'].includes(this.$route.fullPath)
        }
      },
      viewTransition() {
        switch (this.$store.state.direction) {
          case 'reverse':
            return 'router-out';
          case 'forward':
            return 'router-in';
          default:
            return '';
        }
      },
      ...mapState([
        'mainTitle'
      ])
    }
  };
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }

  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #app {
    height: 100%;
  }

  .router-out-enter-active,
  .router-out-leave-active,
  .router-in-enter-active,
  .router-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .router-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .router-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .router-in-enter {
    opacity: 1;
    transform: translate3d(100%, 0, 0);
  }

  .router-in-leave-active {
    opacity: 1;
    transform: translate3d(-100%, 0, 0);
  }

  .main-content {
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
</style>
