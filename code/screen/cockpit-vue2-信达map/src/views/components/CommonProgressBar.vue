<template>
  <div class="common-progress-bar">
    <div
      :class="className"
      :style="{ width: Math.min(rate, 100) + '%' }"
      class="common-progress-bar-item"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CommonProgressBar",
  props: {
    rate: {
      type: Number,
      default: 50,
    },
    className: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.common-progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  .common-progress-bar-item {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(183deg, #fcc930 0%, #ff7700 100%);
    border-right: 2px solid #ffffff;
    &.blue {
      background: linear-gradient(270deg, #39deff 0%, #0077ff 97%);
    }
  }
}
</style>
