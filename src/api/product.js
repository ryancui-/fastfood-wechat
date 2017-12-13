import BaseService from './base';

class ProductService extends BaseService {
  /**
   * 列出当天菜单列表
   */
  listToday() {
    return this.post('/product/list');
  }
}

export default new ProductService();
