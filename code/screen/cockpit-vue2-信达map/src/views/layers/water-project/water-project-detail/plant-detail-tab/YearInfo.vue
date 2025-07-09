<template>
  <div>
    <div class="sub-title">供水情况</div>
    <div class="details-content">
      <div
        v-for="item in detailData1"
        :key="item.name"
        class="item-detail"
        :style="{ width: item.width ? '100%' : '50%' }"
      >
        <span class="label">{{ item.label }}：</span>
        <span class="detail">{{ totalData[item.name] || "-" }}</span>
        <span class="detail">{{ item.unit }}</span>
      </div>
    </div>
    <div class="sub-title">水费水价</div>
    <div class="details-content">
      <div
        v-for="item in detailData2"
        :key="item.name"
        class="item-detail"
        :style="{ width: item.width ? '100%' : '50%' }"
      >
        <span class="label">{{ item.label }}：</span>
        <span class="detail">{{ totalData[item.name] || "-" }}</span>
        <span class="detail">{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDictOptions } from "@/utils/dict";
import _ from "lodash";

export default {
  name: "BasicInfo",
  props: {
    detailsData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      detailData1: [
        { name: "izIntergrationProject", label: "是否城乡一体化供水工程" },
        { name: "desPopulation", label: "设计供水人口", unit: "人" },
        { name: "servicePopulation", label: "实际服务人口", unit: "人" },
        { name: "supplyToHouseholds", label: "其中供水到户人数", unit: "人" },
        {
          name: "solveFluHouseholds",
          label: "其中解决的饮水型氟超标人数",
          unit: "人",
        },
        { name: "mlivestockNum", label: "规模养殖大牲畜数量", unit: "头" },
        { name: "leakagePer", label: "管网漏损率", unit: "%" },
        { name: "actualWaterSupply", label: "年实际供水量", unit: "m³" },
      ],
      detailData2: [
        { name: "costWaterPrice", label: "全成本水价", unit: "元/m³" },
        {
          name: "operationCostWaterPrice",
          label: "运行成本水价",
          unit: "元/m³",
        },
        { name: "actualWaterPrice", label: "居民生活执行水价", unit: "元/m³" },
        { name: "rateOfCollection", label: "水费收缴率", unit: "%" },
        { name: "incomeAndExpenses", label: "收支情况" },
        { name: "chargeMode", label: "计费方式" },
        { name: "chargeModeDesc", label: "计费方式说明" },
      ],
      totalData: {},
    };
  },
  watch: {
    detailsData: {
      async handler(val) {
        console.log(val, "水厂详情数据");
        this.totalData = _.cloneDeep(val);
        const szqk = getDictOptions("rws_income_and_expenses"); // 收支情况
        const jffs = getDictOptions("rws_charge_mode"); // 计费方式
        const sfpd = getDictOptions("rws_is_or_no"); // 是否判断

        const obj1 = szqk.find((i) => i.value == val.incomeAndExpenses);
        this.totalData.incomeAndExpenses = obj1 && obj1.label;

        const obj2 = jffs.find((i) => i.value == val.chargeMode);
        this.totalData.chargeMode = obj2 && obj2.label;

        const obj3 = sfpd.find((i) => i.value == val.izIntergrationProject);
        this.totalData.izIntergrationProject = obj3 && obj3.label;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.sub-title {
  width: 198px;
  height: 24px;
  background-image: url("~@/assets/images/water-use/sub-title-bkg.png");
  background-size: 100% 100%;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  line-height: 24px;
  padding-left: 30px;
}
.details-content {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 10px 50px;

  .item-detail {
    width: 50%;
    margin-bottom: 15px;

    .label {
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
    }

    .detail {
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #5fd4fe;
    }
  }
}
</style>
