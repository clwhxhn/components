<template>
  <div class="content">
    <div class="tab-list">
      <div
        :class="currentTab == item.id ? 'tab active' : 'tab'"
        v-for="item in tabList"
        :key="item.id"
        @click="tabChange(item.id)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="tab-content">
      <BasicInfo
        v-if="currentTab == '1'"
        :detailsData="detailsData"
      ></BasicInfo>
      <WaterSource
        v-if="currentTab == '2'"
        :detailsData="detailsData"
      ></WaterSource>
      <YearInfo v-if="currentTab == '3'" :detailsData="detailsData"></YearInfo>
      <EquipRun v-if="currentTab == '4'" :detailsData="detailsData"></EquipRun>
      <ProjectManage
        v-if="currentTab == '5'"
        :detailsData="detailsData"
      ></ProjectManage>
    </div>
  </div>
</template>

<script>
import { getAction } from "@/utils/request/manage.js";
import BasicInfo from "./plant-detail-tab/BasicInfo.vue";
import WaterSource from "./plant-detail-tab/WaterSource.vue";
import YearInfo from "./plant-detail-tab/YearInfo.vue";
import EquipRun from "./plant-detail-tab/EquipRun.vue";
import ProjectManage from "./plant-detail-tab/ProjectManage.vue";

export default {
  name: "Config-uration",
  components: {
    BasicInfo,
    WaterSource,
    YearInfo,
    EquipRun,
    ProjectManage,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    properties: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      detailsData: {},
      tabList: [
        { id: "1", label: "基础信息" },
        { id: "2", label: "水源信息" },
        { id: "3", label: "年度信息" },
        { id: "4", label: "设备运行情况" },
        { id: "5", label: "工程管理信息" },
      ],
      currentTab: "1",
    };
  },
  watch: {
    properties: {
      handler(val) {
        this.getDetail(val.id);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getDetail(id) {
      getAction("rws/rws/rwsWaterSupplyProject/get", {
        id,
      }).then((res) => {
        if (res.success) {
          this.detailsData = res.result;
        }
      });
    },
    tabChange(id) {
      this.currentTab = id;
    },
    handleCancel() {
      this.$emit("close", false);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-modal {
  background-image: url("~@/assets/images/water-use/modal-bkg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}

/deep/ .ant-modal-body {
  padding: 24px 24px 0 24px;
}

/deep/ .ant-modal-content {
  background: none;
}

/deep/.ant-modal-header {
  display: none !important;
}

/deep/.ant-modal-close {
  top: 44px;
  right: 38px;
  color: #fff;
}

.content {
  margin-top: 10px;
  width: 100%;
  // height: 500px;

  .modal-title {
    width: 100%;
    height: 77px;
    background: none;
    border-bottom: none;
    background-image: url(~@/assets/images/engineering-operation/modal-title.png);
    background-size: 100% 100%;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    color: #ffffff;
    line-height: 63px;
    font-style: normal;
    padding-left: 20px;
  }

  .tab-list {
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    .tab {
      padding: 0px 20px;
      height: 40px;
      background: linear-gradient(180deg, #0e2f60 0%, #114ca4 100%);
      border-radius: 0px 0px 0px 0px;
      border: 1px solid #168bff;
      text-align: center;
      line-height: 40px;
      font-family: PingFang SC, PingFang SC;
      font-size: 16px;
      color: #ffffff;
      margin-right: 5px;
      cursor: pointer;
    }
    .active {
      background-image: url("~@/assets/images/engineering-operation/tab-active.png");
      background-size: 100% 100%;
    }
  }

  .tab-content {
    height: 500px;
    overflow-y: auto;
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
  }
}
</style>
