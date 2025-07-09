<template>
  <div class="common-tab">
    <div
      :class="item.value === value ? 'active' : ''"
      class="common-tab-item"
      v-for="(item, idx) in options"
      :key="idx"
      @click.stop="onChange(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonTabV2",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      required: true,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style scoped lang="less">
.common-tab {
  display: flex;
  flex-wrap: nowrap;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  width: max-content;
  flex-shrink: 0;
  .common-tab-item {
    width: 140px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    background-size: 100% 100%;
    background-image: url("~@/assets/images/common/tab/tab-bg-2.png");
    margin-right: 3px;
    transition: all 0.3s;
    &.active {
      background-image: url("~@/assets/images/common/tab/tab-bg-2-active.png");
    }
  }
}
</style>
