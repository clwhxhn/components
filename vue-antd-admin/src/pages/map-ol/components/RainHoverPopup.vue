<template>
  <div style="color: #fff;">hover</div>
</template>

<script>
export default {
  name: "WaterHoverPopup",

  props: {
    properties: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="less" scoped>
.hover-warp {
  width: 260px;
}
</style>

