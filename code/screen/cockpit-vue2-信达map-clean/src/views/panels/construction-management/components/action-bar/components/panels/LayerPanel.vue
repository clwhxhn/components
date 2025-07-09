<template>
  <transition name="translate">
    <div class="layer-panel" v-show="panelVisible">
      <a-row v-for="it in baseLayers" :key="it.layerName">
        <a-checkbox
          :checked="isChecked(it)"
          @change="handleToggleLayer(it)"
          :value="it.key"
          >{{ it.layerName }}</a-checkbox
        >
      </a-row>
    </div>
  </transition>
</template>
<script>
import { useOutSideClickListener } from "@/utils/tooltip-utils";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  props: {
    panelVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    layers() {
      return this.getLayerValue$();
    },
  },
  data() {
    return {
      baseLayers: [
        {
          layerName: "区县",
          key: "qxLayer",
        },
        {
          layerName: "河流",
          key: "riverLayer",
        },
        {
          layerName: "行政区划",
          key: "xzLayer",
        },
        // {
        //   layerName: "项目",
        //   key: ["projectLayer","countLayer"],
        // },
        // {
        //   layerName: "安全问题整改率",
        //   key: "safetyProblemRateLayer",
        // },
        // {
        //   layerName: "质量问题整改率",
        //   key: "qualityProblemRateLayer",
        // },
      ],
    };
  },
  mounted() {
    useOutSideClickListener(
      this,
      () => {
        this.$emit('close');
      },
      this.$el.parentElement
    );
  },
  methods: {
    handleToggleLayer(it) {
      const keys = typeof it.key === "string" ? [it.key] : it.key;
      if (this.isChecked(it)) {
        this.hideLayers$(keys);
      } else {
        this.showLayers$(keys);
      }
    },
    isChecked(it) {
      const keys = typeof it.key === "string" ? [it.key] : it.key;
      // 配置有多个图层key时，有一个图层显示了就视为选中
      return keys.some((it) => this.layers.includes(it));
    },
  },
};
</script>
<style lang="less" scoped>
.layer-panel {
  position: absolute;
  top: 0;
  z-index: 99999;
  right: 50px;
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(64, 137, 226, 1),
      rgba(117, 190, 243, 0.33)
    )
    1 1;
  width: 160px;
  pointer-events: all;
  background: rgba(0, 51, 102, 0.8);
  box-shadow: inset 0px -2px 6px 0px #2296f0;
  transition: all 300ms;
  user-select: none;
  padding: 12px;
  &::after {
    position: absolute;
    top: 15px;
    right: -7px;
    width: 7px;
    height: 14px;
    background-image: url(~@assets/images/common/action-bar/panel_arrow.png);
    background-size: 100% 100%;
    content: "";
  }
  /deep/ .ant-checkbox-wrapper {
    color: #fff;
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: all 0.3s;
}

.translate-enter,
.translate-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
