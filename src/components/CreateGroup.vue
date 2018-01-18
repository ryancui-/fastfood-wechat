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

    <div class="ff-btn" @click="confirmCreateGroup()">
      <span>发起团</span>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, PopupPicker, XButton } from 'vux';
  import { formatDate, formatDateTime } from '@/utils/utils';
  import groupService from '@/api/group';

  export default {
    components: {
      Group, XInput, PopupPicker, XButton
    },
    created() {
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
      },
      /**
       * 确认新建订单团
       */
      confirmCreateGroup() {
        const newGroupData = this.$store.state.newGroupData;

        // 转换新建团组数据
        const params = {
          groupName: newGroupData.groupName
        };

        let now = Date.now();
        switch (newGroupData.dueTimeType) {
          case '1': // 15分钟后
            now += 15 * 60 * 1000;
            break;
          case '2':
            now += 30 * 60 * 1000;
            break;
          case '3':
            now += 60 * 60 * 1000;
            break;
          case '4':
            now += 2 * 60 * 60 * 1000;
            break;
        }

        params.dueTime = formatDateTime(new Date(now));

        groupService.addGroup(params).then(data => {
          console.log(data);
          this.$vux.toast.text('新建成功', 'bottom');
          this.$router.replace('/main/groups');
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/styles/custom.scss';
</style>
