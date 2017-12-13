<template>
  <div>
    <x-header :left-options="{backText: '返回'}" title="订单团详情">
      <div slot="right" @click="navigateToProducts">
        <span>点餐</span>
      </div>
    </x-header>
    <div>
      <div class="group-overview">
        <div class="group-line">
          <img :src="group.composer.avatar_url || 'static/avatar.png'" alt="头像" class="avatar">
          <span style="flex: 1;">{{group.composer.username}}</span>
          <span style="color: red;width: 100px;font-size: 1.2rem;text-align: right;">￥{{group.totalPrice}}</span>
        </div>
        <div class="group-line">
          <span>{{group.name}}</span>
        </div>
        <div class="group-line">
          <span>截止时间：{{group.due_time}}</span>
        </div>
      </div>

      <div v-if="orders.length === 0" class="orders-none">
        不存在的
      </div>
      <group v-for="order in orders" :key="order.user.id">
        <div slot="title" class="order-user">
          <img :src="order.user.avatar_url || 'static/avatar.png'" alt="头像" class="avatar">
          <span style="flex: 1;">{{order.user.username}}</span>
          <span style="color: red;width: 100px;font-size: 1.2rem;text-align: right;">￥{{order.totalPrice}}</span>
        </div>
        <cell v-for="row in order.rows"
              :key="row.id"
              :title="row.product_name"
              @click.native="confirmDelete(row)">
          <div>
            <span>× {{row.quantity}} = </span>
            <span>{{'￥' + row.total_price}}</span>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, Cell } from 'vux';
  import groupService from '@/api/group';

  export default {
    components: {
      XHeader, Group, Cell
    },
    created() {
      this.getGroupDetail(this.$route.params.groupId);
    },
    data() {
      return {
        group: {
          composer: {}
        },
        orders: []
      }
    },
    methods: {
      // 加载订单团详情
      getGroupDetail(groupId) {
        this.$vux.loading.show({
          text: '加载中'
        });
        groupService.getGroupDetail(groupId).then(({data}) => {
          this.$vux.loading.hide();
          this.group = data;
          this.initOrders(data.orders);
        });
      },
      // 按人初始化订单
      initOrders(orders) {
        const result = [];
        orders.forEach(order => {
          let obj = result.find(r => r.user.id === order.user_id);
          if (!obj) {
            obj = {
              user: order.user,
              rows: []
            };
            result.push(obj);
          }
          obj.rows.push(order);
        });

        // 计算每个人的总价
        for (let i = 0; i < result.length; i++) {
          const rows = result[i].rows;
          result[i].totalPrice = rows.map(r => r.total_price).reduce((p, c) => p + c, 0);
        }

        this.orders = result;
        this.group.totalPrice = orders.map(o => o.total_price).reduce((p, c) => p + c, 0);
      },
      // 跳转到添加订单页面
      navigateToProducts() {
        // TODO
      },
      // 确认是否删除订单
      confirmDelete(order) {
        // TODO
        console.log(order);
      }
    }
  }
</script>

<style scoped>
  .group-overview {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    box-shadow: #e2e2e2 0 0.5rem 0.5rem;
    background-color: white;
  }

  .group-line {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
  }

  .order-user {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 20px;
  }

  .avatar {
    height: 2rem;
    width: 2rem;
    border-radius: 1rem;
    margin-right: 0.5rem;
  }

  .orders-none {
    text-align: center;
    font-size: 1rem;
    color: #aaa;
    padding: 20px;
  }
</style>
