<template>
  <div>
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
        { name: "inWaterType", label: "取水类型" },
        { name: "waterSource", label: "水源类型" },
        { name: "waterSourceName", label: "水源名称" },
        { name: "waterWellsNum", label: "水源井数量" },
        { name: "waterSourceLon", label: "水源地经度" },
        { name: "waterSourceLat", label: "水源地纬度" },
        { name: "waterSourceStatus", label: "水源状况" },
        { name: "waterSourceQualityDesc", label: "水源水质状况说明" },
        { name: "protectionZone", label: "是否划定水源保护区或保护范围" },
        { name: "waterIntakingLicense", label: "是否有取水许可证" },
        {
          name: "surfaceWaterElevation",
          label: "地表水水源固定式取水口门底板高程",
          unit: "m",
        },
      ],
      totalData: {},
    };
  },
  watch: {
    detailsData: {
      async handler(val) {
        console.log(val, "水厂详情数据");
        this.totalData = _.cloneDeep(val);
        const qslx = getDictOptions("rws_supply_project_in_water_source"); // 取水类型
        const sylx = getDictOptions("rws_supply_project_water_source"); // 水源类型
        const syqk = getDictOptions("rws_water_source_status"); // 水源情况
        const sfpd = getDictOptions("rws_is_or_no"); // 是否判断

        const obj1 = qslx.find((i) => i.value == val.inWaterType);
        this.totalData.inWaterType = obj1 && obj1.label;

        const obj2 = sylx.find((i) => i.value == val.waterSource);
        this.totalData.waterSource = obj2 && obj2.label;

        const obj3 = syqk.find((i) => i.value == val.waterSourceStatus);
        this.totalData.waterSourceStatus = obj3 && obj3.label;

        const obj4 = sfpd.find((i) => i.value == val.protectionZone);
        this.totalData.protectionZone = obj4 && obj4.label;

        const obj5 = sfpd.find((i) => i.value == val.waterIntakingLicense);
        this.totalData.waterIntakingLicense = obj5 && obj5.label;
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
