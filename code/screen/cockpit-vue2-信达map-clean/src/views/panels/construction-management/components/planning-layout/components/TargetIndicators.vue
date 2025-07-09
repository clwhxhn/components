<template>
  <div>
    <EasyTable :columns="columns" :data-source="model.targetList"></EasyTable>
  </div>
</template>
<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { formatNumber } from "@/utils/number-helper";

export default {
  components: {
    EasyTable,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  watch: {
    "model.targetList"() {},
  },
  data() {
    return {
      baseColumns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          width: 60,
          filter(_, row, i) {
            return i + 1;
          },
        },
        {
          title: "目标",
          dataIndex: "target",
          key: "target",
        },
        {
          title: "指标",
          dataIndex: "item",
          key: "item",
        },
        {
          title: "单位",
          dataIndex: "unit_dictText",
          key: "unit_dictText",
          width: 100,
        },
        {
          title: "现状年",
          dataIndex: "presentYearValue",
          key: "presentYearValue",
          width: 140,
        },
        "yearColumnsPlaceholder",
        {
          title: "属性",
          dataIndex: "property",
          key: "property",
          width: 220,
        },
      ],
    };
  },
  computed: {
    yearColumns() {
      if (!this.model.targetYear) return [];
      return this.model.targetYear.split(",").map((year, i) => {
        return {
          title: `目标年（${year}）`,
          dataIndex: year,
          key: year,
          width: 140,
          filter(_, row) {
            const values = row.targetYearValue;
            if (!values) return "";
            return values.split(",")[i];
          },
        };
      });
    },
    columns() {
      const i = this.baseColumns.indexOf("yearColumnsPlaceholder");
      return this.baseColumns
        .slice(0, i)
        .concat(this.yearColumns)
        .concat(this.baseColumns.slice(i + 1));
    },
  },
};
</script>
<style lang="less" scoped></style>
