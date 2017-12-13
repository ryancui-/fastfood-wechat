import BaseService from './base';

class OrderService extends BaseService {
  /**
   * 添加新订单
   * @param params
   */
  add(params) {
    return this.post('/order/create', params);
  }

  /**
   * 删除订单
   * @param orderId
   */
  remove(orderId) {
    return this.post('/order/remove', {
      id: orderId
    });
  }
}

export default new OrderService();
