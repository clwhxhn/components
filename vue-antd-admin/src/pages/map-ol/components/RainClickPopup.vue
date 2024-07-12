<template>
 <div style="color: #fff;">点击</div>
</template>

<script>
export default {
  name: "RainClickPopup",

  props: {
    properties: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.click-warp {
  width: 700px;
  background: rgba(243, 246, 251, 1);
  border-radius: 8px;
}
</style>
