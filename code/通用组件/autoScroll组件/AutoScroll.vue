<template>
  <div
    ref="containerRef"
    class="auto-scroll-container"
    :style="{ height }"
    @mouseenter="pauseScroll"
    @mouseleave="startScroll"
  >
    <div ref="contentRef" class="auto-scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps({
  isScroll: { type: Boolean, default: true },
  speed: { type: Number, default: 1 }, // 每帧移动像素
  height: { type: String, default: '130px' }
})

const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

let scrollTimer: number | null = null
const needScroll = ref(false)

const startScroll = () => {
  if (!props.isScroll || !needScroll.value) return
  stopScroll()
  scrollTimer = requestAnimationFrame(scrollStep)
}

const pauseScroll = () => {
  stopScroll()
}

const stopScroll = () => {
  if (scrollTimer) {
    cancelAnimationFrame(scrollTimer)
    scrollTimer = null
  }
}

let accumulated = 0

const scrollStep = () => {
  if (!containerRef.value || !contentRef.value) return

  const container = containerRef.value
  const contentHeight = contentRef.value.offsetHeight
  const containerHeight = container.offsetHeight

  accumulated += props.speed
  container.scrollTop = Math.floor(accumulated)

  // 到底部时直接回到顶部
  if (container.scrollTop + containerHeight >= contentHeight) {
    accumulated = 0
    container.scrollTop = 0
  }

  scrollTimer = requestAnimationFrame(scrollStep)
}


onMounted(() => {
  nextTick(() => {
    if (!containerRef.value || !contentRef.value) return

    needScroll.value = contentRef.value.offsetHeight > containerRef.value.offsetHeight

    if (props.isScroll && needScroll.value) startScroll()
  })
})

onBeforeUnmount(() => {
  stopScroll()
})

watch(
  () => props.isScroll,
  (newVal) => {
    if (newVal) startScroll()
    else pauseScroll()
  }
)
</script>

<style scoped lang="less">
.auto-scroll-container {
  position: relative;
  overflow-y: auto;
}

.auto-scroll-content {
  white-space: normal;
}
</style>
