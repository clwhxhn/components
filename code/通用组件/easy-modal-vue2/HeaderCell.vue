<template>
  <div class="header-cell"></div>
</template>
<script>
export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
    headerHeight: {
      type: String,
      default: "32px",
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
