import BaseService from './base';

class ProductService extends BaseService {

  // 本地保存菜单列表
  products = null;

  /**
   * 列出当天菜单列表
   */
  listToday() {
    if (this.products) {
      return new Promise(resolve => {
        resolve(this.products);
      });
    } else {
      return this.post('/product/list').then(data => {
        this.products = data;
        return data;
      });
    }
  }
}

export default new ProductService();
