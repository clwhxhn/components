<template>
  <CommonPanel>
    <div class="panel-content">
      <span style="color: #fff">左</span>
    </div>
  </CommonPanel>
</template>

<script>
import CommonPanel from "@/views/components/CommonPanel.vue";
export default {
  components: {
    CommonPanel,
  },
};
</script>

<style lang="less" scoped>
.panel-content {
  padding: 0 10px;
}
</style>
