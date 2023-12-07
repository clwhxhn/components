<template>
  <div class="wrap-tabs">
    <div
      v-for="(item, i) in list"
      :key="'tabs' + i"
      :class="actived === i ? 'tab-actived' : ''"
      class="tab-item"
      @click="onChange(i)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /**
     * tabs 下标索引
     */
    value: {
      type: [String, Number],
      default: 0,
    },
    /**
     * tabs数组
     */
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * 点击跳转不选中,数组对应list下标
     */
    clickLink: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      actived: 0,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val !== undefined) {
          this.actived = val;
        } else {
          this.actived = 0;
        }
      },
      immediate: true,
    },
  },
  methods: {
    onChange(val) {
      if (!this.clickLink.includes(val)) {
        this.actived = val;
        this.$emit('change', val);
      } else {
        this.$emit('clickLinkChange', val);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-tabs {
  display: flex;
  align-items: center;
  height: 34px;
  .tab-item {
    height: 100%;
    line-height: 34px;
    min-width: 98px;
    // text-indent: 20px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
    font-weight: normal;
    color: #c0d7ff;
    background: url('~@/assets/img/water-resource/tabs-bg.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .tab-actived {
    color: #ffffff;
    background: url('~@/assets/img/water-resource/switch-bg.png') center center no-repeat;
    background-size: 100% 100%;
  }
}
.wrap-tabs > :nth-child(2 + n) {
  margin-left: 7px;
}
</style>
