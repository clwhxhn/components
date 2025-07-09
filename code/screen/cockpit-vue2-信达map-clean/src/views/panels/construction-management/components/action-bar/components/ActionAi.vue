<template>
  <div @click="handleAction()" class="action-item">
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
  </div>
</template>
<script>
import { showModal } from "@/components/easy-modal/modal";
import { SchintaMapHelp } from "schinta-map";
import AiChat from "./panels/ai-chat/AiChat.vue";

export default {
  mixins: [SchintaMapHelp()],
  data() {
    return {};
  },
  methods: {
    handleAction() {
      showModal({
        title: "AI问答",
        component: AiChat,
      });
    },
  },
};
</script>
<style lang="less" scoped>
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-7.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-active-7.png);
}
</style>
