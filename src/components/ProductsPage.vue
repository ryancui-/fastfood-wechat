<template>
  <div>
    <x-header :left-options="{backText: '返回'}" title="菜单"></x-header>

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
      <div style="background-color:#fff;margin:0 auto;padding-top:10px;">
        <div style="text-align: center;">
          {{selectedProduct.name}}
        </div>
        <group>
          <cell title="数量">
            <inline-x-number style="display:block;" :min="1" width="50px" button-style="round"
                             v-model="quantity"></inline-x-number>
          </cell>
          <cell title="总价" :value="selectedProduct.price * quantity"></cell>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="confirmOrder">确定</x-button>
        </div>
      </div>
    </popup>
  </div>
</template>


<script>
  import { XHeader, Group, Cell, Popup, XButton, InlineXNumber } from 'vux';
  import productService from '@/api/product';
  import orderService from '@/api/order';

  export default {
    components: {
      XHeader, Group, Cell, Popup, XButton, InlineXNumber
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
        groupId: null,
        products: [],
        showPopup: false,
        selectedProduct: {},
        quantity: 1
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
          groupId: this.groupId
        };
        console.log(params);

        orderService.add(params).then(res => {
          this.$vux.loading.hide();
          if (res.errno === 0) {
            this.$vux.toast.text('添加订单成功', 'middle');
            this.$router.back();
          }
        });
      }
    }
  }
</script>

<style scoped>
  .product-list {
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
</style>
