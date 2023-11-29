<template>
  <div class="container">
    <div class="item-box"><MountainWarningList /></div>
  </div>
</template>

<script>
import MountainWarningList from "./modules/MountainWarningList";
export default {
  components: {
    MountainWarningList,
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