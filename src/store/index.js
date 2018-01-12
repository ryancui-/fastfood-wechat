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
    user: {},

    // 主界面 title
    mainTitle: '',

    // 已选择的订单团内容
    group: {},

    // 新建订单团的数据
    newGroupData: {}
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
    },

    // 设置主界面 title
    setMainTitle(state, payload) {
      state.mainTitle = payload;
    },

    // 更新订单团ID
    updateGroup(state, payload) {
      state.group = payload;
    },

    // 设置新建订单团的数据
    setNewGroupData(state, payload) {
      state.newGroupData = payload;
    }
  }
});

export default store;
