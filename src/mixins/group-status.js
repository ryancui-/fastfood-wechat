const groupStatusEnum = [{
  label: '征集中',
  value: 1
}, {
  label: '已完成',
  value: 2
}, {
  label: '已取消',
  value: 3
}];

const groupStatusStyle = [{
  status: 1,
  color: '#09BB07'
}, {
  status: 2,
  color: '#2624a8'
}, {
  status: 3,
  color: '#c51c21'
}];

export default {
  methods: {
    /**
     * 格式化订单团状态
     * @param status
     * @return {*}
     */
    formatGroupStatus(status) {
      const obj = groupStatusEnum.find(obj => obj.value === status);
      return obj ? obj.label : '';
    },
    /**
     * 返回订单团状态的 style object
     * @param status
     * @return {{color}}
     */
    getGroupStatusStyleObj(status) {
      const obj = groupStatusStyle.find(obj => obj.status === status);
      return {
        'color': obj ? obj.color : ''
      };
    }
  }
};
