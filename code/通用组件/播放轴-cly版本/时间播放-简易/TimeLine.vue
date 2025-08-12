<template>
  <div class="time-line-wrapper">
    <div class="ctrl-box">
      <div
        class="icon-play"
        :class="{ 'icon-pause': isPlay }"
        @click="onToggle()" />
      <div class="icon-stop" @click="onStop()" />
    </div>
    <div class="time-line" @click="onClickTimeBar">
      <div
        v-if="currentPer >= 0"
        class="time-bar"
        :style="'width: ' + currentPer + '%'">
        <div class="current-time">
          {{ timeList[current] && timeList[current].slice(5, 16) }}
        </div>
      </div>
      <div
        v-for="(time, index) in displayTimeList"
        :key="index"
        :style="'left: ' + getLeft(index * step) + '%'"
        class="cmd-dot-box"
        :class="{ finished: current > index * step }">
        <div v-if="index % 2 === 0">{{ time.slice(5, 16) }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { toFixed } from '@/utils/common'

const props = defineProps({
  timeList: {
    type: Array<any>,
    default: []
  }
})

const emit = defineEmits(['timeUpdate'])
let isPlay = ref<boolean>(false)
let timeInterval: any = null
let total = ref(0)
let step = ref(1)
let current = ref<number>(-1)
let displayTimeList = ref<any[]>([])
const DISPLAY_CNT = 24

function onTimeChange(timeIdx: number) {
  emit('timeUpdate', timeIdx)
}

function clearTimeInterval() {
  if (timeInterval) {
    clearInterval(timeInterval)
    timeInterval = null
  }
}
const onStop = () => {
  clearTimeInterval()
  current.value = -1
  isPlay.value = false
  onTimeChange(current.value)
}

function initData() {
  total.value = props.timeList.length - 1
  // current.value = props.timeIdx
  if (total.value > DISPLAY_CNT) {
    step.value = Math.ceil(total.value / DISPLAY_CNT)
    let dispList: any[] = []
    let i = 0
    while (i < total.value) {
      if (i % step.value === 0 || i === total.value - 1) {
        dispList.push(props.timeList[i])
      }
      i += 1
    }
    displayTimeList.value = dispList
  } else {
    displayTimeList.value = props.timeList
  }
}
watch(
  () => props.timeList,
  () => {
    initData()
  }
)

const getLeft = tIdx => {
  if (tIdx > total.value) {
    return 100
  }
  return toFixed((tIdx * 100) / total.value, 2)
}
const currentPer = computed(() => {
  if (current.value < 0) {
    return -1
  }
  if (current.value > total.value) {
    return 100
  }
  return getLeft(current.value)
})

function onPause() {
  clearTimeInterval()
}

function addTimeInterval() {
  clearTimeInterval()
  const seconds = 1000

  timeInterval = setInterval(() => {
    if (current.value < total.value) {
      current.value += 1
      onTimeChange(current.value)
    } else {
      onStop()
    }
  }, seconds)
}

function onPlay() {
  current.value = current.value > total.value ? 0 : current.value
  addTimeInterval()
}

const onToggle = () => {
  isPlay.value = !isPlay.value
  if (isPlay.value) {
    onPlay()
  } else {
    onPause()
  }
}

onMounted(() => {
  initData()
})

onUnmounted(() => {
  clearTimeInterval()
})

const onClickTimeBar = e => {
  const percent = toFixed(e.offsetX / e.target.offsetWidth, 2)
  current.value = Math.floor(percent * total.value)
  onTimeChange(current.value)
}
</script>
<style lang="less" scoped>
.time-line-wrapper {
  display: flex;
  align-items: center;
  padding-right: 48px;

  .ctrl-box {
    display: flex;
    align-items: center;
    margin: 24px 48px 0 0;
    & > div {
      pointer-events: all;
    }

    .icon-play {
      cursor: pointer;
      width: 58px;
      height: 58px;
      background-image: url('@/assets/images/timeLine/icon-play.png');
      background-size: 100% 100%;
      &.icon-pause {
        background-image: url('@/assets/images/timeLine/icon-pause.png');
      }
    }

    .icon-stop {
      cursor: pointer;
      width: 58px;
      height: 58px;
      margin-left: 16px;
      background-image: url('@/assets/images/timeLine/icon-stop.png');
      background-size: 100% 100%;
    }
  }

  .time-line {
    flex-grow: 1;
    height: 12px;
    background: rgba(221, 248, 255, 0.32);
    border: 1px solid rgba(221, 248, 255, 0.5);
    position: relative;
    pointer-events: all;
    cursor: pointer;
    margin-top: 36px;
    z-index: 9;

    .time-bar {
      pointer-events: none;
      position: relative;
      height: 12px;
      background: linear-gradient(180deg, #293ab3 0%, #31eabe 100%);
      border: 1px solid #3ebcee;

      .current-time {
        position: absolute;
        z-index: 9;
        top: -54px;
        right: -74px;
        width: 148px;
        height: 44px;
        background-image: url('@/assets/images/timeLine/bg-current-time.png');
        background-size: 100% 100%;
        color: #00ffff;
        font-size: 22px;
        line-height: 30px;
        text-align: center;
        padding: 6px 0;
      }

      &::after {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        top: -16px;
        right: -20px;
        background-image: url('@/assets/images/timeLine/point-current.png');
        background-size: 100% 100%;
        z-index: 10;
        pointer-events: none;
      }
    }

    .warning-bar {
      pointer-events: none;
      & > div {
        position: absolute;
        top: -11px;
        height: 10px;
        background: rgba(255, 89, 89, 0.59);
        border: none;
      }
    }

    .cmd-dot-box {
      position: absolute;
      top: -6px;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
      background: rgba(77, 101, 125, 0.5);
      box-shadow: inset 0px 0px 1px 1px rgba(255, 255, 255, 0.5);
      border: 1px solid #ffffff;
      border-radius: 50%;
      pointer-events: none;
      &.finished {
        background: rgba(175, 204, 255, 0.6);
        border-color: rgba(0, 255, 255, 1);
      }
      &.warning {
        background: rgba(141, 79, 79, 0.72);
        border-color: #ff9595;
        box-shadow:
          0px 0px 4px 2px rgba(255, 53, 53, 0.72),
          inset 0px 0px 8px 4px rgba(255, 53, 53, 0.64);
      }
      & > div {
        position: absolute;
        top: -40px;
        left: -56px;
        width: 136px;
        font-size: 22px;
        color: #ffffff;
        line-height: 28px;
        text-align: center;
      }
    }
  }
}
</style>
