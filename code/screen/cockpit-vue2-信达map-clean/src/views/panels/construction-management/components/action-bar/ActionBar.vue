<template>
  <div class="action-bar">
    <ActionReset></ActionReset>
    <ActionSearch></ActionSearch>
    <ActionBack></ActionBack>
    <ActionCollpase></ActionCollpase>
    <ActionLayer></ActionLayer>
    <ActionMonitor></ActionMonitor>
    <ActionRisk></ActionRisk>
    <ActionAi></ActionAi>
  </div>
</template>
<script>
import ActionAi from "./components/ActionAi.vue";
import ActionRisk from "./components/ActionRisk.vue";
import ActionBack from "./components/ActionBack.vue";
import ActionCollpase from "./components/ActionCollpase.vue";
import ActionLayer from "./components/ActionLayer.vue";
import ActionMonitor from "./components/ActionMonitor.vue";
import ActionSearch from "./components/ActionSearch.vue";
import ActionReset from "./components/ActionReset.vue";

export default {
  components: {
    ActionSearch,
    ActionBack,
    ActionCollpase,
    ActionLayer,
    ActionMonitor,
    ActionRisk,
    ActionAi,
    ActionReset,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.action-bar {
  position: absolute;
  top: 30px;
  right: calc(100% + 16px);

  /deep/ .action-item {
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
    position: relative;
    cursor: pointer;
    .action-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 1;
      transition: opacity 0.3s;
      background-size: 100%;
    }
    .action-bg-active {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity 0.3s;
      background-size: 100%;
    }
    &.is-active {
      .action-bg {
        opacity: 0;
      }
      .action-bg-active {
        opacity: 1;
      }
    }
    &:hover {
      .action-bg {
        opacity: 0;
      }
      .action-bg-active {
        opacity: 1;
      }
    }
  }
}
</style>
