import BaseService from './base';

class GroupService extends BaseService {
  /**
   * 返回所有征集中的订单团
   * @return {*}
   */
  listActiveGroup() {
    return this.get('/group/listActive');
  }

  /**
   * 获取订单团详细信息
   * @param groupId
   */
  getGroupDetail(groupId) {
    return this.get(`/group/get?id=${groupId}`);
  }
}

export default new GroupService();