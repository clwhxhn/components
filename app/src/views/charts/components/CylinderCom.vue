<template>
  <div class="lui-column-bg">
    <div class="lui-inner" :class="colorCLass" :style="{ height: height + '%' }"></div>
    <div class="text-box">
      <p class="label">{{ label }}</p>
      <p class="value">{{ height ? height + "%" : "" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cylinder",
  props: {
    label: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 50,
    }, // 这个就是圆柱中的数据占比
  },
  data() {
    return {};
  },
  computed: {
    colorCLass() {
      if (this.height >= 80) {
        return "success-class";
      }
      if (this.height >= 30) {
        return "warning-class";
      }
      return "danger-class";
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.lui-column-bg {
  position: relative;
  width: 100px;
  height: 140px;
  margin: 0 auto;
  background-color: #d1d1d1;
}
.lui-column-bg:before {
  position: absolute;
  content: "";
  display: block;
  height: 20px;
  width: 100%;
  border-radius: 50%;
  top: -10.5px;
  z-index: 1;
  background-color: #e8e8e8;
}

.lui-column-bg:after {
  position: absolute;
  content: "";
  display: block;
  height: 30px;
  width: 100%;
  border-radius: 50%;
  bottom: -15px;
  background-color: #e8e8e8;
}

.lui-inner {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  //background-image: linear-gradient(to top, rgb(0, 255, 204), rgb(0, 199, 159));
  background-color: #eaaa00;
  text-align: center;
}
.lui-inner::before {
  position: absolute;
  content: "";
  display: block;
  height: 20px;
  width: 100%;
  background-color: #eec967;
  border-radius: 50%;
  top: -10.5px;
  z-index: 1;
}
.lui-inner:after {
  position: absolute;
  z-index: 10;
  content: "";
  display: block;
  height: 30px;
  width: 100%;
  border-radius: 50%;
  background-color: #eaaa00;
  bottom: -14px;
}

.text-box {
  position: absolute;
  z-index: 20;
  font-size: 14px;
  top: 50%;
  text-align: center;
  width: 100%;
  .label {
    margin-bottom: 10px;
  }
  .value {
    color: #fff;
  }
}

.danger-class {
  background-color: #e1677a;
  &::before {
    background-color: #f294a0;
  }
  &::after {
    background-color: #e1677a;
  }
}
.success-class {
  background-color: #42b029;
  &::before {
    background-color: #86dd72;
  }
  &::after {
    background-color: #42b029;
  }
}
.warning-class {
  background-color: #eaaa00;
  &::before {
    background-color: #eec967;
  }
  &::after {
    background-color: #eaaa00;
  }
}
</style>
