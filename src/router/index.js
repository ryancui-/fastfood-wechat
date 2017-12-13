import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Login from '@/components/Login';
import Main from '@/components/Main';
import GroupsPage from '@/components/GroupsPage';
import ProfilePage from '@/components/ProfilePage';

import profileService from '@/api/profile';

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
}];

const router = new Router({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  }

  const token = store.state.token || localStorage.getItem('token');
  if (token) {
    store.commit('setToken', token);
    if (store.state.user.id === undefined) {
      profileService.profile().then(res => {
        store.commit('setUser', res.data);
        next();
      });
    } else {
      next();
    }
  } else {
    next('/login');
  }
});

export default router;
