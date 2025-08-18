<template>
  <div class="simple-player">
    <div class="player-bar">
      <!-- 播放控制 -->
      <div class="controls">
        <button @click="togglePlay" class="play-btn" :class="{ playing: isPlaying }">
          <span v-if="!isPlaying">▶</span>
          <span v-else>⏸</span>
        </button>
        
        <button @click="reset" class="reset-btn" title="重置">
          ⟲
        </button>
      </div>
      
      <!-- 时间轴 -->
      <div class="timeline">
        <a-slider
          :min="0"
          :max="timeList.length - 1"
          v-model:value="currentIndex"
          @change="onTimeChange"
          :tooltip-visible="false"
          class="timeline-slider"
        />
      </div>
      
      <!-- 时间显示 -->
      <div class="time-display">
        {{ currentIndex + 1 }} / {{ timeList.length }}
      </div>
      
      <!-- 速度控制 -->
      <div class="speed-control">
        <select v-model="playSpeed" @change="onSpeedChange">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="3">3x</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { Slider } from 'ant-design-vue'

export default {
  components: {
    'a-slider': Slider
  },
  name: 'SimplePlayer',
  props: {
    timeList: {
      type: Array,
      default: () => []
    },
    interval: {
      type: Number,
      default: 1000
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      isPlaying: false,
      currentIndex: 0,
      playSpeed: 1,
      playTimer: null
    }
  },
  
  methods: {
    play() {
      if (this.isPlaying || this.timeList.length === 0) return
      
      this.isPlaying = true
      this.$emit('play', this.currentIndex)
      
      const playNext = () => {
        if (!this.isPlaying) return
        
        this.$emit('time-change', this.currentIndex, this.timeList[this.currentIndex])
        
        if (this.currentIndex < this.timeList.length - 1) {
          this.currentIndex++
          this.playTimer = setTimeout(playNext, this.interval / this.playSpeed)
        } else {
          if (this.loop) {
            this.currentIndex = 0
            this.playTimer = setTimeout(playNext, this.interval / this.playSpeed)
          } else {
            this.pause()
          }
        }
      }
      
      playNext()
    },
    
    pause() {
      this.isPlaying = false
      if (this.playTimer) {
        clearTimeout(this.playTimer)
        this.playTimer = null
      }
      this.$emit('pause', this.currentIndex)
    },
    
    togglePlay() {
      if (this.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    
    reset() {
      this.pause()
      this.currentIndex = 0
      this.$emit('reset')
      this.$emit('time-change', 0, this.timeList[0])
    },
    
    // 修复bug：播放过程中手动修改位置不暂停
    onTimeChange() {
      // 不暂停播放，只是触发时间变化事件
      this.$emit('time-change', this.currentIndex, this.timeList[this.currentIndex])
    },
    
    onSpeedChange() {
      this.$emit('speed-change', this.playSpeed)
    }
  },
  
  watch: {
    timeList() {
      this.reset()
    }
  },
  
  beforeDestroy() {
    this.pause()
  }
}
</script>

<style scoped>
.simple-player {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
}

.player-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.controls {
  display: flex;
  gap: 4px;
}

.play-btn, .reset-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background-color 0.2s;
}

.play-btn:hover, .reset-btn:hover {
  background: #0056b3;
}

.play-btn.playing {
  background: #dc3545;
}

.play-btn.playing:hover {
  background: #c82333;
}

.timeline {
  flex: 1;
  margin: 0 8px;
}

.timeline-slider {
  width: 100%;
}

.timeline-slider :deep(.ant-slider-rail) {
  height: 4px;
  background: #ddd;
  border-radius: 2px;
}

.timeline-slider :deep(.ant-slider-track) {
  height: 4px;
  background: #007bff;
  border-radius: 2px;
}

.timeline-slider :deep(.ant-slider-handle) {
  width: 16px;
  height: 16px;
  background: #007bff;
  border: 2px solid #007bff;
  margin-top: -6px;
}

.timeline-slider :deep(.ant-slider-handle:hover) {
  border-color: #0056b3;
  background: #0056b3;
}

.timeline-slider :deep(.ant-slider-handle:focus) {
  border-color: #0056b3;
  background: #0056b3;
  box-shadow: 0 0 0 5px rgba(0, 123, 255, 0.12);
}

.time-display {
  font-size: 12px;
  color: #666;
  min-width: 60px;
  text-align: center;
}

.speed-control select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  background: white;
}
</style>