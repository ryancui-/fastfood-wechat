import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Login from '@/components/Login';
import Main from '@/components/Main';
import GroupsPage from '@/components/GroupsPage';
import ProfilePage from '@/components/ProfilePage';
import OrdersPage from '@/components/OrdersPage';
import ProductsPage from '@/components/ProductsPage';

import profileService from '@/api/profile';
import authService from '@/api/auth';

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: '/main'
}, {
  path: '/login',
  component: Login
}, {
  path: '/main',
  component: Main,
  children: [{
    path: '',
    redirect: 'groups'
  }, {
    path: 'groups',
    component: GroupsPage
  }, {
    path: 'profile',
    component: ProfilePage
  }]
}, {
  path: '/orders/:groupId',
  component: OrdersPage
}, {
  path: '/products/group/:groupId',
  component: ProductsPage
}];

const router = new Router({
  routes
});

let historyStack = [];
let isPush = false;
let endTime = Date.now();
let methods = ['push', 'go', 'replace', 'forward', 'back'];

document.addEventListener('touchend', () => {
  endTime = Date.now();
});
methods.forEach(key => {
  let method = router[key].bind(router);
  router[key] = function (...args) {
    isPush = true;
    method.apply(null, args);
  };
});

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('Before', historyStack);
  const toIndex = historyStack.indexOf(to.path);

  if (to.path === '/login') {
    store.commit('updateDirection', {direction: historyStack.length === 0 ? '' : 'forward'});
    historyStack = ['/login'];
  } else if (toIndex !== -1) {
    // 判断是否是ios左滑返回
    if (!isPush && (Date.now() - endTime) < 377) {
      store.commit('updateDirection', {direction: ''});
    } else {
      store.commit('updateDirection', {direction: 'reverse'});
    }

    // 将回退之后的记录全部删掉
    historyStack.splice(toIndex + 1, historyStack.length - toIndex);
  } else {
    if (historyStack.length > 0) {
      store.commit('updateDirection', {direction: 'forward'});
    } else {
      store.commit('updateDirection', {direction: ''});
    }

    // 第一次进入不同页面时，historyStack 会相应压入不同页面
    if (historyStack.length === 0) {
      var matches;
      if (matches = to.path.match(/\/orders\/(.*)/)) {
        historyStack.push('/main/groups');
      } else if (matches = to.path.match(/\/products\/group\/(.*)/)) {
        historyStack.push('/main/groups');
        historyStack.push(`/orders/${matches[1]}`);
      }
    }

    historyStack.push(to.path);
  }
  console.log('After', historyStack);


  if (to.path === '/login') {
    next();
  }
  const token = store.state.token || localStorage.getItem('token');
  if (token) {
    store.commit('setToken', token);
    if (store.state.user.id === undefined) {
      profileService.profile().then(res => {
        if (res.errno === 0) {
          store.commit('setUser', res.data);
          next();
        } else {
          authService.logout().then(() => {
            next('/login');
          });
        }
      });
    } else {
      next();
    }
  } else {
    next('/login');
  }
});

router.afterEach(function (to) {
  isPush = false;
});

export default router;
