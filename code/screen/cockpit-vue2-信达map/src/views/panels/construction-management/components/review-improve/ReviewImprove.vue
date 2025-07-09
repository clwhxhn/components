<template>
  <div class="review-improve">
    <SectionHeader>复盘提升</SectionHeader>
    <!-- 投资 -->
    <InvestCard></InvestCard>
    <!-- 设施 -->
    <FacilitiesCard></FacilitiesCard>
    <!-- 效益 -->
     <BenefitCard></BenefitCard>
  </div>
</template>
<script>
import SectionHeader from "@/components/SectionHeader.vue";
import InvestCard from "./components/InvestCard.vue";
import FacilitiesCard from "./components/FacilitiesCard.vue";
import BenefitCard from "./components/BenefitCard.vue";

export default {
  components: { InvestCard, SectionHeader, FacilitiesCard, BenefitCard },
  data() {
    return {
      dataSource: {
        invest: {
          // 年度全口径水利投资金额
          amount1: 81.92,
          // 年度全口径水利投资同比上涨（下降）
          rate1: -18,
          // 年度全口径水利投资金额
          amount2: 118.34,
          // 年度全口径水利投资同比上涨（下降）
          rate2: 20.3,
          yearTarget: 426,
        },
      },
    };
  },
};
</script>
<style lang="less" scoped>
.review-improve {
  margin-top: 8px;
}
</style>
