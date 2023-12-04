<template>
  <div class="container">
    <div class="item-box"><MountainWarningList /></div>
    <div class="item-box"><BasicInfo /></div>
  </div>
</template>

<script>
import MountainWarningList from "./modules/MountainWarningList";
import BasicInfo from './modules/BasicInfo'
export default {
  components: {
    MountainWarningList,
    BasicInfo
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-wrap: wrap;
  .item-box {
    width: 500px;
    height: 400px;
  }
}
</style>