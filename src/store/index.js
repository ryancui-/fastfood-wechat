import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 单一模块，将来有需要可改造成多模块
const store = new Vuex.Store({
  state: {
    // transition direction
    direction: '',

    // JWT token
    token: '',
    // user info
    user: {}
  },
  mutations: {
    updateDirection(state, payload) {
      state.direction = payload.direction;
    },

    // 设置 token
    setToken(state, payload) {
      state.token = payload;
    },
    resetToken(state) {
      state.token = '';
    },

    // 设置 user
    setUser(state, payload) {
      state.user = payload;
    },
    resetUser(state) {
      state.user = {};
    }
  }
});

export default store;
