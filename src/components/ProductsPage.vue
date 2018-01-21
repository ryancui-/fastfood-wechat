<template>
  <div>
    <img class="random-logo"
         :src="`${pathname}static/img/random_logo.png`"
         alt="点我随机选"
         @click="navigateToRandom()">

    <div class="product-list">
      <div class="category" v-for="category in productCategories" :key="category">
        <sub-header class="category-sub-header" :name="category"></sub-header>
        <div class="product" v-for="product in filterProducts(category)"
             :key="product.id"
             @click="showOrderAction(product)">
          <span>{{product.name + (product.spicy ? '🌶' : '')}}</span>
          <span>￥{{product.price}}</span>
        </div>
      </div>
    </div>

    <popup v-model="showPopup" is-transparent>
      <div class="popup-block">
        <div class="order-block">
          <span>{{selectedProduct.name}}</span>
          <div class="number-selector">
            <span class="minus-btn number-btn" @click="minus()">－</span>
            <span class="content">{{quantity}}</span>
            <span class="plus-btn number-btn" @click="plus()">＋</span>
          </div>
        </div>
        <div class="option-block" v-if="selectedProduct.product_options.length > 0">
          <checker
            v-model="remark"
            default-item-class="option-item"
            selected-item-class="option-item-selected">
            <checker-item v-for="option in selectedProduct.product_options" :key="option.id"
                          :value="option.option_name">{{ option.option_name }}
            </checker-item>
          </checker>
        </div>
        <div class="ff-btn" @click="confirmOrder()">
          <span>确认</span>
        </div>
      </div>
    </popup>
  </div>
</template>


<script>
  import { XHeader, Group, Cell, Popup, XButton, InlineXNumber, Checker, CheckerItem } from 'vux';
  import SubHeader from '@/components/common/SubHeader';
  import productService from '@/api/product';
  import orderService from '@/api/order';

  export default {
    components: {
      XHeader, Group, Cell, Popup, XButton,
      InlineXNumber, Checker, CheckerItem, SubHeader
    },
    created() {
      this.groupId = Number(this.$route.params.groupId);
      if (!this.groupId) {
        this.$vux.toast.text('没有选择订单团', 'bottom');
        this.$router.back();
      }

      this.listTodayProducts();
    },
    data() {
      return {
        productCategories: [
          '每旬菜式', '热销菜式', '明炉烧味', '滋补炖品', '天天靓汤', '港式粉面', '冷热饮品', '原盅蒸饭'
        ],
        groupId: null,
        products: [],
        showPopup: false,
        selectedProduct: {
          product_options: []
        },
        quantity: 1,
        remark: ''
      }
    },
    methods: {
      // 加载当天菜单列表
      listTodayProducts() {
        this.$vux.loading.show({
          text: '加载中'
        });
        productService.listToday().then(res => {
          this.$vux.loading.hide();
          if (res.errno === 0) {
            this.products = res.data.rows;
          }
        });
      },
      // 显示订单确认 Action
      showOrderAction(product) {
        this.quantity = 1;
        this.remark = '';
        this.selectedProduct = product;
        this.showPopup = true;
      },
      // 确认添加订单
      confirmOrder() {
        this.showPopup = false;
        this.$vux.loading.show({
          text: '添加订单中'
        });

        const params = {
          quantity: this.quantity,
          productId: this.selectedProduct.id,
          groupId: this.groupId,
          remark: this.remark
        };
        console.log(params);

        orderService.add(params).then(res => {
          this.$vux.loading.hide();
          if (res.errno === 0) {
            this.$vux.toast.text('添加订单成功', 'middle');
            this.$router.back();
          }
        });
      },
      filterProducts(category) {
        return this.products.filter(v => v.category === category);
      },
      /**
       * 跳转至抽奖页面
       */
      navigateToRandom() {
        this.$vux.toast.text('设计师在玩NS<br>没时间出图', 'middle');
      },
      minus() {
        this.quantity === 1 ? null : this.quantity--;
      },
      plus() {
        this.quantity++;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/styles/custom.scss';

  .random-logo {
    width: 100%;
  }

  .product-list {
    position: absolute;
    top: 51px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    .category {
      .category-sub-header {
        margin: 10px 0;
      }
      .product {
        width: 90vw;
        margin: 0 auto;
        height: 42px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 9px 15px 9px 10px;
        background-color: white;
        color: $black-color;
        box-sizing: border-box;
        border-radius: 8px;
        box-shadow: 0 1px 3px $shadow-color;
        margin-bottom: 10px;
        font-size: 17px;
      }
    }
  }

  // 弹出框样式
  .popup-block {
    background-color: #4A4A4A;
    .order-block, .option-block {
      padding: 15px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      color: white;
    }

    .option-block {
      margin: 11px 16px;
      padding: 0;
      padding-top: 11px;
      margin-top: 0;
      border-top: 1px #979797 solid;
    }
  }

  // 数字选择框样式
  .number-selector {
    display: flex;
    align-items: center;
    .number-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 16px;
    }
    .minus-btn {
      border: 1px solid $white-color;
      color: $white-color;
      background-color: transparent;
    }
    .plus-btn {
      border: 1px solid $theme-color;
      color: $black-color;
      background-color: $theme-color;
    }
    .content {
      font-size: 18px;
      background-color: transparent;
      width: 40px;
      color: $white-color;
      text-align: center;
    }
  }

  // 选项样式
  .option-item {
    background-color: transparent;
    color: $white-color;
    padding: 3px 22px;
    margin-right: 14px;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: center;
    border: 1px $white-color solid;
  }

  .option-item-selected {
    background-color: $theme-color;
    color: $black-color;
  }
</style>
