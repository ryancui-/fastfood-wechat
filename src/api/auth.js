import axios from 'axios';
import base from './base';
import store from '@/store';

class AuthService {
  /**
   * 登录
   * @param params
   * @returns {AxiosPromise<T>}
   */
  login(params) {
    return axios.post(base + '/auth/login', params).then(res => {
      if (res.errno === 0) {
        store.commit('setToken', res.data.token);
        store.commit('setUser', res.data.userInfo);
      }
      return res;
    });
  }
}

export default new AuthService();
