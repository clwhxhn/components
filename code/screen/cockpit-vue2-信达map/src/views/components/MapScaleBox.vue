<template>
  <div class="map-scale-box">
    <slot />
  </div>
</template>

<script>
/**
 * width        宽
 * height       高
 * delay        自适应缩放防抖延迟时间（ms）
 * scaleModel   拉伸模式  top顶部对齐等比缩放、center居中对齐等比缩放模式、flat拉伸模式
 * @scaleChange 缩放值发生改变的方法 可动态获取 scale 改变后的值
 */
export default {
  name: "ScaleBox",
  props: {
    /**
     * @prop {Number} width 大屏宽
     */
    width: {
      type: Number,
      default: 1920,
    },
    /**
     *  @prop {Number} height 大屏高
     */
    height: {
      type: Number,
      default: 1080,
    },
    /**
     * @prop {Number} delay 自适应缩放防抖延迟时间（ms）
     */
    delay: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      style: {
        position: "fixed",
        transform:
          "scaleX(var(--scaleBoxX)) scaleY(var(--scaleBoxY)) translate(-50%, -50%)",
        transformOrigin: "0 0",
        left: "50%",
        top: "50%",
        zIndex: 999,
        width: "var(--scaleBoxWidth)",
        height: "var(--scaleBoxHeight)",
      },
    };
  },
  mounted() {
    this.setProperty("--scaleBoxWidth", `${this.width}px`);
    this.setProperty("--scaleBoxHeight", `${this.height}px`);
    this.setScale();
    window.addEventListener("resize", this.debounce(this.setScale));
  },
  methods: {
    setProperty(key, value) {
      document.documentElement.style.setProperty(key, value);
    },
    setScale() {
      // 拉伸模式
      const scaleX = window.innerWidth / this.width;
      const scaleY = window.innerHeight / this.height;
      this.setProperty("--scaleBoxX", scaleX);
      this.setProperty("--scaleBoxY", scaleY);
    },
    debounce(fn, delay) {
      const delays = delay || this.delay;
      let timer;
      // eslint-disable-next-line func-names
      return function () {
        const th = this;
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        // eslint-disable-next-line func-names
        timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
        }, delays);
      };
    },
  },
};
</script>

<style lang="less" scoped>
.map-scale-box {
  height: 100%;
  width: 100%;
}
</style>
