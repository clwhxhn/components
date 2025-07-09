<template>
  <CommonPanel position="right">
    <ActionBar></ActionBar>
    <LegendBox></LegendBox>
    <PanelHeader>工程建设动态监管</PanelHeader>
    <div class="panel-content">
      <!-- 建设动态 -->
      <ConstructionDynamics></ConstructionDynamics>
      <!-- 复盘提升 -->
      <ReviewImprove></ReviewImprove>
    </div>
  </CommonPanel>
</template>

<script>
import CommonPanel from "@/views/components/CommonPanel.vue";
import PanelHeader from "@/components/PanelHeader.vue";
import ConstructionDynamics from "./components/construction-dynamics/ConstructionDynamics.vue";
import ReviewImprove from "./components/review-improve/ReviewImprove.vue";
import ActionBar from "./components/action-bar/ActionBar.vue";
import LegendBox from "../common/LegendBox/LegendBox.vue";

export default {
  components: {
    CommonPanel,
    PanelHeader,
    ConstructionDynamics,
    ReviewImprove,
    ActionBar,
    LegendBox
  },
};
</script>

<style lang="less" scoped>
.panel-content {
  padding: 0 10px;
}
</style>
