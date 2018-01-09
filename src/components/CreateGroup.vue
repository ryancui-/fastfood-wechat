<template>
  <div>
    <group label-width="90px">
      <x-input title="标题"
               placeholder="输入标题"
               text-align="right"
               v-model="groupName"
               :debounce="500"
               :show-clear="false"
               @on-change="commitValue()"></x-input>
      <popup-picker title="截止时间"
                    :data="dueTimeOptions"
                    v-model="dueTimeType"
                    :show-name="true"
                    placeholder="选择截止时间"
                    @on-change="commitValue()"></popup-picker>
    </group>
  </div>
</template>

<script>
  import { Group, XInput, PopupPicker } from 'vux';
  import { formatDate } from '@/utils/utils';

  export default {
    components: {
      Group, XInput, PopupPicker
    },
    created() {
      this.$store.commit('setMainTitle', '新建订单团');
    },
    data() {
      return {
        dueTimeOptions: [[{
          name: '15分钟后',
          value: '1'
        }, {
          name: '30分钟后',
          value: '2'
        }, {
          name: '一小时后',
          value: '3'
        }, {
          name: '两小时后',
          value: '4'
        }]],
        dueTimeType: ['2'],
        groupName: formatDate(new Date()) + ' 订饭'
      }
    },
    methods: {
      /**
       * 向全局 store 提交当前输入值
       */
      commitValue(value) {
        this.$store.commit('setNewGroupData', {
          dueTimeType: this.dueTimeType[0],
          groupName: this.groupName
        });
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
