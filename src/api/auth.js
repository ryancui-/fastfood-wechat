import store from '@/store';
import BaseService from './base';

class AuthService extends BaseService {
  /**
   * 登录
   * @param params
   * @returns {AxiosPromise<T>}
   */
  login(params) {
    return this.post('/auth/login', params).then(res => {
      if (res.errno === 0) {
        localStorage.setItem('token', res.data.token);

        store.commit('setToken', res.data.token);
        store.commit('setUser', res.data.userInfo);
      }
      return res;
    });
  }

  /**
   * 退出登录
   * @return {Promise}
   */
  logout() {
    return new Promise(resolve => {
      localStorage.removeItem('token');

      store.commit('resetToken');
      store.commit('resetUser');

      resolve();
    });
  }
}

export default new AuthService();
