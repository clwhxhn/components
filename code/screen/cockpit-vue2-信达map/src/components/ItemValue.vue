<template>
  <span class="primary-text value-unit-pair">
    <span class="value-span">{{ value }}</span>
    <span class="unit-span">{{ unit }}</span>
    <span v-if="showArrow" class="arrow-icon"></span>
  </span>
</template>
<script>
export default {
  name: "ItemValue",
  props: {
    value: {
      type: [String, Number],
      default: "-",
    },
    unit: {
      type: String,
      default: "",
    },
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.value-span {
  line-height: 22px;
  font-size: 16px;
  font-weight: bold;
  font-family: D-DIN, D-DIN;
}
.unit-span {
  font-size: 12px;
}
.arrow-icon {
  vertical-align: middle;
  display: inline-block;
  width: 16px;
  height: 14px;
  margin-left: 4px;
  background-image: url(~@/assets/images-new/common/arrow.png);
  background-size: 100% 100%;
  margin-top: -4px;
}
</style>
