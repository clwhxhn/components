<template>
  <div class="bottom-ai-chat-row-one">
    <div class="bottom-ai-chat-row-one-text">
      <template v-for="text in item.text">
        {{ text }}
      </template>
    </div>
    <div class="bottom-ai-chat-row-one-img"></div>
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
.bottom-ai-chat-row-one {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  &-text {
    background: rgba(0, 76, 135, 0.64);
    border-radius: 3px 3px 3px 3px;
    border: 1px solid rgba(60, 183, 254, 0.7);
    padding: 5px 10px;
    max-width: 400px;
    color: white;
  }
  &-img {
    background-image: url(~@/assets/images-new/common/ai-1.png);
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: 10px;
  }
}
</style>
