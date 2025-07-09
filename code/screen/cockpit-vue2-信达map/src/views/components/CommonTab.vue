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
  name: "CommonTab",
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
  background: #014da3;
  padding: 3px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  width: max-content;
  flex-shrink: 0;
  .common-tab-item {
    min-width: 48px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    padding: 0 8px;
    &.active {
      background: linear-gradient(
          90deg,
          rgba(55, 207, 255, 0.72) 0%,
          rgba(0, 136, 255, 0.6) 22%,
          rgba(0, 134, 251, 0.4) 83%
        ),
        radial-gradient(0% 45% at 8% 84%, #68b6ff 0%, rgba(0, 133, 255, 0) 100%);
    }
  }
}
</style>
