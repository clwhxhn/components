<template>
  <div class="legend-item">
    <div class="icon-wrapper">
      <template v-if="item.icon">
        <img :src="item.icon" class="legend-icon" alt="" />
      </template>
      <template v-else-if="item.color">
        <span
          class="legend-icon color-block"
          :style="{
            backgroundColor: item.color,
            borderColor: item.borderColor || item.color,
          }"
        ></span>
      </template>
    </div>
    <span class="legend-label">
      {{ item.label }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    /** @type {import('@/types/legend').LegendItem} */
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.legend-item {
  line-height: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  .icon-wrapper {
    width: 14px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    .legend-icon {
      width: 100%;
    }
    .color-block {
      height: 14px;
      border: 1px solid;
    }
  }
  .legend-label {
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    white-space: nowrap;
  }
}
</style>
