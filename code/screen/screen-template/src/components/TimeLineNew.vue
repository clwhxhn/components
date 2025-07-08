<template>
  <div class="time-line-wrapper">
    <div class="time-line" @click="onClickTimeBar">
      <div class="time-bar" :style="'width: ' + currentPer + '%'" />
      <div
        v-for="(time, index) in displayTimeList"
        v-show="labelType == ''"
        :key="index"
        :style="'left: ' + getLeft(index * step) + '%'"
        class="cmd-dot-box">
        <div>{{ time }}</div>
      </div>
      <div
        v-if="displayTimeList.length && props.labelType != ''"
        class="cmd-dot-box begin_time">
        <div>{{ displayTimeList[0].slice(5, 16) }}</div>
      </div>
      <div
        v-if="displayTimeList.length && props.labelType != ''"
        class="cmd-dot-box end_time">
        <div>
          {{ displayTimeList[displayTimeList.length - 1].slice(5, 16) }}
        </div>
      </div>
    </div>
    <div v-if="props.controls" class="ctrl-box">
      <div
        class="icon-play"
        :class="{ 'icon-pause': isPlay }"
        @click="onToggle()" />
      <!-- <div class="icon-stop" @click="onStop()" /> -->
      <!-- <div class="rate-box">
        <div class="play-rate">{{ playRate }}X</div>
        <div class="rate-list">
          <div
            :class="{ active: rate === playRate }"
            v-for="(rate, idx) in rateList"
            :key="idx"
            @click="onRateClick(rate)">
            {{ rate }}X
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { toFixed } from '@/utils'

const props = defineProps({
  timeList: {
    type: Array<any>,
    default: []
  },
  labelType: {
    type: String,
    default: ''
  },
  pause: {
    type: Boolean,
    default: false
  },
  tickInterval: {
    type: Number,
    default: 1
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  controls: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['timeUpdate', 'rateChange'])
let isPlay = ref<boolean>(false)
let timeInterval: any = null
let total = ref(0)
let step = ref(1)
let current = ref<number>(-1)
let displayTimeList = ref<any[]>([])
const DISPLAY_CNT = 7
const rateList = [0.5, 1, 1.5, 2].reverse()
let playRate = ref(1)

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
  onStop()
  if (total.value > DISPLAY_CNT) {
    step.value = Math.ceil(total.value / DISPLAY_CNT)
    let dispList: any[] = []
    let i = 0
    while (i < total.value) {
      if (i % step.value === 0) {
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
  return toFixed((tIdx * 100) / total.value, 2)
}
const currentPer = computed(() => {
  if (current.value < 0) {
    return 0
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
  const seconds =
    props.tickInterval !== 1
      ? toFixed(1000 / props.tickInterval, 0)
      : toFixed(1000 / playRate.value, 0)

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
  current.value = current.value > total.value ? -1 : current.value
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
  if (props.autoPlay) {
    isPlay.value = true
    onPlay()
  }
})

watch(
  () => props.pause,
  () => {
    onToggle()
  }
)

const onClickTimeBar = e => {
  const percent = toFixed(e.offsetX / e.target.offsetWidth, 2)
  current.value = Math.floor(percent * total.value)
  onTimeChange(current.value)
}

const onRateClick = rate => {
  // console.log(rate)
  playRate.value = rate
  emit('rateChange', rate)
  if (isPlay.value) {
    addTimeInterval()
  }
}
</script>
<style lang="less" scoped>
.time-line-wrapper {
  position: relative;
  padding-bottom: 30px;
  .time-line {
    width: 89%;
    height: 8px;
    background: rgba(221, 248, 255, 0.32);
    border: 1px solid rgba(221, 248, 255, 0.5);
    position: relative;
    pointer-events: all;
    cursor: pointer;
    margin: 0 4% 0 11%;

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
        left: -28px;
        width: 76px;
        font-size: 12px;
        color: #ddf8ff;
        line-height: 14px;
        text-align: center;
      }
      &.end_time {
        > div {
          left: -68px;
        }
      }
    }
    .end_time {
      right: -10px;
    }
  }
}
.ctrl-box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -6px;
  // margin-top: 36px;
  & > div {
    pointer-events: all;
  }

  .icon-play {
    cursor: pointer;
    width: 22px;
    height: 22px;
    background-image: url('@/assets/images/timeLine/icon-play.png');
    background-size: 100% 100%;
    &.icon-pause {
      background-image: url('@/assets/images/timeLine/icon-pause.png');
    }
  }

  .icon-stop {
    cursor: pointer;
    width: 18px;
    height: 18px;
    margin-left: 16px;
    background-image: url('@/assets/images/timeLine/icon-stop.png');
    background-size: 100% 100%;
  }

  .rate-box {
    position: relative;
    font-size: 10px;
    margin-left: 16px;
    cursor: pointer;
    &:hover {
      .rate-list {
        display: block;
      }
    }
    .play-rate {
      padding: 2px 4px;
      border-radius: 9px;
      background: linear-gradient(180deg, #6d9dfd 0%, #00ffff 100%);
      box-shadow: 0px 0px 3px 0px rgba(11, 128, 255, 0.6);
    }

    .rate-list {
      display: none;
      position: absolute;
      bottom: 16px;
      left: -8px;
      padding-bottom: 10px;
      line-height: 24px;
      & > div {
        padding: 0 8px;
        background: rgba(2, 184, 255, 0.48);
        &.active,
        &:hover {
          color: #ddf8ff;
        }
      }
    }
  }
}
</style>
