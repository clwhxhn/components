<template>
  <div class="bottom-ai-chat-row-four">
    <div class="bottom-ai-chat-row-four-img"></div>
    <div class="bottom-ai-chat-row-four-text">
      <span>系统繁忙，请稍后再进行问答......</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-ai-chat-row-four {
  display: flex;
  align-items: flex-start;
  &-text {
    background: rgba(0, 76, 135, 0.64);
    border-radius: 3px 3px 3px 3px;
    border: 1px solid rgba(60, 183, 254, 0.7);
    padding: 5px 10px;
    max-width: 400px;
    color: white;
    display: flex;
    align-items: center;
  }
  &-img {
    background-image: url(~@/assets/images-new/common/ai-2.png);
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
  }
}
</style>
