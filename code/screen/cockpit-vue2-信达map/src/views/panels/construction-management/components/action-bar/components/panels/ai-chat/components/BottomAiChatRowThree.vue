<template>
  <div class="bottom-ai-chat-row-three">
    <div class="bottom-ai-chat-row-three-img"></div>
    <div class="bottom-ai-chat-row-three-text">
      <span>思考中</span>
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
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
.bottom-ai-chat-row-three {
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

  .loading {
    display: inline-block;
    font-size: 0px;
    padding: 0px;
  }

  .loading span {
    vertical-align: middle;
    border-radius: 100%;

    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 3px 2px;
    animation: loading-animation 0.8s linear infinite alternate;
  }

  .loading span:nth-child(1) {
    animation-delay: -1s;
    background: rgba(255, 255, 255, 0.6);
  }

  .loading span:nth-child(2) {
    animation-delay: -0.8s;
    background: rgba(255, 255, 255, 0.8);
  }

  .loading span:nth-child(3) {
    animation-delay: -0.26666s;
    background: rgba(255, 255, 255, 1);
  }

  .loading span:nth-child(4) {
    animation-delay: -0.8s;
    background: rgba(255, 255, 255, 0.8);
  }

  .loading span:nth-child(5) {
    animation-delay: -1s;
    background: rgba(255, 255, 255, 0.4);
  }

  @keyframes loading-animation {
    from {
      transform: scale(0, 0);
    }

    to {
      transform: scale(1, 1);
    }
  }
}
</style>
