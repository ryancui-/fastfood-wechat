import axios from 'axios';
import base from './base';

class AuthService {
  /**
   * 登录
   * @param params
   * @returns {AxiosPromise<T>}
   */
  login(params) {
    return axios.post(base + '/auth/login', params);
  }
}

export default new AuthService();
