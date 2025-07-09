<template>
  <div class="easy-select">
    <div
      @click.stop="handleOpenPanel"
      class="easy-select-content"
      :class="{ 'is-disabled': disabled, 'has-value': !!currentLabel }"
    >
      <div class="select-content">{{ currentLabel || placeholder }}</div>
      <a-icon
        v-if="clearable"
        @click.stop="handleClear"
        class="close-icon"
        type="close"
      />
      <span class="select-arrow"></span>
    </div>
    <EasySelectPanel
      ref="panel"
      :value="value"
      :options="options"
      :panelVisible="panelVisible"
      @select="handleSelect"
    ></EasySelectPanel>
  </div>
</template>
<script>
import { useOutSideClickListener } from "@/utils/tooltip-utils";
import EasySelectPanel from "./EasySelectPanel.vue";

export default {
  components: { EasySelectPanel },
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    options: {
      default: () => [],
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    useOutSideClickListener(this, () => {
      this.handleClosePanel();
    });
  },
  data() {
    return {
      panelVisible: false,
    };
  },
  computed: {
    currentLabel() {
      const item = this.options.find((it) => it.value === this.value);
      return item ? item.label : "";
    },
  },
  methods: {
    handleOpenPanel() {
      if (this.disabled) return;
      this.panelVisible = !this.panelVisible;
    },
    handleClosePanel() {
      this.panelVisible = false;
    },
    handleSelect(it) {
      this.$emit("input", it.value);
      this.$emit("change", it);
      this.handleClosePanel();
    },
    handleClear() {
      this.$emit("input", null);
      this.$emit("change", null);
    },
  },
};
</script>
<style lang="less" scoped>
.easy-select {
  width: 100%;
  cursor: pointer;
  position: relative;
  .easy-select-content {
    height: 32px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 12px;
    background-image: url(~@/assets/images-new/common/select-bg.png);
    background-size: 100% 100%;
    &.is-disabled {
      cursor: not-allowed;
    }
    .close-icon {
      color: #fff;
      display: none;
    }
    &.has-value:hover {
      .close-icon {
        display: inline-block;
      }
    }
  }
  .select-content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  .select-arrow {
    margin-left: 8px;
    width: 12px;
    height: 12px;
    background-image: url(~@/assets/images-new/common/select-arrow.png);
    background-size: 100% 100%;
  }
}
</style>
