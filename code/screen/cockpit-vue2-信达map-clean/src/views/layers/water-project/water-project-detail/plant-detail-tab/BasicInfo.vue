<template>
  <div>
    <div class="sub-title">工程概况</div>
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
    <div class="sub-title">建设情况</div>
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
import { getAction } from "@/utils";
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
        { name: "projectName", label: "工程名称", width: "100%" },
        { name: "engTp", label: "工程性质" },
        { name: "projectCode", label: "工程编码" },
        { name: "engProTp", label: "工程类型" },
        { name: "desScale", label: "设计供水规模", unit: "m³/d" },
        { name: "addvcd", label: "所在区县" },
        { name: "supplyLoc", label: "所在位置" },
        { name: "longitude", label: "工程经度" },
        { name: "latitude", label: "工程纬度" },
        { name: "rangeOfSupply", label: "供水范围", width: "100%" },
        { name: "hygienicLicense", label: "是否有卫生许可证" },
      ],
      detailData2: [
        { name: "totalInvestment", label: "工程总投资额", unit: "万元" },
        { name: "izComplete", label: "完工验收" },
        { name: "startOfProduction", label: "建成投产时间" },
        { name: "startTimeOfSupply", label: "开始供水时间" },
        { name: "yearOfReport", label: "上报年度" },
      ],
      totalData: {},
    };
  },
  watch: {
    detailsData: {
      async handler(val) {
        console.log(val, "水厂详情数据");
        this.totalData = _.cloneDeep(val);
        const gcxz = getDictOptions("rws_eng_tp"); // 工程行政
        const gclx = getDictOptions("rws_eng_pro_type"); // 工程类型
        const sfpd = getDictOptions("rws_is_or_no"); // 是否判断
        const wgys = getDictOptions("rws_iz_complete"); // 完工验收
        const szqx = await this.getQxList(); // 所在区县

        const obj1 = gclx.find((i) => i.value == val.engProTp);
        this.totalData.engTp = obj1 && obj1.label;

        const obj2 = gclx.find((i) => i.value == val.engProTp);
        this.totalData.engProTp = obj2 && obj2.label;

        const obj3 = szqx.find((i) => i.value == val.addvcd);
        this.totalData.addvcd = obj3 && obj3.label;

        const obj4 = sfpd.find((i) => i.value == val.hygienicLicense);
        this.totalData.hygienicLicense = obj4 && obj4.label;

        const obj5 = wgys.find((i) => i.value == val.izComplete);
        this.totalData.izComplete = obj5 && obj5.label;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 获取区县
    getQxList() {
      return getAction("/rws/rws/rwsRegion/getFirstMenu", {
        regionType: 1,
      }).then((res) => {
        res.result.map((i) => {
          i.label = i.countyName;
          i.value = i.countyCode;
        });
        return res.result;
      });
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
