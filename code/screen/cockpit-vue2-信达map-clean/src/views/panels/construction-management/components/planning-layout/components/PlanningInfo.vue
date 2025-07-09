<template>
  <div class="planning-info">
    <div class="planning-header">基本信息</div>
    <div class="segment-list">
      <div
        :class="['segment-item', 'segment-item-span' + (it.span || 1)]"
        v-for="it in baseSegments"
        :key="it.key"
      >
        <div class="segment-label">{{ it.label }}：</div>
        <div class="segment-content">{{ model[it.key] }}</div>
      </div>
    </div>
    <div class="planning-header">编制工作事项</div>
    <EasyTable :columns="columns" :data-source="tableData"></EasyTable>
  </div>
</template>
<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { formatNumber } from "@/utils/number-helper";
import { getAction, postAction } from "@/utils";

export default {
  components: { EasyTable },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseSegments: [
        { label: "规划名称", key: "name" },
        { label: "规划分类", key: "category_dictText" },
        { label: "规划性质", key: "planNature_dictText" },
        { label: "规划范围", key: "planRange_dictText" },
        { label: "规划功能", key: "planFunction_dictText" },
        { label: "规划进展", key: "status_dictText" },
        { label: "现状基本年", key: "baseYear" },
        { label: "规划水平年", key: "standardYear" },
        { label: "规划依据", key: "planBasis", span: 3 },
      ],
      columns: [
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
          title: "工作事项编码",
          dataIndex: "code",
          width: 160,
        },
        {
          title: "工作事项名称",
          dataIndex: "name",
        },
        {
          title: "上级节点",
          dataIndex: "pid_dictText",
        },
        {
          title: "负责处室",
          dataIndex: "dutyDeptId_dictText",
          width: 100,
        },
        {
          title: "计划开始日期",
          dataIndex: "planStartDate",
          width: 130,
        },
        {
          title: "计划完成日期",
          dataIndex: "planEndDate",
          width: 130,
        },
        {
          title: "计划经费(万元)",
          dataIndex: "planFunds",
          align: "right",
          width: 120,
          filter(_, row) {
            return formatNumber(row.planFunds, 2, ",", "-");
          },
        },
        {
          title: "状态",
          dataIndex: "status_dictText",
          width: 80,
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
      getAction("/pcm/wpm.plan.work/queryTree", { planId: this.model.id }).then(
        (res) => {
          if (res.success && res.result) {
            const tableData = [];
            const loop = (list) => {
              list.forEach((it) => {
                tableData.push(it);
                if (it.childrenList) {
                  loop(it.childrenList);
                }
              });
            };
            loop(res.result);
            this.tableData = tableData;
          }
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
.planning-info {
  .planning-header {
    width: 200px;
    background-image: url(~@/assets/images-new/construction-management/planning-layout/header-bg.png);
    background-size: 100% 100%;
    color: #fff;
    font-family: YouSheBiaoTiHei;
    font-size: 16px;
    text-indent: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .segment-list {
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    .segment-item {
      display: flex;
      line-height: 24px;
      margin-bottom: 12px;
      &.segment-item-span1 {
        width: 33.33%;
      }
      &.segment-item-span2 {
        width: 66.67%;
      }
      &.segment-item-span3 {
        width: 100%;
      }
    }
    .segment-label {
      margin-right: 4px;
      width: 160px;
      text-align: right;
    }
    .segment-content {
      flex: 1;
      overflow: hidden;
      word-break: break-all;
      margin-right: 8px;
    }
  }
}
</style>
