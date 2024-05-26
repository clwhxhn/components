<template>
  <div class="bg">
    <h1>需要通过每个时间点调接口缓存数据</h1>
    <Demo1></Demo1>
    <hr />
    <h1>不需要缓存数据，直接播放</h1>
    <Demo2 />
  </div>
</template>

<script>
import Demo1 from "./Demo1.vue";
import Demo2 from "./Demo2.vue";
export default {
  components: {
    Demo1,
    Demo2
  },
};
</script>

<style lang="less" scoped>
.bg {
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  h1 {
    color: #fff;
  }
}
</style>