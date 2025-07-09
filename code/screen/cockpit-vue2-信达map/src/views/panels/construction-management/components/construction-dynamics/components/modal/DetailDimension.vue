<template>
  <!-- 安全问题整改率、质量问题整改率 弹窗（明细维度） -->
  <div class="detail-dimension">
    <EasyTable
      contentHeight="460px"
      :columns="columns"
      :data-source="dataSource"
    ></EasyTable>
  </div>
</template>

<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { getQualityDetails, getSafetyDetails } from "../../../../mock/mock";

export default {
  components: {
    EasyTable,
  },
  props: {
    panelType: {
      panelType: String,
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          width: 240,
          filter(_, row, i) {
            return i + 1;
          },
        },
        {
          title: "区划名称",
          dataIndex: "regionName",
          width: 240,
        },
        {
          title: this.panelType === "quality" ? "问题整改率" : "隐患整改率",
          dataIndex: "value",
          width: 240,
          filter(_, row) {
            return `${row.value}%`;
          },
        },
      ],
      dataSource: [],
    };
  },
  mounted() {
    if (this.panelType === "quality") {
      getQualityDetails().then((res) => {
        this.dataSource = res;
      });
    }

    if (this.panelType === "safety") {
      getSafetyDetails().then((res) => {
        this.dataSource = res;
      });
    }
  },
};
</script>

<style lang="less" scoped>
.detail-dimension {
  height: 500px;
}
</style>
