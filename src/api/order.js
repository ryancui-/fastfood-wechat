import BaseService from './base';

class OrderService extends BaseService {
  /**
   * 添加新订单
   * @param params
   */
  add(params) {
    return this.post('/order/create', params);
  }
}

export default new OrderService();
