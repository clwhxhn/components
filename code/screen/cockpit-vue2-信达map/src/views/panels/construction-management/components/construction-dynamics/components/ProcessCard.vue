<template>
  <PanelCard title="进度">
    <div class="process-content">
      <div class="content-kpi">
        <template v-for="(it, i) in kpiList">
          <div class="kpi-item" @click="handleClickItem(it)" :key="it.title">
            <img :src="it.icon" alt="" class="item-icon" />
            <div class="item-content">
              <div
                class="item-label"
                :class="{ 'is-active': status === it.status.join(',') }"
              >
                {{ it.title }}
              </div>
              <div class="item-value">
                <ItemValue :value="it.value" unit=" " show-arrow></ItemValue>
              </div>
            </div>
          </div>
          <div
            class="arrow-icon"
            :key="it.title + '_divider'"
            v-if="i < kpiList.length - 1"
          ></div>
        </template>
      </div>
      <PanelCard :offset-y="5" title="重大项目进展">
        <EasyTable
          header-height="26px"
          row-height="28px"
          content-height="160px"
          :data-source="tableData"
          :columns="columns"
          auto-scroll
          @rowClick="handleRowClick"
          :loading="tableLoading"
        ></EasyTable>
      </PanelCard>
    </div>
  </PanelCard>
</template>
<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import PanelCard from "@/components/PanelCard.vue";
import { formatNumber } from "@/utils/number-helper";
import { getAction } from "@/utils";
import ItemValue from "@/components/ItemValue.vue";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  components: { PanelCard, EasyTable, ItemValue },
  props: {
    regionId: {
      type: String,
      default: "",
    },
    typ: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      status: "",
      kpiList: [
        {
          icon: require("@/assets/images-new/construction-management/construction-dynamics/number-icon-1.png"),
          title: "续建/新开工",
          value: "284/4",
          status: ["10", "20"],
        },
        {
          icon: require("@/assets/images-new/construction-management/construction-dynamics/number-icon-2.png"),
          title: "完工",
          value: "58",
          status: ["30"],
        },
        {
          icon: require("@/assets/images-new/construction-management/construction-dynamics/number-icon-3.png"),
          title: "竣工验收",
          value: "4",
          status: ["40"],
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
        {
          dataIndex: "name",
          title: "项目名称",
        },
        {
          dataIndex: "totalInvestment",
          title: "总投资（万元）",
          align: "right",
          width: "130px",
          filter(text) {
            return formatNumber(text);
          },
        },
        {
          dataIndex: "completRate",
          title: "完成率（%）",
          align: "center",
          width: "100px",
          filter(_, row) {
            return row.completRate
              ? formatNumber(row.completRate, 0, "") + "%"
              : "-";
          },
        },
      ],
      tableData: [],
      tableLoading: false,
      divisionOptions: [],
    };
  },
  mounted() {
    this.getKpiData();
    this.queryTableData();
  },
  watch: {
    typ() {
      this.getKpiData();
      this.queryTableData();
    },
    regionId() {
      this.getKpiData();
      this.queryTableData();
    },
  },
  methods: {
    getKpiData() {
      getAction("/pcm/pcm.map/queryWrEngineeringStatusKpi", {
        regionId: this.regionId,
        typ: this.typ,
      }).then((res) => {
        this.kpiList.forEach((it) => {
        });
      });
    },
    queryTableData() {
      this.tableLoading = true;
      getAction("/pcm/pcm.map/queryWrEngineeringList", {
        regionId: this.regionId,
        typ: this.typ,
        status: this.status,
      })
        .then((res) => {
          this.tableData = res.result;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleClickItem(it) {
      const status = it.status.join(",");
      if (this.status === status) {
        this.status = "";
      } else {
        this.status = status;
      }
      this.queryTableData();
    },
    handleRowClick(record) {
      if (!record.lon || !record.lat)
        return this.$message.warning("没有空间数据！");
      this.$setCurLayers([
        "majorEngineeringCountLayer",
        "majorEngineeringLayer",
      ]);
      this.$nextTick(() => {
        this.flyTo$([+record.lon, +record.lat]).then(() => {
          const timer = setTimeout(() => {
            this.setOverlay$("majorEngineeringLayer", record.id);
            clearTimeout(timer);
          }, 100);
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content-kpi {
  height: 59px;
  background: linear-gradient(
    89deg,
    rgba(57, 125, 240, 0) 0%,
    rgba(54, 100, 153, 0.4) 50%,
    rgba(57, 125, 240, 0) 100%,
    rgba(57, 125, 240, 0) 100%
  );
  box-shadow: inset 0px -6px 12px 0px rgba(3, 122, 255, 0.76);
  border-radius: 4px 4px 4px 4px;
  border: 1px solid;
  border-image: linear-gradient(
      0deg,
      rgba(0.9999999403953552, 113.88597652316093, 230.00000149011612, 0),
      rgba(170.0000050663948, 246.0000005364418, 255, 1),
      rgba(1.0000000591389835, 129.00000751018524, 230.00000149011612, 0)
    )
    1 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  .kpi-item {
    width: 130px;
    height: 50px;
    background-image: url(~@/assets/images-new/construction-management/construction-dynamics/item-bg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    .item-icon {
      width: 26px;
      height: 26px;
      margin: 0 10px;
    }
    .item-content {
      flex: 1;
      overflow: hidden;
      .item-label {
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        &.is-active {
          color: #00ffff;
        }
      }
      .item-value {
        font-family: D-DIN-DIN;
        font-weight: 700;
        font-size: 22px;
        color: #00ffff;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        /deep/ .arrow-icon {
          margin-top: 0;
        }
      }
    }
  }
  .arrow-icon {
    width: 20px;
    height: 20px;
    background-image: url(~@/assets/images-new/construction-management/construction-dynamics/arrow-icon.png);
    background-size: 100% 100%;
  }
}
/deep/ .easy-table-content {
  height: 160px !important;
}
</style>
