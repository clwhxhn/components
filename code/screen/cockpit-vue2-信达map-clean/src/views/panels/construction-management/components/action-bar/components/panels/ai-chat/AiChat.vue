<template>
  <div class="bottom-ai-chat-modal">
    <div class="bottom-ai-chat-modal-content" ref="content">
      <BottomAiChatRow
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        @auto="onAuto"
      ></BottomAiChatRow>
    </div>
    <div class="bottom-ai-chat-modal-chat">
      <a-textarea
        v-model.trim="text"
        :disabled="loading"
        :auto-size="{ minRows: 4, maxRows: 6 }"
        placeholder="请输入..."
        @pressEnter="onPressEnter"
      ></a-textarea>
    </div>
    <div
      class="bottom-ai-chat-modal-button"
      v-if="!loading"
      @click="onPressEnter"
    >
      发送
    </div>
  </div>
</template>

<script>
import BottomAiChatRow from "./components/BottomAiChatRow.vue";

export default {
  components: {
    BottomAiChatRow,
  },
  data() {
    return {
      loading: false,
      text: "",
      // type 1,2,3,4
      // 1:用户
      // 2:机器人
      // 3:loading
      // 4:异常回答
      list: [
        {
          type: "2",
          text: "请输入您想知道的问题...",
        },
      ],
    };
  },
  methods: {
    getUuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // 代表UUID版本
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // 时钟序列
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
    scrollToBottom() {
      const domWrapper = this.$refs.content; // 外层容器 出现滚动条的dom
      (function smoothscroll() {
        const currentScroll = domWrapper.scrollTop; // 已经被卷掉的高度
        const clientHeight = domWrapper.offsetHeight; // 容器高度
        const scrollHeight = domWrapper.scrollHeight; // 内容总高度
        if (scrollHeight - 10 > currentScroll + clientHeight) {
          window.requestAnimationFrame(smoothscroll);
          domWrapper.scrollTo(
            0,
            currentScroll + (scrollHeight - currentScroll - clientHeight) / 2
          );
        }
      })();
    },
    onAuto() {
      this.$nextTick().then(() => {
        this.scrollToBottom();
      });
    },
    decodeUnicode(str) {
      return str.replace(/\\u[\dA-Fa-f]{4}/g, function (match) {
        return String.fromCharCode(parseInt(match.substr(2), 16));
      });
    },
    onPressEnter() {
      if (!this.text) {
        this.$message.info({ content: "请输入..." });
        return;
      }
      this.loading = true;
      const uid = this.getUuid();
      this.list.push(
        {
          text: this.text,
          type: "1",
        },
        {
          type: "3",
          uid,
        }
      );
      this.$nextTick().then(() => {
        this.scrollToBottom();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-ai-chat-modal {
  position: relative;
  padding: 10px;
  &-content {
    height: 300px;
    overflow: auto;
    scroll-behavior: smooth;
  }
  &-chat {
    position: relative;
    background-size: 100% 100%;
    background-image: url(~@/assets/images-new/common/ai-5.png);
    border: 1px solid rgba(58, 189, 255, 1);
    .ant-input {
      background: transparent !important;
      color: white;
      border: none !important;
    }
  }
  &-button {
    width: 80px;
    height: 30px;
    background-repeat: no-repeat;
    background-image: url(~@/assets/images-new/common/ai-3.png);
    background-size: 100% 100%;
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
  }
}
</style>
