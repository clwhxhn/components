<template>
  <CommonOverlay
    :title="properties.projectName || properties.belongProject"
    width="300px"
  >
    <CommonDescription :field-configs="list" :data-source="properties">
    </CommonDescription>
    <template #action>
      <div class="btn-item" @click="openDetailPage">详情</div>
    </template>
  </CommonOverlay>
</template>

<script>
import CommonOverlay from "@/views/components/CommonOverlay.vue";
import CommonDescription from "@/views/components/CommonDescription.vue";
import { SchintaMapHelp } from "schinta-map";
const list1 = [
  {
    title: "所属区县",
    dataIndex: "addvName",
  },
  {
    title: "工程类型",
    dataIndex: "engProName",
  },
  {
    title: "设计供水规模",
    dataIndex: "desScale",
    unit: "m³/d",
  },
  {
    title: "水源名称",
    dataIndex: "waterSourceName",
  },
];
const list2 = [
  {
    title: "所属区县",
    dataIndex: "addvName",
  },
  {
    title: "工程类型",
    dataIndex: "engProName",
  },
  {
    title: "设计供水规模",
    dataIndex: "desScale",
    unit: "m³/d",
  },
  {
    title: "水源名称",
    dataIndex: "waterSourceName",
  },
  {
    title: "取水流量",
    dataIndex: "inMomentFlow",
    unit: "m³/h",
  },
  {
    title: "供水流量",
    dataIndex: "outMomentFlow",
    unit: "m³/h",
  },
  {
    title: "浊度",
    dataIndex: "turb",
    unit: "NUT",
  },
];

import { getAction } from "@/utils/request/manage.js";
import PlantDetailModal from "./water-project-detail/PlantDetailModal.vue";
import { showModal } from "@/components/easy-modal/modal";

export default {
  name: "WaterProjectOverlay",
  components: { CommonOverlay, CommonDescription },
  mixins: [SchintaMapHelp()],
  props: {
    properties: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      list: [],
      allData: {},
      visible: false,
      detailModalVisible: false,
      waterVisible: false,
    };
  },
  computed: {
    showZT() {
      return this.mapParamsValue$.waterMonitorProjectLayerDate.map((i) => {
        return i.projectName;
      });
    },
  },
  watch: {
    properties: {
      immediate: true,
      handler(val) {
        let engProName = "";
        if (val.engProTp == 1) {
          engProName = "城市管网延伸工程";
        } else if (val.engProTp == 2) {
          engProName = "千吨万人工程";
        } else if (val.engProTp == 3) {
          engProName = "千人工程";
        } else if (val.engProTp == 4) {
          engProName = "百人工程";
        } else {
          engProName = "";
        }
        console.log("properties val", val);
        if (val.izOnline == "1") {
          this.list = list2;
        } else {
          this.list = list1;
        }
        // 详情
        getAction(`/rws/rws/rwsWaterSupplyProject/pageList`, {
          keyword: val.projectCode,
          pageNo: 1,
          pageSize: 10,
        }).then((res) => {
          if (!res.success) return;
          let result = res.result || {};
          let records = result.records || [];
          let recordsItem = records[0] || {};
          this.allData = {
            ...this.allData,
            ...val,
            ...recordsItem,
            engProName: engProName,
            turb: val.lastOutSz? val.lastOutSz.turb : null,
          };
        });
        if (val.izOnline != "1") return;
        getAction("/rws/rws/rwsWaterSupplyProject/queryDetailByProjectCode", {
          projectCode: val.projectCode,
        }).then((res) => {
          if (!res.success) return;
          let result = res.result || {};
          let inDataFlow = result.inDataFlow || {};
          let inMomentFlow = inDataFlow.momentFlow; // 取水流量
          let outDataFlow = result.outDataFlow || {};
          let outMomentFlow = outDataFlow.momentFlow; // 供水流量
          this.allData = {
            ...this.allData,
            inMomentFlow: inMomentFlow && inMomentFlow.toFixed(2),
            outMomentFlow: outMomentFlow && outMomentFlow.toFixed(2),
          };
          if (!val.lastOutSz) {
            // 出厂水水质
            let outSz = result.outSz || [];
            let outSzData = outSz[0] || {};
            this.allData.turb = outSzData.turb;
          }
        });
      },
    },
  },

  created() {},
  methods: {
    getThreeCode(projectCode) {
      // 新民水厂
      if (projectCode === "500231000025") {
        return "xinmin_waterworks";
      }
      // 澄溪水厂
      if (projectCode === "500231000011") {
        return "chengxi_waterworks";
      }
      // 砚台水厂
      if (projectCode === "500231000012") {
        return "yantai_waterworks";
      }
      return "";
    },
    // 打开水厂详情微观场景
    openDetailPage() {
      showModal({
        width: 1100,
        component: PlantDetailModal,
        title: "水厂详情",
        params: {
          properties: this.properties,
        },
      });
    },
    close() {
      this.getOverlayController$().clearOverlayGroup();
    },
    handleCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.btn-item {
  width: 64px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: 600;
  font-size: 16px;
  color: #00ffff;
  background-size: 100% 100%;
  background-image: url("~@/assets/images/common/overlay-btn-bg.png");
  cursor: pointer;
}
.warning-tag {
  display: inline-block;
  background: linear-gradient(270deg, #dd0000 0%, #480000 97%);
  border-radius: 1px solid #ff5656;
  line-height: 20px;
  padding: 0 3px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}
</style>
