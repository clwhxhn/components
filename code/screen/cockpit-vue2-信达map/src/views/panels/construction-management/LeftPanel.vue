<template>
  <CommonPanel>
    <PanelHeader> 规划设计顶层谋划</PanelHeader>
    <div class="panel-content">
      <!-- 规划布局 -->
      <PlanningLayout></PlanningLayout>
      <!-- 前期推进 -->
      <EarlyAdvance></EarlyAdvance>
      <!-- 资金计划 -->
      <FundingPlan></FundingPlan>
    </div>
  </CommonPanel>
</template>

<script>
import PanelHeader from "@/components/PanelHeader.vue";
import CommonPanel from "@/views/components/CommonPanel.vue";
import PlanningLayout from "./components/planning-layout/PlanningLayout.vue";
import EarlyAdvance from "./components/early-advance/EarlyAdvance.vue";
import FundingPlan from "./components/funding-plan/FundingPlan.vue";
export default {
  components: {
    CommonPanel,
    PanelHeader,
    PlanningLayout,
    EarlyAdvance,
    FundingPlan,
  },
};
</script>

<style lang="less" scoped>
.panel-content {
  padding: 0 10px;
}
</style>
