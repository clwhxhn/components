<template>
  <!-- 年度投资执行情况（全口径）-弹窗 -->
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
import { getTotalInvestment } from "../../../../mock/mock";

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
            return row.region === "合计" ? "-" : i ;
          },
        },
        {
          title: "区划名称",
          dataIndex: "region",
          width: 200,
        },
        {
          title: "已落实资金（万元）",
          dataIndex: "fund",
          align: "right",
          filter(_, row) {
            return _ === "/" ? "-" : _;
          },
        },
        {
          title: "已完成投资（万元）",
          dataIndex: "investment",
          align: "right",
          filter(_, row) {
            return _ === "/" ? "-" : _;
          },
        },
        {
          title: "已落实资金同比增幅",
          dataIndex: "fundYoY",
          align: "right",
          filter(_, row) {
            return _ === "/" ? "-" : _;
          },
        },
        {
          title: "已完成投资同比增幅",
          dataIndex: "investmentYoY",
          align: "right",
          filter(_, row) {
            return _ === "/" ? "-" : _;
          },
        },
        {
          title: "",
          dataIndex: "empty",
          width: 50
        },
        // {
        //   title: "计划投资（亿元）",
        //   dataIndex: "key1",
        //   align: "right",
        //   filter(_, row) {
        //     return Math.random() > 0.5 ? 2.2 : 1.6;
        //   },
        // },
        // {
        //   title: "占比（%）",
        //   dataIndex: "rate1",
        //   align: "right",
        //   filter(_, row) {
        //     return Math.random() > 0.5 ? 10.2 : 5.6;
        //   },
        // },
        // {
        //   title: "已完成投资（亿元）",
        //   dataIndex: "key2",
        //   align: "right",
        //   filter(_, row) {
        //     return Math.random() > 0.5 ? 2.2 : 1.6;
        //   },
        // },
        // {
        //   title: "完成率（%）",
        //   dataIndex: "key3",
        //   align: "right",
        //   filter(_, row) {
        //     return Math.random() > 0.5 ? 2.2 : 1.6;
        //   },
        // },
        // {
        //   title: "较去年同期",
        //   key: "lastYear",
        //   width: 300,
        //   children: [
        //     {
        //       title: "增加（亿元）",
        //       dataIndex: "key4",
        //       align: "right",
        //       filter(_, row) {
        //         return Math.random() > 0.5 ? 2.2 : 1.6;
        //       },
        //     },
        //     {
        //       title: "增幅（%）",
        //       dataIndex: "key5",
        //       align: "right",
        //       filter(_, row) {
        //         return Math.random() > 0.5 ? 2.2 : 1.6;
        //       },
        //     },
        //   ],
        // },
      ],
      dataSource: [],
    };
  },
  mounted() {
    getTotalInvestment().then((res) => {
      this.dataSource = res;
    });
  },
};
</script>

<style lang="less" scoped></style>
