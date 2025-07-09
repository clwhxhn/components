<template>
  <div class="funding-plan-modal">
    <EasyTable
      contentHeight="40vh"
      :columns="columns"
      :data-source="dataSource"
    ></EasyTable>
  </div>
</template>
<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { getZysljsData, getGzData } from "../../mock/invest/invest";
import { formatNumber } from "@/utils/number-helper";

export default {
  components: {
    EasyTable,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataSource: [],
    };
  },
  computed: {
    columns() {
      return [
        {
          title: "序号",
          dataIndex: "index",
          width: 80,
          filter(_, row, i) {
            return i + 1;
          },
        },
        {
          title: "区划名称",
          dataIndex: "regionName",
          width: 200,
        },
        {
          title: "计划投资（万元）",
          dataIndex: "investPlan",
          align: "right",
          filter(val) {
            return formatNumber(val, 2, ",", "-");
          },
        },
        {
          title: "占比（%）",
          dataIndex: "investRate",
          align: "right",
        },
        ["zyysntz", "zyslfzzj"].includes(this.type)
          ? {
              title: "已下达投资（万元）",
              dataIndex: "issuedAmount",
              align: "right",
              filter(val) {
                return formatNumber(val, 2, ",", "-");
              },
            }
          : null,
        {
          title: "已完成投资（万元）",
          dataIndex: "completedAmount",
          align: "right",
          filter(val) {
            return formatNumber(val, 2, ",", "-");
          },
        },
        {
          title: "投资完成率（%）",
          dataIndex: "completedRate",
          align: "right",
          filter: (text) => formatNumber(text)
        },
        {
          title: "",
          dataIndex: "empty",
          width: 50
        },
      ].filter(Boolean);
    },
  },
  mounted() {
    let then;
    if (this.type === "zyysntz" || this.type === "zyslfzzj") {
      then = getZysljsData();
    } else if (this.type === "gz2023") {
      then = getGzData();
    }
    if (then) {
      then.then((res) => {
        this.dataSource = res;
      });
    }
  },
};
</script>
<style lang="less" scoped></style>
