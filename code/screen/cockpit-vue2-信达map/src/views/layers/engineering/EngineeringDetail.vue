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
    <div class="planning-header">实施安排</div>
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
    <div class="planning-header">投资情况</div>
    <div class="segment-list">
      <div
        :class="['segment-item', 'segment-item-span' + (it.span || 1)]"
        v-for="it in segments4"
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
        { label: "项目名称", key: "name" },
        { label: "自编码", key: "selfCode" },
        { label: "项目代码", key: "engineeringCode" },
        { label: "项目分类", key: "category_dictText" },
        { label: "项目类型", key: "typ_dictText" },
        { label: "关联打捆项目", key: "relEngIds_dictText" },
        { label: "项目规模", key: "engineeringScale_dictText" },
        { label: "建设性质", key: "constructionNature_dictText" },
        { label: "建设状态", key: "constructionStatus_dictText" },
      ],
      segments2: [
        { label: "行政主管部门", key: "adminSupDeptId_dictText" },
        { label: "负责处室", key: "dutyOfficeId_dictText" },
        { label: "项目法人单位", key: "legalPersonUnit_dictText" },
      ],
      segments3: [
        {
          label: "计划开工年份",
          key: "planStartDate",
          filter: (text) => (text ? dayjs(text).format("YYYY年") : ""),
        },
        {
          label: "计划完工年份",
          key: "planEndDate",
          filter: (text) => (text ? dayjs(text).format("YYYY年") : ""),
        },
        { label: "工期（月份）", key: "designDuration" },
      ],
      segments4: [
        {
          label: "项目总投资（万元）",
          key: "totalInvestment",
          filter: formatNumber,
        },
        {
          label: "中央投资（万元）",
          key: "centerInvestment",
          filter: formatNumber,
        },
        {
          label: "征地移民投资（万元）",
          key: "immiInvestment",
          filter: formatNumber,
        },
        { label: "备注", key: "remarks", span: 3 },
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
