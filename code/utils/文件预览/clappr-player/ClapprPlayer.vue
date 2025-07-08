<template>
  <div class="video-player-wrapper">
    <div v-if="player" class="video-top">
      <!-- <a-icon type="close" @click="close" /> -->
    </div>
    <div class="video-boxer">
      <div
        ref="playerDom"
        crossorigin="anonymous"
        style="width: 100%; height: 100%"
      ></div>
    </div>
  </div>
</template>

<script setup>
import Clappr from "clappr";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: "",
  },
});

const player = ref();
const playerDom = ref();

const destroy = () => {
  if (player.value) {
    player.value.destroy();
  }
};

const init = () => {
  destroy();
  player.value = new Clappr.Player({
    parent: playerDom.value,
    source: props.src,
    width: "100%",
    height: "100%",
  });
  player.value.play();
};

watch(() => props.src, init);
onMounted(init);
onBeforeUnmount(destroy);
</script>
<style scoped lang="less">
.video-player-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  &:hover {
    .video-top {
      display: flex;
      justify-content: flex-end;
    }
  }
  .video-top {
    position: absolute;
    right: 0px;
    width: 100%;
    height: 30px;
    z-index: 19999;
    background-color: transparent;
    display: none;
    .anticon {
      color: #fff;
      &:hover {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }
  .video-boxer {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: relative;
  }
  .video-cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 45px;
    cursor: pointer;
  }
}
</style>
