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
import { getDfzjData } from "../../mock/invest/invest";
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
        },
        {
          title: "已落实投资（万元）",
          dataIndex: "value",
          align: "right",
          filter: (text) => formatNumber(text),
        },
        {
          title: "占比（%）",
          dataIndex: "percent",
          align: "right",
          filter: (text) => formatNumber(text),
        },
        {
          title: "",
          dataIndex: "empty",
          width: 50,
        },
      ].filter(Boolean);
    },
  },
  mounted() {
    getDfzjData(this.type).then((res) => {
      this.dataSource = res;
    });
  },
};
</script>
<style lang="less" scoped></style>
