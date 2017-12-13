import BaseService from './base';

class ProfileService extends BaseService {
  /**
   * 获取登录用户信息
   * @return {AxiosPromise<T>}
   */
  profile() {
    return this.get('/profile');
  }
}

export default new ProfileService();
