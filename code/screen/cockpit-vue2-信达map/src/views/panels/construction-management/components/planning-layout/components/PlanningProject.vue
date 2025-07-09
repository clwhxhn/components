<template>
  <div>
    <EasyTable
      header-height="46px"
      :columns="columns"
      :data-source="tableData"
      @rowClick="$emit('rowClick', $event)"
    ></EasyTable>
  </div>
</template>
<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { formatNumber } from "@/utils/number-helper";
import { getAction, postAction } from "@/utils";
import dayjs from "dayjs";

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
  data() {
    return {
      columns: [
        {
          title: "序号",
          dataIndex: "id",
          width: 60,
          filter(_, row, i) {
            return i + 1;
          },
        },
        {
          title: "项目名称",
          dataIndex: "engineeringName",
        },
        {
          title: "项目分类",
          dataIndex: "category_dictText",
        },
        {
          title: "项目类型",
          dataIndex: "typ_dictText",
          width: 180,
        },
        {
          title: "行政区划",
          dataIndex: "regionName",
          width: 140,
        },
        {
          title: "建设性质",
          dataIndex: "constructionNature_dictText",
          width: 140,
        },
        {
          title: "计划开工年份",
          dataIndex: "planStartDate",
          width: 120,
          filter: (_, row) =>
            row.planStartDate ? dayjs(row.planStartDate).format("YYYY年") : "-",
        },
        {
          title: "批复/匡算总投资（万元）",
          dataIndex: "totalInvestment",
          width: 120,
          align: "right",
          filter(text) {
            return formatNumber(text);
          },
        },
        {
          title: "前期工作阶段",
          dataIndex: "curPreWorkStage_dictText",
          width: 140,
        },
        {
          title: "建设优先等级",
          dataIndex: "buildPriorityLevel_dictText",
          width: 140,
        },
      ],
      tableData: [],
    };
  },
  watch: {
    "model.id"() {
      this.queryTableData();
    },
  },
  methods: {
    queryTableData() {
      postAction(
        "/pcm/wpm.plan.engineering/pagePlanEngineering",
        {
          planId: this.model.id,
        },
        {
          pageSize: 999,
        }
      ).then((res) => {
        if (res.success) {
          this.tableData = res.result.records;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
