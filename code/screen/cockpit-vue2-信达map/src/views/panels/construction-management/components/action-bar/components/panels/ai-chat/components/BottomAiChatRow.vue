<template>
  <div class="bottom-ai-chat-row">
    <template v-if="item.type === '1'">
      <BottomAiChatRowOne :item="item"></BottomAiChatRowOne>
    </template>
    <template v-if="item.type === '2'">
      <BottomAiChatRowTwo :item="item" @auto="onAuto"></BottomAiChatRowTwo>
    </template>
    <template v-if="item.type === '3'">
      <BottomAiChatRowThree></BottomAiChatRowThree>
    </template>
    <template v-if="item.type === '4'">
      <BottomAiChatRowFour></BottomAiChatRowFour>
    </template>
  </div>
</template>

<script>
import BottomAiChatRowOne from "./BottomAiChatRowOne.vue";
import BottomAiChatRowTwo from "./BottomAiChatRowTwo.vue";
import BottomAiChatRowThree from "./BottomAiChatRowThree.vue";
import BottomAiChatRowFour from "./BottomAiChatRowFour.vue";

export default {
  components: {
    BottomAiChatRowOne,
    BottomAiChatRowTwo,
    BottomAiChatRowThree,
    BottomAiChatRowFour,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onAuto() {
      this.$emit("auto");
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-ai-chat-row {
  position: relative;

  > div {
    margin-bottom: 10px;
  }
}
</style>
