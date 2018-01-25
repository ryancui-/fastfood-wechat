<template>
  <div @touchstart="onTouchStart($event)" @touchend="onTouchEnd($event)">
    <div class="logo-text">
      <img :src="`${pathname}static/img/random/logo_text.png`" alt="">
    </div>

    <div class="main-block">
      <img v-if="!running" class="stick-up" :src="`${pathname}static/img/random/stick_up.png`" alt="">
      <img v-if="running" class="stick-down" :src="`${pathname}static/img/random/stick_down.png`" alt="">
      <img class="machine" :src="`${pathname}static/img/random/machine.png`" alt="">
      <img v-if="!running" class="arrow" :src="`${pathname}static/img/random/arrow.png`" alt="">
    </div>
    <div class="text-block">
      <div class="text-1"
           :class="{'text-1-running': running}"
           :style="{'background-image': `url(${pathname}static/img/random/text_1.png)`}"></div>
      <div class="text-2"
           :class="{'text-2-running': running}"
           :style="{'background-image': `url(${pathname}static/img/random/text_2.png)`}"></div>
      <div class="text-3"
           :class="{'text-3-running': running}"
           :style="{'background-image': `url(${pathname}static/img/random/text_3.png)`}"></div>
    </div>

    <div class="envelope-block">
      <img v-if="running" class="envelope" :class="{'envelope-running': running}"
           :src="`${pathname}static/img/random/envelope.png`" alt="">
    </div>

    <div class="bg" :class="{'bg-running': running}" @click.self="stop()">
      <div class="result" :class="{'result-running': running}">
        <img :src="`${pathname}static/img/random/today.png`" alt="">
        <span class="name">{{result.name}}</span>
        <div class="btn" @click="confirmOrder()">
          <span>我点啦!</span>
        </div>
        <div class="one-more-time" @click="oneMoreTime()">
          <span>不好，再来一次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductService from '@/api/product';
  import OrderService from '@/api/order';

  export default {
    created() {
      ProductService.listToday().then(res => {
        // 只随机选饭
        this.products = res.data.rows.filter(product => product.name.indexOf('饭') !== -1);
        console.log(this.products);
      });

      this.groupId = Number(this.$route.params.groupId);
      if (!this.groupId) {
        this.$vux.toast.text('你是怎么进来这里的，回去！', 'bottom');
        this.$router.back();
      }
    },
    data() {
      return {
        running: false,
        products: null,
        result: {},
        groupId: null,
        startPoint: {x: null, y: null},
        pushed: false,
      }
    },
    methods: {
      /**
       * 点击摇杆准备
       */
      onTouchStart(evt) {
        if (this.running) {
          return;
        }

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
      /**
       * 松开事件
       */
      onTouchEnd(evt) {
        const x = evt.changedTouches[0].clientX, y = evt.changedTouches[0].clientY;
        if (!this.running && this.pushed && Math.abs(x - this.startPoint.x) < 50 && y - this.startPoint.y > 100) {
          this.pushed = false;
          this.running = true;
          this.randomChoose();
        }
      },
      /**
       * 再抽一次
       */
      oneMoreTime() {
        this.running = false;
        setTimeout(() => {
          this.running = true;
          this.randomChoose();
        }, 200);
      },
      /**
       * 取消抽奖
       */
      stop() {
        this.running = false;
      },
      /**
       * 下订单了
       */
      confirmOrder() {
        this.$vux.loading.show({
          text: '添加订单中'
        });

        const params = {
          quantity: 1,
          productId: this.result.id,
          groupId: this.groupId
        };

        OrderService.add(params).then(res => {
          this.$vux.loading.hide();
          if (res.errno === 0) {
            this.$vux.toast.text('添加订单成功', 'middle');
            this.$router.go(-2);
          }
        });
      },
      /**
       * 随机抽取菜单列表中的一个菜品
       */
      randomChoose() {
        const index = Math.ceil(Math.random() * (this.products.length - 1));
        this.result = this.products[index];
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/styles/custom.scss';

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
      animation: 1s flink infinite;
    }

    @keyframes flink {
      0% {
        transform: translateY(-4vw);
      }
      50% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-4vw);
      }
    }
  }

  .text-block {
    position: relative;
    margin-left: 7vw;
    height: 17vw;
    margin-top: 28vw;
    overflow: hidden;
    .text-1 {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 8vw;
      width: 15vw;
      background-size: 15vw;
      background-position: 0vw -25vw;
    }
    .text-2 {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 29.5vw;
      width: 15vw;
      background-size: 15vw;
      background-position: 0vw -25vw;
    }
    .text-3 {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50.5vw;
      width: 15vw;
      background-size: 15vw;
      background-position: 0vw -25vw;
    }
    .text-1-running {
      transition: background-position 3s ease-out;
      background-position: 0vw calc(-3vw - 15 * 24vw);
    }
    .text-2-running {
      transition: background-position 3s 0.2s ease-out;
      background-position: 0vw calc(-3vw - 15 * 24vw);
    }
    .text-3-running {
      transition: background-position 3s 0.4s ease-out;
      background-position: 0vw calc(-3vw - 15 * 24vw);
    }
  }



  .envelope-block {
    position: relative;
    margin-left: 7vw;
    height: 40vh;
    margin-top: 13vw;
    overflow: hidden;
    .envelope {
      position: absolute;
      left: 20vw;
      width: 33.5vw;
      transform: translateY(-100%);
    }
    .envelope-running {
      animation: 2.5s 1.1s envelope-rolling linear forwards, 0.1s 3.6s envelope-open linear forwards;
    }

    @keyframes envelope-rolling {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }

    @keyframes envelope-open {
      from {
        transform: translateY(100%);
        opacity: 1;
      }
      to {
        transform: scale(1.1);
        opacity: 0;
      }
    }
  }

  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
    opacity: 0;

    .result {
      border-radius: 8px;
      background-color: $white-color;
      width: 75vw;
      height: 85vw;
      text-align: center;

      img {
        position: relative;
        width: 91vw;
        left: -8vw;
        top: -12vw;
      }

      .name {
        position: relative;
        top: -52vw;
        display: inline-block;
        width: 25vw;
        height: 16vw;
        color: $white-color;
        font-size: 4.5vw;
        overflow: hidden;
      }
      .btn {
        background-color: $theme-color;
        height: 13vw;
        width: 60vw;
        padding: 10px 0;
        font-size: 4.5vw;
        margin: 0 auto;
        border-radius: 8px;
        position: relative;
        top: -30vw;
        box-sizing: border-box;
        color: $white-color;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .one-more-time {
        margin-top: 6px;
        font-size: 4vw;
        color: $grey-color;
        position: relative;
        top: -30vw;
      }
    }
  }

  .bg-running {
    animation: 0.5s 3.6s bg-appear ease-out forwards;
  }

  .result-running {
    animation: 0.5s 3.6s result-open ease-out forwards;
  }

  @keyframes bg-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes result-open {
    from {
      transform: scale(0.2);
      opacity: 0;
    }
    90% {
      transform: scale(1.2);
      opacity: 1;
    }
    to {
      opacity: 1;
    }
  }
</style>
