import BaseService from './base';

class GroupService extends BaseService {
  /**
   * 返回需要显示的订单团
   * @return {*}
   */
  listGroup() {
    return this.get('/group/listMobile');
  }

  /**
   * 获取订单团详细信息
   * @param groupId
   */
  getGroupDetail(groupId) {
    return this.get(`/group/get?id=${groupId}`);
  }

  /**
   * 新建订单团
   * @param group
   * @return {*}
   */
  addGroup(group) {
    return this.post('/group/add', group);
  }
}

export default new GroupService();
