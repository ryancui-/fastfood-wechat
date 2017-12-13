import BaseService from './base';

class GroupService extends BaseService {
  /**
   * 返回所有征集中的订单团
   * @return {*}
   */
  listActiveGroup() {
    return this.get('/group/listActive');
  }
}

export default new GroupService();
