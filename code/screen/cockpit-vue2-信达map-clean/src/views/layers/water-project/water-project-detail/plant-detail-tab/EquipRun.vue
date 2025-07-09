<template>
  <div>
    <div class="sub-title">净化消毒</div>
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
    <div class="sub-title">水质化验</div>
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
        { name: "purification", label: "净化方式" },
        { name: "runOfPurification", label: "净化运行状况" },
        { name: "purificationDesc", label: "净化方式说明" },
        { name: "disinfection", label: "消毒方式" },
        { name: "runOfDisinfection", label: "消毒运行状况" },
        { name: "disinfectionDesc", label: "消毒方式说明" },
      ],
      detailData2: [
        { name: "izLaboratory", label: "是否建立水质化验室" },
        { name: "runOfLaboratory", label: "水质化验室运行状况" },
        { name: "outWaterIndex", label: "出厂水日检指标" },
        { name: "otherIndex", label: "其他检测指标" },
        { name: "result", label: "水质检测结果" },
        { name: "resultDesc", label: "水质检测结果说明" },
      ],
      totalData: {},
    };
  },
  watch: {
    detailsData: {
      async handler(val) {
        console.log(val, "水厂详情数据");
        this.totalData = _.cloneDeep(val);
        const jhfs = getDictOptions("rws_purification"); // 净化方式
        const yxqk = getDictOptions("rws_run_of_state"); // 运行情况
        const xdfs = getDictOptions("rws_disinfection"); // 消毒方式
        const rjzb = getDictOptions("rws_out_water_index"); // 出厂水日检指标
        const jcjg = getDictOptions("rws_water_quality_result"); // 水质检测结果
        const sfpd = getDictOptions("rws_is_or_no"); // 是否判断

        const obj1 = jhfs.find((i) => i.value == val.purification);
        this.totalData.purification = obj1 && obj1.label;

        const obj2 = yxqk.find((i) => i.value == val.runOfPurification);
        this.totalData.runOfPurification = obj2 && obj2.label;

        const obj3 = xdfs.find((i) => i.value == val.disinfection);
        this.totalData.disinfection = obj3 && obj3.label;

        const obj4 = rjzb.find((i) => i.value == val.outWaterIndex);
        this.totalData.outWaterIndex = obj4 && obj4.label;

        const obj5 = jcjg.find((i) => i.value == val.result);
        this.totalData.result = obj5 && obj5.label;

        const obj6 = yxqk.find((i) => i.value == val.runOfDisinfection);
        this.totalData.runOfDisinfection = obj6 && obj6.label;

        const obj7 = sfpd.find((i) => i.value == val.izLaboratory);
        this.totalData.izLaboratory = obj7 && obj7.label;

        const obj8 = yxqk.find((i) => i.value == val.runOfLaboratory);
        this.totalData.runOfLaboratory = obj8 && obj8.label;
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
