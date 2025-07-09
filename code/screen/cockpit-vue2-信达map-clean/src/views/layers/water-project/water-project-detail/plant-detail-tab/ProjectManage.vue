<template>
  <div>
    <div class="sub-title">自动化监控</div>
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
    <div class="sub-title">运行管理</div>
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
        { name: "izComMonitoring", label: "是否有计算机监控系统" },
        { name: "runOfComMonitoring", label: "运行情况" },
        { name: "izVideoMonitoring", label: "是否有视频安防系统" },
        { name: "runOfVideoMonitoring", label: "运行情况" },
      ],
      detailData2: [
        { name: "managementName", label: "工程运行管理单位名称" },
        { name: "managementType", label: "工程运行管理单位性质" },
        {
          name: "managementMembers",
          label: "工程专职运行管理人员数",
          unit: "人",
        },
        { name: "managementTopName", label: "工程上级行政主管单位名称" },
        { name: "otherManagementName", label: "其他上级行政主管单位名称" },
        { name: "otherManagementType", label: "其他上级行政主管单位性质" },
        { name: "managePersonTel", label: "供水单位负责人联系电话" },
        { name: "managePersonName", label: "供水单位负责人姓名" },
        { name: "serviceHotline", label: "供水单位服务热线" },
        { name: "maintenanceTel", label: "供水单位维修电话" },
        { name: "izSignboard", label: "是否落实标志牌" },
        { name: "izEmergency", label: "是否有应急预演" },
      ],
      totalData: {},
    };
  },
  watch: {
    detailsData: {
      async handler(val) {
        console.log(val, "水厂详情数据");
        this.totalData = _.cloneDeep(val);
        const yxqk = getDictOptions("rws_run_of_state"); // 运行情况
        const dwxz = getDictOptions("rws_management_type"); // 工程运行管理单位性质
        const sjdw = getDictOptions("rws_other_management_type"); // 其他上级行政主管单位性质
        const sfpd = getDictOptions("rws_is_or_no"); // 是否判断

        const obj1 = yxqk.find((i) => i.value == val.runOfComMonitoring);
        this.totalData.runOfComMonitoring = obj1 && obj1.label;

        const obj2 = yxqk.find((i) => i.value == val.runOfVideoMonitoring);
        this.totalData.runOfVideoMonitoring = obj2 && obj2.label;

        const obj3 = sfpd.find((i) => i.value == val.izComMonitoring);
        this.totalData.izComMonitoring = obj3 && obj3.label;

        const obj4 = sfpd.find((i) => i.value == val.izVideoMonitoring);
        this.totalData.izVideoMonitoring = obj4 && obj4.label;

        const obj5 = dwxz.find((i) => i.value == val.managementType);
        this.totalData.managementType = obj5 && obj5.label;

        const obj6 = sjdw.find((i) => i.value == val.otherManagementType);
        this.totalData.otherManagementType = obj6 && obj6.label;

        const obj7 = sfpd.find((i) => i.value == val.izSignboard);
        this.totalData.izSignboard = obj7 && obj7.label;

        const obj8 = sfpd.find((i) => i.value == val.izEmergency);
        this.totalData.izEmergency = obj8 && obj8.label;
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
