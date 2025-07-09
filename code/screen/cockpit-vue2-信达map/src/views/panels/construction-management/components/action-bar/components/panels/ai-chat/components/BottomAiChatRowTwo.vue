<template>
  <div class="bottom-ai-chat-row-two">
    <div class="bottom-ai-chat-row-two-img"></div>
    <div class="bottom-ai-chat-row-two-text">
      <div v-html="textValue"></div>
      <!-- <template v-for="text in item.text">
        {{ text }}
      </template> -->
      <!-- <div ref="text"></div> -->
    </div>
  </div>
</template>

<script>
import markdownit from "markdown-it";

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      md: markdownit(),
    };
  },
  computed: {
    textValue() {
      if (Array.isArray(this.item.text)) {
        return this.md.render(this.item.text.join(""));
      }
      return this.item.text || "";
    },
  },
  mounted() {
    // const el = this.$refs.text;
    // this.setCursorStatus(el, "loading");
    // this.$nextTick().then(() => {
    //   this.printText(el, this.item.text || "");
    // });
  },
  methods: {
    /**
     * @description:
     * @param {HTMLElement} dom - 打印内容的dom
     * @param {string} content - 打印文本内容
     * @param {number} speed - 打印速度
     * @return {void}
     */
    printText(dom, content, speed = 50) {
      let index = 0;
      this.setCursorStatus(dom, "typing");
      let printInterval = setInterval(() => {
        dom.innerText += content[index];
        index++;
        if (index >= content.length) {
          this.setCursorStatus(dom, "end");
          clearInterval(printInterval);
        }
        this.$emit("auto");
      }, speed);
    },

    /**
     * @description: 设置dom的光标状态
     * @param {HTMLElement} dom - 打印内容的dom
     * @param {"loading"|"typing"|"end"} status - 打印状态
     * @return {void}
     */
    setCursorStatus(dom, status) {
      const classList = {
        loading: "typing blinker",
        typing: "typing",
        end: "",
      };
      dom.className = classList[status];
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes blinker {
  0% {
    visibility: visible;
  }
  50% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
}
.bottom-ai-chat-row-two {
  display: flex;
  align-items: flex-start;
  &-text {
    background: rgba(0, 76, 135, 0.64);
    border-radius: 3px 3px 3px 3px;
    border: 1px solid rgba(60, 183, 254, 0.7);
    padding: 5px 10px;
    max-width: 400px;
    color: white;
    word-break: break-all;
  }
  &-img {
    background-image: url(~@/assets/images-new/common/ai-2.png);
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
  }

  .typing::after {
    content: "|";
  }
  .blinker::after {
    animation: blinker 1s step-end infinite;
  }
}
</style>
