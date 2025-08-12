<template>
  <div class="time-line-wrapper">
    <div class="time-line-box">
      <div class="time-line" @click="onClickTimeBar">
        <div class="time-bar" :style="'width: ' + currentPer + '%'">
          <!-- <div class="current-time">{{ currentTime }}</div> -->
        </div>
        <div
          v-for="(time, index) in displayTimeList"
          :key="index"
          :style="'left: ' + getLeft(index * step) + '%'"
          class="cmd-dot-box">
          <div>{{ timeFormat(time) }}</div>
        </div>
      </div>
    </div>
    <div class="ctrl-box">
      <div
        class="icon-play"
        :class="{ 'icon-pause': isPlay }"
        @click="onToggle()" />
      <div class="icon-stop" @click="onStop()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineExpose } from 'vue'
import { toFixed } from '@/utils/common'
import dayjs from 'dayjs'

let total = 0
let timeInterval: any = null
const current = ref<number>(0)
const isPlay = ref<boolean>(false)
let displayTimeList = ref<any[]>([])
let step = 1
const DISPLAY_CNT = 7

const props = defineProps({
  timeList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['start', 'updateTime', 'stop'])
function initData() {
  total = props.timeList.length
  current.value = 0

  if (total > DISPLAY_CNT) {
    step = Math.ceil(total / DISPLAY_CNT)
    let dispList: any[] = []
    let i = 0
    while (i < total) {
      if (i % step === 0) {
        dispList.push(props.timeList[i])
      }
      i++
    }
    displayTimeList.value = dispList
  } else {
    displayTimeList.value = props.timeList
  }
}
function getLeft(cIdx) {
  return toFixed((cIdx * 100) / (total - 1), 2)
}
function onTimeChange(cIdx) {
  if (cIdx >= total - 1) {
    current.value = total - 1
    clearTimeInterval()
    isPlay.value = false
  } else {
    current.value = cIdx
  }
  emit('updateTime', current.value)
}
function clearTimeInterval() {
  if (timeInterval) {
    clearInterval(timeInterval)
    timeInterval = null
  }
}
function addTimeInterval() {
  clearTimeInterval()
  timeInterval = setInterval(() => {
    const c = current.value + 1 // 控制step
    onTimeChange(c)
  }, 500)
}
function onPlay() {
  isPlay.value = true
  current.value = current.value === total - 1 ? 0 : current.value
  if (current.value === 0) {
    emit('start')
  }
  addTimeInterval()
}
function onPause() {
  isPlay.value = false
  clearTimeInterval()
}

function timeFormat(time) {
  if (!time) {
    return
  }
  return dayjs(time).format('MM-DD HH:mm')
}

const currentPer = computed(() => {
  if (!current.value) {
    return 0
  }
  if (current.value > total) {
    return 100
  }
  return getLeft(current.value)
})
// const currentTime = computed(() => {
//   return props.timeList[current.value]
// })
const onToggle = () => {
  isPlay.value = !isPlay.value
  if (isPlay.value) {
    onPlay()
  } else {
    onPause()
  }
}
const onClickTimeBar = e => {
  const offsetWidth = e.target.offsetWidth
  const offsetX = e.offsetX < 0 ? 0 : e.offsetX
  current.value = toFixed((total * offsetX) / offsetWidth, 0)
  onTimeChange(current.value)
}
const onStop = () => {
  clearTimeInterval()
  current.value = 0
  isPlay.value = false
  emit('stop')
}

defineExpose({
  onPlay,
  onStop
})

watch(
  () => props.timeList,
  () => {
    initData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="less" scoped>
.time-line-wrapper {
  position: relative;
}

.start-time,
.end-time {
  color: #ffffff;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  line-height: 20px;
  margin: 0 6px;
  width: 80px;
  text-align: center;
}

.time-line-box {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  padding: 0 5% 0 12%;

  .time-line {
    flex-grow: 1;
    height: 8px;
    background: rgba(221, 248, 255, 0.32);
    border: 1px solid rgba(221, 248, 255, 0.5);
    position: relative;
    cursor: pointer;

    .time-bar {
      pointer-events: none;
      position: relative;
      height: 7px;
      background: linear-gradient(180deg, #293ab3 0%, #31eabe 100%);
      border: 1px solid #3ebcee;

      &::after {
        content: '';
        position: absolute;
        width: 76px;
        height: 76px;
        top: -36px;
        right: -38px;
        background-image: url('@/assets/images/timeLine/icon-point2.png');
        background-size: 100% 100%;
        z-index: 10;
        pointer-events: none;
      }

      .current-time {
        position: absolute;
        top: 20px;
        width: 90px;
        right: -55px;
        color: #ddf8ff;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
      }
    }

    .cmd-dot-box {
      position: absolute;
      top: -2px;
      width: 10px;
      height: 10px;
      background-image: url('@/assets/images/timeLine/icon-point1.png');
      background-size: 100% 100%;
      transform: translateX(-50%);
      pointer-events: none;
      & > div {
        position: absolute;
        top: 24px;
        left: -16px;
        width: 68px;
        font-size: 12px;
        color: #ddf8ff;
        line-height: 20px;
      }
    }
  }
}
.ctrl-box {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-play {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-image: url('@/assets/images/timeLine/icon-play.png');
    background-size: 100% 100%;
    &.icon-pause {
      background-image: url('@/assets/images/timeLine/icon-pause.png');
    }
  }

  .icon-stop {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-left: 16px;
    background-image: url('@/assets/images/timeLine/icon-stop.png');
    background-size: 100% 100%;
  }
}
</style>
  