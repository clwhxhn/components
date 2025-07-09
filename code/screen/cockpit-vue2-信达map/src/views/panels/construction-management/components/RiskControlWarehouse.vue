<template>
  <div class="risk-control-warehouse">
    <div class="risk-control-warehouse-header">风险管控仓</div>
    <div class="risk-control-warehouse-content">
      <div class="data-row" v-for="it in kpiList" :key="it.key1">
        <div class="data-item data-item1">
          <span class="data-label">{{ it.label1 }}</span>
          <ItemValue :value="dataSource[it.key1]" unit="个"></ItemValue>
        </div>
        <div class="data-item">
          <span class="data-label">{{ it.label2 }}</span>
          <ItemValue :value="dataSource[it.key2]" unit="个"></ItemValue>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemValue from "@/components/ItemValue.vue";

export default {
  components: { ItemValue },
  data() {
    return {
      dataSource: {
        key1_1: 0,
        key1_2: 0,
        key2_1: 0,
        key2_2: 0,
        key3_1: 0,
        key3_2: 0,
        key4_1: 0,
        key4_2: 4,
        key5_1: 0,
        key5_2: 0,
      },
      kpiList: [
        {
          label1: "可研审查超期项目",
          //todo: 等对接接口时再调整字段名
          key1: "key1_1",
          label2: "（预测可能超期项目）",
          key2: "key1_2",
        },
        {
          label1: "初设审批超期项目",
          //todo: 等对接接口时再调整字段名
          key1: "key2_1",
          label2: "（预测可能超期项目）",
          key2: "key2_2",
        },
        {
          label1: "开工时间滞后项目",
          //todo: 等对接接口时再调整字段名
          key1: "key3_1",
          label2: "（预测可能开工时间滞后项目）",
          key2: "key3_2",
        },
        {
          label1: "存在度汛风险的工程",
          //todo: 等对接接口时再调整字段名
          key1: "key4_1",
          label2: "（预测可能存在度汛风险工程）",
          key2: "key4_2",
        },
        {
          label1: "累计完成投资滞后区县",
          //todo: 等对接接口时再调整字段名
          key1: "key5_1",
          label2: "（预测可能投资滞后区县）",
          key2: "key5_2",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.risk-control-warehouse {
  display: flex;
  &-header {
    width: 48px;
    background-image: url(~@/assets/images-new/construction-management/risk-control-warehouse/header-bg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-lr;
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
  &-content {
    .data-row {
      width: 590px;
      height: 30px;
      display: flex;
      align-items: center;
      background-image: url(~@/assets/images-new/construction-management/risk-control-warehouse/content-bg.png);
      background-size: 100% 100%;
      margin-bottom: 3px;
      box-sizing: border-box;
      padding-left: 16px;
      &:last-child {
        margin-bottom: 0;
      }
      .data-item {
        display: flex;
        align-items: center;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        color: #fff;
        --primary-color: #FFEF16;
        .data-label {
          margin-right: 4px;
        }
        &1 {
        --primary-color: #FF9500;
          width: 180px;
        }
      }
    }
  }
}
</style>
