<template>
  <!-- 点击地图站点_弹框组件 -->
  <div class="click-warp">
    <div class="header">
      <span class="title">
        {{ title }}
      </span>
      <span class="close" @click="handleClose"><a-icon type="close" /></span>
    </div>
    <div class="detail-content">
      <slot name="detail"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClickPopup',
  components: {},
  props: {
    properties: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.click-warp {
  width: 600px;
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
    .close {
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      color: #4e89ff;
    }
  }
  .detail-content {
    width: 100%;
  }
}
</style>
