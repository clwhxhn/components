<template>
  <!-- 年度投资执行情况（固定资产）-弹窗 -->
  <div class="total-investment-modal">
    <EasyTable
      contentHeight="40vh"
      headerHeight="44px"
      :columns="columns"
      :data-source="dataSource"
    ></EasyTable>
  </div>
</template>

<script>
import { formatNumber } from "@/utils/number-helper";
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { getFixedInvestment } from "../../../../mock/mock";

export default {
  components: {
    EasyTable,
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          width: 80,
          filter(_, row, i) {
            return row.region === "合计" ? "-" : i;
          },
        },
        {
          title: "区划名称",
          dataIndex: "region",
          width: 200,
        },
        {
          title: "本年完成投资（万元）",
          dataIndex: "currentInvestment",
          align: "right",
          filter(_, row) {
            return _ === "/" ? "-" : _;
          },
        },
        {
          title: "2024年同期完成投资（万元）",
          dataIndex: "prevInvestment",
          align: "right",
          filter(_, row) {
            return _ === "/" ? "-" : _;
          },
        },
        {
          title: "完成投资同比增幅",
          dataIndex: "increaseRate",
          align: "right",
          filter(_, row) {
            return _ === "/" ? "-" : _;
          },
        },
        {
          title: "",
          dataIndex: "empty",
          width: 50,
        },
      ],
      dataSource: [],
    };
  },
  mounted() {
    getFixedInvestment().then((res) => {
      this.dataSource = res;
    });
  },
};
</script>

<style lang="less" scoped></style>
