<template>
  <div class="container">
    <div class="item-box"><MountainWarningList /></div>
    <div class="item-box"><BasicInfo /></div>
    <div style="width:200px;height: 200px"><Tab1Com /></div>
  </div>
</template>

<script>
import MountainWarningList from "./modules/MountainWarningList";
import BasicInfo from './modules/BasicInfo'
import Tab1Com from '@/components/tabs/Tab1Com'
export default {
  components: {
    MountainWarningList,
    BasicInfo,
    Tab1Com
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