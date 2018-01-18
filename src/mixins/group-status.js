const groupStatusEnum = [{
  label: '征集中',
  value: 1
}, {
  label: '结束了',
  value: 2
}, {
  label: '没订到',
  value: 3
}];

const groupStatusStyle = [{
  status: 1,
  color: '#09BB07'
}, {
  status: 2,
  color: '#3432e6'
}, {
  status: 3,
  color: '#FF5253'
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
