import axios from 'axios';
import base from './base';

class ProfileService {
  /**
   * 获取登录用户信息
   * @return {AxiosPromise<T>}
   */
  profile() {
    return axios.get(base + '/profile');
  }
}

export default new ProfileService();
