<template>
  <div id="app">
    <transition :name="viewTransition">
      <router-view class="main-content"></router-view>
    </transition>
  </div>
</template>

<script>
  import { formatDateTime } from '@/utils/utils';

  export default {
    name: 'app',
    computed: {
      viewTransition() {
        switch (this.$store.state.direction) {
          case 'reverse':
            return 'router-out';
          case 'forward':
            return 'router-in';
          default:
            return '';
        }
      }
    }
  };
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body .weui-tabbar {
    background-color: #ffffff;
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
    background-image: url('../static/img/bg.png');
    background-size: 100%;
  }

  .router-out-enter-active,
  .router-out-leave-active,
  .router-in-enter-active,
  .router-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    bottom: 0;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
