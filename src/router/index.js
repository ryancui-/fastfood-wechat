import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';

Vue.use(Router);

const routes = [{
  path: '/login',
  component: Login
}];

const router = new Router({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  }

  const token = localStorage.getItem('token');
  if (token) {
    next();
  } else {
    next('/login');
  }
});

export default router;
