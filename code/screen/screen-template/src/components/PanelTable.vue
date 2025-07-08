<template>
  <div class="panel-table">
    <div class="btn-close" @click="onClose"></div>
    <a-table :dataSource="dataSource" :columns="columns" :scroll="{ y: 176 }" :pagination="false" />
  </div>
</template>
<script setup lang="ts">
  import { usePanelTableStore } from '@/stores/panelTable';

  const props = defineProps({
    columns: {
      type: Array,
      default: [],
    },
    dataSource: {
      type: Array,
      default: [],
    },
  });
  const panelTableStore = usePanelTableStore();
  const onClose = () => {
    panelTableStore.setShow(false);
  };
</script>
<style lang="less" scoped>
  .panel-table {
    width: 1016px;
    height: 318px;
    background-image: url('@/assets/images/bkg-table.png');
    background-size: 100% 100%;
    position: fixed;
    bottom: 64px;
    left: calc(50% - 508px);
    pointer-events: all;
    padding: 36px 12px;

    .btn-close {
      position: absolute;
      top: 24px;
      right: 2px;
      width: 22px;
      height: 22px;
      background-image: url('@/assets/images/btn-close.png');
      background-size: 100%;
      cursor: pointer;
    }
  }
  :deep(.ant-table) {
    background: transparent;
    font-size: 14px;
  }
  :deep(.ant-table-thead) {
    & > tr > th {
      background: transparent;
      color: #ddf8ff;
      padding: 16px 0 10px;
      text-align: center;
      &:nth-child(2) {
        text-align: left;
      }
    }
  }
  :deep(.ant-table-tbody) {
    & > tr.ant-table-row {
      &:hover {
        td {
          background: rgba(44, 87, 133, 0.3);
          color: #00ffff;
        }
      }
      & > td {
        background: transparent;
        color: #3ebcee;
        padding: 8px 0;
        text-align: center;
        &:nth-child(1) {
          color: #ffffff;
        }
        &:nth-child(2) {
          text-align: left;
        }
      }
    }
  }
</style>
