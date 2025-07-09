<template>
  <div class="planning-layout">
    <SectionHeader>规划布局</SectionHeader>
    <div class="planning-layout-content">
      <PanelCard title="规划体系">
        <div class="planning-layout-tabs">
          <div
            v-for="it in tabList"
            @click="handleClickTab(it.key)"
            class="planning-layout-tab"
            :key="it.key"
            :class="{ 'is-active': activeTab === it.key }"
          >
            <div class="tab-title">{{ it.title }}</div>
            <ItemValue :value="tabDatasource[it.key]" unit="个"></ItemValue>
          </div>
        </div>
        <div
          class="planning-layout-tab-content"
          :class="['active-tab-' + activeTab]"
        >
          <div class="bg-box"></div>
          <div class="content-inner">
            <div class="divider-icon"></div>
            <div
              class="inner-item"
              :class="{ 'is-active': activeStatus === it.queryKey }"
              v-for="it in dataList"
              :key="it.key"
              @click="handleChangeStatus(it.queryKey)"
            >
              <img :src="it.icon" alt="" class="inner-icon" />
              <span class="inner-title">{{ it.title }}</span>
              <ItemValue
                :value="datasource[activeTab][it.key].count"
                unit="个/"
              ></ItemValue>
              <ItemValue
                :value="datasource[activeTab][it.key].percent"
                unit="%"
              ></ItemValue>
            </div>
          </div>
        </div>
      </PanelCard>
      <PanelCard title="重点规划调度">
        <EasyTable
          :data-source="tableData"
          :columns="columns"
          content-height="166px"
          @rowClick="handleRowClick"
          rowHeight="29px"
          :activeId="planId"
          autoScroll
          :loading="tableLoading"
        ></EasyTable>
      </PanelCard>
    </div>
  </div>
</template>
<script>
import { showModal } from "@/components/easy-modal/modal";
import EasyTable from "@/components/easy-table/EasyTable.vue";
import ItemValue from "@/components/ItemValue.vue";
import PanelCard from "@/components/PanelCard.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import PlanningLayoutModal from "./PlanningLayoutModal.vue";
import { getAction, postAction } from "@/utils";
import { paramsGetters } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  components: { SectionHeader, PanelCard, ItemValue, EasyTable },
  data() {
    return {
      activeTab: "city",
      activeStatus: "",
      tabDatasource: {
        city: 0,
        district: 0,
      },
      tabList: [
        {
          title: "市级规划",
          key: "city",
        },
        {
          title: "区县规划",
          key: "district",
        },
      ],
      datasource: {
        city: {
          work: { count: 0, percent: 0 },
          implement: { count: 0, percent: 0 },
        },
        district: {
          work: { count: 0, percent: 0 },
          implement: { count: 0, percent: 0 },
        },
      },
      dataList: [
        {
          icon: require("@/assets/images-new/construction-management/planning-layout/icon-1.png"),
          title: "正在编制",
          key: "work",
          queryKey: "10",
        },
        {
          icon: require("@/assets/images-new/construction-management/planning-layout/icon-1.png"),
          title: "正在实施",
          key: "implement",
          queryKey: "20",
        },
      ],
      columns: [
        {
          dataIndex: "index",
          filter(_, row, i) {
            return i + 1;
          },
          title: "序号",
          width: "60px",
        },
        { dataIndex: "name", title: "规划名称" },
        { dataIndex: "dutyDeptName", title: "责任处室", width: "100px" },
        {
          dataIndex: "status_dictText",
          title: "工作进展",
          width: "100px",
        },
      ],
      tableData: [],
      tableLoading: false,
    };
  },
  computed: {
    ...paramsGetters(["regionId", "planId"], true),
  },
  mounted() {
    this.queryPlanNumKpi();
    this.queryTableData();
  },
  watch: {
    regionId() {
      this.queryPlanNumKpi();
      this.queryTableData();
    },
  },
  methods: {
    handleClickTab(active) {
      this.activeTab = active;
      this.queryTableData();
    },
    handleChangeStatus(key) {
      if (this.activeStatus === key) {
        this.activeStatus = "";
      } else {
        this.activeStatus = key;
      }
      this.queryTableData();
    },
    handleRowClick(row) {
      this.$setCurLayers("engineeringLayer");
      this.planId = row.id;
      const { close } = showModal({
        title: row.planName,
        width: 1400,
        component: PlanningLayoutModal,
        params: {
          planId: row.id,
          onClick: (record) => {
            if (!record.longitude || !record.latitude) {
              this.$message.warning("暂无空间数据！");
              return;
            }
            this.flyTo$([+record.longitude, +record.latitude]).then(() => {
              const timer = setTimeout(() => {
                close();
                this.setOverlay$("engineeringLayer", record.engineeringId);
                clearTimeout(timer);
              }, 100);
            });
          },
        },
      });
    },
    queryPlanNumKpi() {
      postAction(
        "/pcm/pcm.map/queryPlanNumKpi",
        {},
        {
          regionId: this.regionId,
        }
      ).then((res) => {
        const result = res.result;
        const city = result.find((it) => it.levelName.includes("市"));
        const district = result.find((it) => it.levelName.includes("区县"));
        if (city) {
          this.tabDatasource.city = city.totalNum;
          this.datasource.city.work.count = city.unSubmitNum;
          this.datasource.city.work.percent = city.unSubmitPercent;
          this.datasource.city.implement.count = city.doingNum;
          this.datasource.city.implement.percent = city.doingPercent;
        }
        if (district) {
          this.tabDatasource.district = district.totalNum;
          this.datasource.district.work.count = district.unSubmitNum;
          this.datasource.district.work.percent = district.unSubmitPercent;
          this.datasource.district.implement.count = district.doingNum;
          this.datasource.district.implement.percent = district.doingPercent;
        }
      });
    },
    queryTableData() {
      //   this.tableLoading = true;
      //   getAction("/pcm/pcm.map/pagePlan", {
      //     planLevel: this.activeTab == "city" ? "20" : "10",
      //     pageSize: 9999,
      //     planStatus: this.activeStatus,
      //     regionId: this.regionId,
      //   })
      //     .then((res) => {
      //       this.tableData = res.result.records;
      //     })
      //     .finally(() => {
      //       this.tableLoading = false;
      //     });
      this.tableData = [
        {
          id: "864401650142584832",
          createBy: "fe76f76c40a04a509fe17a563243fff9",
          createTime: "2025-07-01 15:04:55",
          updateBy: null,
          updateTime: null,
          name: "20250701",
          code: "20250701",
          pid: null,
          category: "20",
          category_dictText: "专业规划",
          planNature: "10",
          planNature_dictText: "新编规划",
          planRange: "20",
          planRange_dictText: "流域规划",
          planFunction: "20",
          planFunction_dictText: "发展规划",
          planLimitStartYear: 2023,
          planLimitEndYear: 2027,
          baseYear: 2023,
          standardYear: 2024,
          planLevel: "20",
          planLevel_dictText: "市级",
          regionId: "534996",
          regionId_dictText: "重庆市",
          regionName: null,
          dutyDeptId: "100",
          dutyDeptId_dictText: "重庆市水利局",
          dutyDeptName: "重庆市水利局",
          izMiddleEvaluate: "1",
          izMiddleEvaluate_dictText: "是",
          izYearEvaluate: "1",
          izYearEvaluate_dictText: "是",
          izEndEvaluate: "1",
          izEndEvaluate_dictText: "是",
          planBasis:
            "规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据规划依据",
          planStartDate: "2025-07-08",
          planEndDate: "2025-07-24",
          leaderDeptId: null,
          planProgress: "20",
          planProgress_dictText: "正在编制",
          registerDate: "2025-07-01",
          status: "10",
          status_dictText: "正在编制",
          targetYear: "2028",
          izDel: 0,
          approveDept: null,
          approveDocCode: null,
          approveDate: null,
          targetList: null,
          availableDays: null,
          num: null,
          sonTaskNum: null,
          unDoTaskNum: null,
          doingTaskNum: null,
          doneTaskNum: null,
          collectNoticeId: null,
          investAmount: null,
          validatePublish: null,
          planEngineeringDataList: null,
        },
      ];
    },
  },
};
</script>
<style lang="less" scoped>
.planning-layout {
  // position: relative;
  margin-top: 8px;
  .planning-layout-content {
    .planning-layout-tabs {
      height: 32px;
      display: flex;
      justify-content: space-between;
      .planning-layout-tab {
        width: 244px;
        background-image: url(~@/assets/images-new/construction-management/planning-layout/tab-bg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        --primary-color: #ffffff;
        cursor: pointer;
        &:last-child {
          margin-left: 10px;
        }
        .tab-title {
          font-family: PingFang SC, PingFang SC;
          font-weight: 600;
          font-size: 14px;
          color: var(--primary-color);
          line-height: 20px;
          text-align: center;
          font-style: normal;
          text-transform: none;
          margin-right: 13px;
        }
        &.is-active {
          --primary-color: #fef85f;
          background-image: url(~@/assets/images-new/construction-management/planning-layout/tab-bg-active.png);
        }
      }
    }
    .planning-layout-tab-content {
      height: 61px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .bg-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(~@/assets/images-new/construction-management/planning-layout/top-bg.png);
        background-size: 100% 100%;
        z-index: 0;
      }
      &.active-tab-district {
        .bg-box {
          transform: rotateY(180deg);
        }
      }
      .content-inner {
        width: 485px;
        height: 42px;
        background-image: url(~@/assets/images-new/construction-management/planning-layout/inner-bg.png);
        background-size: 100% 100%;
        position: relative;
        z-index: 10;
        margin-bottom: -4px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .divider-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 4px;
          height: 30px;
          background-image: url(~@/assets/images-new/construction-management/planning-layout/divider.png);
          background-size: 100% 100%;
        }
        .inner-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          .inner-icon {
            width: 28px;
            height: 28px;
            margin-right: 10px;
          }
          .inner-title {
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            font-size: 14px;
            color: #ffffff;
            line-height: 22px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-right: 10px;
          }
          &.is-active {
            .inner-title {
              color: #00ffff;
            }
          }
        }
      }
    }
  }
  /deep/.easy-table-content {
    height: 132px;
  }
}
</style>
