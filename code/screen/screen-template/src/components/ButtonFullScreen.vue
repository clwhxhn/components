<template>
  <div class="full-screen-btn" @click="onClick">
    <span />
    <!-- <span>全屏</span> -->
  </div>
</template>

<script setup>
import { useUIStateStore } from '@/stores/uiState'
const uiState = useUIStateStore()
const onClick = () => {
  uiState.togglePanelCollapsed()
}
</script>

<style lang="less">
.full-screen-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  pointer-events: all;
  z-index: 100;
  text-align: center;

  & span:nth-child(1) {
    width: 48px;
    height: 48px;
    background: url(@/assets/images/bg-full-screen.png) no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto;
    &:hover {
      background: url(@/assets/images/bg-full-screen-hover.png) no-repeat center;
    }
  }

  & span:nth-child(2) {
    margin-top: 8px;
    font-size: 14px;
    color: #d1d1d1;
  }
}
</style>
