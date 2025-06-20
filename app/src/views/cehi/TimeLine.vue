<template>
  <div class="time-line-wrapper">
    <div class="ctrl-box">
      <div
        class="icon-play"
        :class="{ 'icon-pause': isPlay }"
        @click="onToggle" />
      <div class="icon-stop" @click="onStop" />
    </div>
    <div class="time-line" @click="onClickTimeBar">
      <div
        v-if="currentPer >= 0"
        class="time-bar"
        :style="{ width: currentPer + '%' }">
        <div class="current-time">
          {{ timeList[current] && timeList[current].slice(5, 16) }}
        </div>
      </div>
      <div
        v-for="(time, index) in displayTimeList"
        :key="index"
        :style="{ left: getLeft(index * step) + '%' }"
        class="cmd-dot-box"
        :class="{ finished: current > index * step }">
        <div v-if="index % 2 === 0">{{ time.slice(5, 16) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toFixed } from '@/utils/common'

export default {
  name: 'TimeLinePlayer',
  props: {
    timeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isPlay: false,
      timeInterval: null,
      total: 0,
      step: 1,
      current: -1,
      displayTimeList: [],
      DISPLAY_CNT: 24
    }
  },
  computed: {
    currentPer() {
      if (this.current < 0) return -1
      if (this.current > this.total) return 100
      return this.getLeft(this.current)
    }
  },
  watch: {
    timeList: {
      immediate: true,
      handler() {
        this.initData()
      }
    }
  },
  methods: {
    initData() {
      this.total = this.timeList.length - 1
      if (this.total > this.DISPLAY_CNT) {
        this.step = Math.ceil(this.total / this.DISPLAY_CNT)
        let dispList = []
        let i = 0
        while (i < this.total) {
          if (i % this.step === 0 || i === this.total - 1) {
            dispList.push(this.timeList[i])
          }
          i++
        }
        this.displayTimeList = dispList
      } else {
        this.displayTimeList = this.timeList
      }
    },
    getLeft(tIdx) {
      if (tIdx > this.total) return 100
      return toFixed((tIdx * 100) / this.total, 2)
    },
    onToggle() {
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        this.onPlay()
      } else {
        this.onPause()
      }
    },
    onPlay() {
      if (this.current > this.total) this.current = 0
      this.addTimeInterval()
    },
    onPause() {
      this.clearTimeInterval()
    },
    onStop() {
      this.clearTimeInterval()
      this.current = -1
      this.isPlay = false
      this.$emit('timeUpdate', this.current)
    },
    addTimeInterval() {
      this.clearTimeInterval()
      this.timeInterval = setInterval(() => {
        if (this.current < this.total) {
          this.current++
          this.$emit('timeUpdate', this.current)
        } else {
          this.onStop()
        }
      }, 1000)
    },
    clearTimeInterval() {
      if (this.timeInterval) {
        clearInterval(this.timeInterval)
        this.timeInterval = null
      }
    },
    onClickTimeBar(e) {
      const percent = toFixed(e.offsetX / e.target.offsetWidth, 2)
      this.current = Math.floor(percent * this.total)
      this.$emit('timeUpdate', this.current)
    }
  },
  beforeDestroy() {
    this.clearTimeInterval()
  }
}
</script>

<style lang="less" scoped>
/* 保留你的样式原样 */
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
      background-image: url('@assets/time-line/player-play.png');
      background-size: 100% 100%;
      &.icon-pause {
        background-image: url('@assets/time-line/player-pause.png');
      }
    }

    .icon-stop {
      cursor: pointer;
      width: 58px;
      height: 58px;
      margin-left: 16px;
      background-image: url('@assets/time-line/player-pause.png');
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
        background-image: url('@assets/time-line/player-play.png');
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
        background-image: url('@assets/time-line/player-play.png');
        background-size: 100% 100%;
        z-index: 10;
        pointer-events: none;
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
