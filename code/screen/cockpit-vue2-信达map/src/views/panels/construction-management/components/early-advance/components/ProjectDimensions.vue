<template>
  <Dimensionlayout :layout="['detail', 'business', 'judgement']">
    <template #detail>
      <DetailDimension></DetailDimension>
    </template>
    <template #judgement="{ isActive }">
      <JudgementDimension :is-active="isActive"></JudgementDimension>
    </template>
    <template #business="{ isActive }">
      <BusinessDimension :is-active="isActive"></BusinessDimension>
    </template>
  </Dimensionlayout>
</template>
<script>
import Dimensionlayout from "@/components/dimension-layout/DimensionLayout.vue";
import JudgementDimension from "./JudgementDimension.vue";
import DetailDimension from "./DetailDimension.vue";
import BusinessDimension from "./BusinessDimension.vue";
export default {
  components: {
    Dimensionlayout,
    DetailDimension,
    JudgementDimension,
    BusinessDimension,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
