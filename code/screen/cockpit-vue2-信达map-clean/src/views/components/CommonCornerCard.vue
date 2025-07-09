<template>
  <div class="common-corner-card">
    <div class="corner-1 corner-item"></div>
    <div class="corner-2 corner-item"></div>
    <div class="corner-3 corner-item"></div>
    <div class="corner-4 corner-item"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CommonCornerCard",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.common-corner-card {
  width: 100%;
  height: 100%;
  position: relative;
  background: radial-gradient(
      0% 45% at 8% 84%,
      #68b6ff 0%,
      rgba(0, 133, 255, 0) 100%
    ),
    rgba(22, 139, 255, 0.26);
  .corner-item {
    position: absolute;
    height: 2px;
    width: 10px;
    background-color: #5db7dc;
    &.corner-1 {
      top: 0;
      left: 0;
    }
    &.corner-2 {
      top: 0;
      right: 0;
    }
    &.corner-3 {
      bottom: 0;
      left: 0;
    }
    &.corner-4 {
      bottom: 0;
      right: 0;
    }
  }
}
</style>
