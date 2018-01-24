<template>
  <div @touchstart="onTouchStart($event)" @touchend="onTouchEnd($event)">
    <div class="logo-text">
      <img :src="`${pathname}static/img/random/logo_text.png`" alt="">
    </div>

    <div class="main-block">
      <img v-if="!running" class="stick-up" :src="`${pathname}static/img/random/stick_up.png`" alt="">
      <img v-if="running" class="stick-down" :src="`${pathname}static/img/random/stick_down.png`" alt="">
      <img class="machine" :src="`${pathname}static/img/random/machine.png`" alt="">
      <img class="text" :src="`${pathname}static/img/random/text.png`" alt="">
      <img v-if="!running" class="arrow" :src="`${pathname}static/img/random/arrow.png`" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.groupId = Number(this.$route.params.groupId);
      if (!this.groupId) {
        this.$vux.toast.text('你是怎么进来这里的，回去！', 'bottom');
        this.$router.back();
      }
    },
    data() {
      return {
        running: false,
        groupId: null,
        startPoint: {x: null, y: null},
        pushed: false,
      }
    },
    methods: {
      onTouchStart(evt) {
        this.startPoint = {
          x: evt.touches[0].clientX,
          y: evt.touches[0].clientY
        }

        const xPersentage = this.startPoint.x / window.document.documentElement.clientWidth * 100;
        const yPersentage = this.startPoint.y / window.document.documentElement.clientWidth * 100;

        if (80 < xPersentage && xPersentage < 95 && 45 < yPersentage && yPersentage < 60) {
          this.pushed = true;
        }
      },
      onTouchEnd(evt) {
        const x = evt.changedTouches[0].clientX, y = evt.changedTouches[0].clientY;
        if (this.pushed && Math.abs(x - this.startPoint.x) < 50 && y - this.startPoint.y > 100) {
          this.running = true;
          setTimeout(() => {
            this.running = false;
          }, 2000);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .logo-text {
    margin-top: 21vw;
    text-align: center;
    img {
      width: 78vw;
    }
  }

  .main-block {
    position: relative;
    margin-top: 15vw;
    margin-left: 7vw;
    .machine {
      position: absolute;
      width: 76vw;
    }
    .text {
      position: absolute;
      left: 7.5vw;
      top: 13vw;
      width: 59vw;
    }
    .stick-up {
      position: absolute;
      left: 75vw;
      top: -8vw;
      width: 11vw;
    }
    .stick-down {
      position: absolute;
      left: 75vw;
      top: 25vw;
      width: 11vw;
    }
    .arrow {
      position: absolute;
      left: 76vw;
      width: 9vw;
      top: 35vw;
    }
  }
</style>
