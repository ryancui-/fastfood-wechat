<template>
  <div>
    <div class="product-list">
      <group title="菜单列表">
        <cell v-for="product in products"
              :key="product.id"
              @click.native="showOrderAction(product)">
          <div slot="title">
            <span>{{product.name}}</span>
          </div>
          <div>
            <span>￥{{product.price}}</span>
          </div>
        </cell>
      </group>
    </div>

    <popup v-model="showPopup" is-transparent>
      <div class="order-block">
        <div style="text-align: center;">
          {{selectedProduct.name}}
        </div>
        <group>
          <cell title="数量">
            <inline-x-number style="display:block;" :min="1" width="50px" button-style="round"
                             v-model="quantity"></inline-x-number>
          </cell>
          <cell v-if="selectedProduct.product_options.length !== 0"
                title="选项" :value="remark" is-link @click.native="showOptionPopup = !showOptionPopup;"></cell>
          <cell title="总价" :value="selectedProduct.price * quantity"></cell>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="confirmOrder">确定</x-button>
        </div>
      </div>
    </popup>

    <popup v-model="showOptionPopup" is-transparent>
      <div class="option-block">
        <checker
          v-model="remark"
          default-item-class="option-item"
          selected-item-class="option-item-selected">
          <checker-item v-for="option in selectedProduct.product_options" :key="option.id"
                        :value="option.option_name" @on-item-click="onOptionClick()">{{ option.option_name }}
          </checker-item>
        </checker>
      </div>
    </popup>
  </div>
</template>


<script>
  import { XHeader, Group, Cell, Popup, XButton, InlineXNumber, Checker, CheckerItem } from 'vux';
  import productService from '@/api/product';
  import orderService from '@/api/order';

  export default {
    components: {
      XHeader, Group, Cell, Popup, XButton, InlineXNumber, Checker, CheckerItem
    },
    created() {
      this.$store.commit('setMainTitle', '菜单');

      this.groupId = Number(this.$route.params.groupId);
      if (!this.groupId) {
        this.$vux.toast.text('没有选择订单团', 'bottom');
        this.$router.back();
      }

      this.listTodayProducts();
    },
    data() {
      return {
        groupId: null,
        products: [],
        showPopup: false,
        showOptionPopup: false,
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
          text: '加载菜单中'
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
      onOptionClick() {
        this.showOptionPopup = false;
      }
    }
  }
</script>

<style scoped>
  .order-block {
    background-color: #fff;
    margin: 0 auto;
    padding-top: 10px;
  }

  .option-block {
    background-color: rgb(238, 238, 238);
    padding: 1rem;
    height: 50px;
  }

  .option-item {
    background-color: #ddd;
    color: #222;
    padding: 5px 10px;
    margin-right: 10px;
    line-height: 18px;
    border-radius: 15px;
  }

  .option-item-selected {
    background-color: #FF3B3B;
    color: #fff;
  }
</style>
