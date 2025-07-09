<template>
  <div class="risk-control-warehouse">
     底部1
  </div>
</template>
<script>

export default {
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
