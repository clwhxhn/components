<template>
  <!-- 鼠标移入地图站点_弹框组件 -->
  <div class="hover-warp">
    <div class="header">
      <span class="title"> {{ properties.name || properties.stName }} </span>
    </div>
    <div class="detail-content">
      <div v-for="(item, index) in lists" :key="index">
        <span class="label">{{ item.title }}：</span>
        <span class="value">{{
          typeof item.value == 'string' || typeof item.value == 'number'
            ? item.value + item.unit
            : '暂无数据'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoverPopup',
  props: {
    properties: {
      type: Object,
      default: () => ({})
    },
    lists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.hover-warp {
  width: 210px;
  background: rgba(243, 246, 251, 1);
  border-radius: 8px;
  .header {
    width: 100%;
    height: 32px;
    background: linear-gradient(90deg, #3377ff 0%, #cfe2ff 100%);
    display: flex;
    border-radius: 8px 8px 0 0;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    .title {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .detail-content {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    > div {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 2px 0;
      .label {
        white-space: nowrap;
        color: #3384ff;
      }
      .value {
        color: #252525;
      }
    }
  }
}
</style>

