// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import axios from 'axios';
import { LoadingPlugin, ToastPlugin } from 'vux';

import App from './App';
import router from './router';
import store from './store';

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

// axios 拦截器
axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('auth') !== -1) {
    return config;
  } else if (store.state.token) {
    config.headers['authorization'] = store.state.token;
    return config;
  }
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app-box');
