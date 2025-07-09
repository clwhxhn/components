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
        <div class="segment-content">
          {{ it.filter ? it.filter(model[it.key], model) : model[it.key] }}
        </div>
      </div>
    </div>
    <div class="planning-header">管理信息</div>
    <div class="segment-list">
      <div
        :class="['segment-item', 'segment-item-span' + (it.span || 1)]"
        v-for="it in segments2"
        :key="it.key"
      >
        <div class="segment-label">{{ it.label }}：</div>
        <div class="segment-content">
          {{ it.filter ? it.filter(model[it.key], model) : model[it.key] }}
        </div>
      </div>
    </div>
    <div class="planning-header">建设信息</div>
    <div class="segment-list">
      <div
        :class="['segment-item', 'segment-item-span' + (it.span || 1)]"
        v-for="it in segments3"
        :key="it.key"
      >
        <div class="segment-label">{{ it.label }}：</div>
        <div class="segment-content">
          {{ it.filter ? it.filter(model[it.key], model) : model[it.key] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatNumber } from "@/utils/number-helper";
import { getAction, postAction } from "@/utils";
import dayjs from "dayjs";

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseSegments: [
        { label: "工程名称", key: "name" },
        { label: "工程编码", key: "code" },
        { label: "工程类型", key: "typ_dictText" },
        { label: "工程规模", key: "engScal_dictText" },
        { label: "所属行政区划", key: "addvcd_dictText" },
        { label: "工程状态", key: "status_dictText" },
        { label: "是否度汛预警", key: "izFloodWarn_dictText" },
      ],
      segments2: [
        { label: "项目法人/建设单位", key: "legalDeptCode" },
        { label: "设计单位名称", key: "designDeptName" },
        { label: "监理单位名称", key: "supervisionDeptName" },
        { label: "施工单位名称", key: "constructionDeptName" },
        { label: "行政主管部门", key: "manageDeptCode_dictText" },
      ],
      segments3: [
        {
          label: "计划开工日期",
          key: "plannedComDate",
        },
        {
          label: "计划完工日期",
          key: "plannedCompletionDate",
        },
        { label: "实际开工日期", key: "actualComDate" },
        { label: "实际完工日期", key: "actualCompletionDate" },
        { label: "竣工验收日期", key: "acceptanceDate" },
        {
          label: "工程总投资（万元）",
          key: "totalInvestment",
          filter: formatNumber,
        },
        { label: "主要建设内容", key: "description", span: 3 },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.planning-info {
  height: 430px;
  overflow-y: auto;
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
