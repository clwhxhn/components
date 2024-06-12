
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <transition name="slide-top">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="less" scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 3000ms;
}

.slide-left-enter,
.slide-left-leave-to {
  transition: all 3000ms;
  opacity: 0;
}

//

.slide-top-enter-active {
  transition: all 300ms;
}

.slide-top-leave-active {
  transition: all 300ms;
  display: none;
}

.slide-top-enter,
.slide-top-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>