<template>
  <div class="high-player">
    <div class="player-controls">
      <!-- 播放/暂停按钮 -->
      <div class="control-btn" @click="togglePlay">
        <svg v-if="!isPlaying" class="icon" viewBox="0 0 1024 1024">
          <path d="M170.666667 896a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 68.266667-34.133334l682.666666 341.333334a42.666667 42.666667 0 0 1 0 68.266666l-682.666666 341.333334A42.666667 42.666667 0 0 1 170.666667 896z" fill="currentColor"/>
        </svg>
        <svg v-else class="icon" viewBox="0 0 1024 1024">
          <path d="M298.666667 128h85.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H298.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m341.333333 0h85.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H640a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="currentColor"/>
        </svg>
      </div>
      
      <!-- 重置按钮 -->
      <div class="control-btn" @click="reset" title="重置">
        <svg class="icon" viewBox="0 0 1024 1024">
          <path d="M512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333z m0 768c-188.202667 0-341.333333-153.130667-341.333333-341.333333S323.797333 170.666667 512 170.666667s341.333333 153.130667 341.333333 341.333333-153.130667 341.333333-341.333333 341.333333z" fill="currentColor"/>
          <path d="M512 298.666667c-117.632 0-213.333333 95.701333-213.333333 213.333333s95.701333 213.333333 213.333333 213.333333 213.333333-95.701333 213.333333-213.333333-95.701333-213.333333-213.333333-213.333333z m0 341.333333c-70.570667 0-128-57.429333-128-128s57.429333-128 128-128 128 57.429333 128 128-57.429333 128-128 128z" fill="currentColor"/>
        </svg>
      </div>
      
      <!-- 速度选择 -->
      <div class="speed-control">
        <select v-model="playSpeed" @change="onSpeedChange" class="speed-select">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="3">3x</option>
          <option value="5">5x</option>
        </select>
      </div>
    </div>
    
    <!-- 时间轴 -->
    <div class="timeline-container">
      <div class="timeline-info">
        <span class="current-time">{{ currentTimeText }}</span>
        <span class="total-time">{{ totalTimeText }}</span>
      </div>
      
      <div class="timeline-slider">
        <input 
          type="range" 
          :min="0" 
          :max="timeList.length - 1" 
          v-model="currentIndex" 
          @input="onSliderChange"
          class="slider"
        />
        

      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-indicator">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
    
    <!-- 缓存状态 -->
    <div v-if="enableCache" class="cache-status">
      <span>缓存: {{ cachedCount }}/{{ timeList.length }}</span>
      <div class="cache-progress">
        <div 
          class="cache-progress-bar" 
          :style="{ width: (cachedCount / timeList.length) * 100 + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HighPlayer',
  props: {
    // 时间列表数据
    timeList: {
      type: Array,
      default: () => [],
      validator: (list) => {
        return list.every(item => 
          item && 
          (typeof item === 'string' || 
           typeof item === 'number' || 
           (typeof item === 'object' && (item.time || item.endTime || item.tm)))
        )
      }
    },
    
    // 是否启用缓存模式
    enableCache: {
      type: Boolean,
      default: false
    },
    
    // 播放间隔（毫秒）
    interval: {
      type: Number,
      default: 1000
    },
    
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    
    // 是否循环播放
    loop: {
      type: Boolean,
      default: false
    },
    
    // 时间格式化函数
    timeFormatter: {
      type: Function,
      default: null
    },
    

  },
  
  data() {
    return {
      isPlaying: false,
      currentIndex: 0,
      playSpeed: 1,
      loading: false,
      dataCache: {}, // 简化缓存策略，使用普通对象
      playTimer: null
    }
  },
  
  computed: {
    currentTimeText() {
      if (this.timeList.length === 0) return '--'
      const currentItem = this.timeList[this.currentIndex]
      return this.formatTime(this.getTimeFromItem(currentItem))
    },
    
    totalTimeText() {
      if (this.timeList.length === 0) return '--'
      const lastItem = this.timeList[this.timeList.length - 1]
      return this.formatTime(this.getTimeFromItem(lastItem))
    },
    
    cachedCount() {
      return Object.keys(this.dataCache).length
    },
    

  },
  
  methods: {
    // 工具函数
    getTimeFromItem(item) {
      if (!item) return new Date()
      if (typeof item === 'string' || typeof item === 'number') {
        return new Date(item)
      }
      if (typeof item === 'object') {
        return new Date(item.time || item.endTime || item.tm || new Date())
      }
      return new Date()
    },
    
    formatTime(time) {
      if (this.timeFormatter) {
        return this.timeFormatter(time)
      }
      
      const date = new Date(time)
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${month}-${day} ${hours}:${minutes}`
    },
    
    // 数据加载
    async loadData(index) {
      if (!this.enableCache) {
        // 非缓存模式，直接触发数据加载事件
        this.$emit('load-data', index, this.timeList[index])
        return this.timeList[index]
      }
      
      // 缓存模式
      if (this.dataCache[index]) {
        return this.dataCache[index]
      }
      
      this.loading = true
      
      try {
        // 触发数据加载事件，让父组件提供真实的数据加载逻辑
        const data = await new Promise((resolve, reject) => {
          // 设置超时处理
          const timeout = setTimeout(() => {
            reject(new Error(`数据加载超时 - 索引: ${index}`))
          }, 10000) // 10秒超时
          
          // 监听一次性事件来获取数据
          const handleDataResponse = (responseData) => {
            clearTimeout(timeout)
            if (responseData && responseData.index === index) {
              resolve(responseData)
            } else {
              reject(new Error(`数据响应不匹配 - 期望索引: ${index}`))
            }
          }
          
          // 触发数据加载请求
          this.$emit('load-data', index, this.timeList[index], handleDataResponse)
        })
        
        // 缓存数据
        this.dataCache[index] = data
        this.$emit('data-loaded', index, data)
        
        return data
      } catch (error) {
        console.error('数据加载失败:', error)
        this.$emit('load-error', index, error)
        return null
      } finally {
        this.loading = false
      }
    },
    
    // 播放控制
    async play() {
      if (this.isPlaying) return
      
      this.isPlaying = true
      this.$emit('play', this.currentIndex)
      
      const playNext = async () => {
        if (!this.isPlaying) return
        
        // 加载当前数据，如果失败则重试
        let data = null
        let retryCount = 0
        const maxRetries = 3 // 最大重试次数
        
        while (data === null && this.isPlaying && retryCount < maxRetries) {
          data = await this.loadData(this.currentIndex)
          if (data === null) {
            retryCount++
            console.log(`数据加载失败，正在重试... (${retryCount}/${maxRetries})，索引: ${this.currentIndex}`)
            // 等待一段时间后重试
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
        
        // 如果达到最大重试次数仍然失败，跳过当前数据继续播放
        if (data === null && this.isPlaying) {
          console.log(`数据加载失败，已达到最大重试次数，跳过当前数据继续播放，索引: ${this.currentIndex}`)
          // 触发错误事件，但传递null数据
          this.$emit('change-time', this.currentIndex, null)
        } else if (this.isPlaying) {
          // 数据加载成功，触发时间变化事件
          this.$emit('change-time', this.currentIndex, data)
        }
        
        // 如果用户已经暂停，则停止播放
        if (!this.isPlaying) return
        
        // 移动到下一个时间点
        if (this.currentIndex < this.timeList.length - 1) {
          this.currentIndex++
          this.playTimer = setTimeout(playNext, this.interval / this.playSpeed)
        } else {
          // 播放完成
          if (this.loop) {
            this.currentIndex = 0
            this.playTimer = setTimeout(playNext, this.interval / this.playSpeed)
          } else {
            this.pause()
            this.$emit('complete')
          }
        }
      }
      
      playNext()
    },
    
    pause() {
      if (!this.isPlaying) return
      
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
      
      if (this.enableCache) {
        // this.dataCache = {}
      }
      
      this.$emit('reset')
      
      // 不自动加载数据，只有在播放或用户操作时才加载
      // this.loadData(0).then(data => {
      //   this.$emit('change-time', 0, data)
      // })
    },
    
    // 事件处理 - 修复bug：播放过程中手动修改位置不暂停
    async onSliderChange() {
      // 不暂停播放，只是更新当前数据
      const data = await this.loadData(this.currentIndex)
      this.$emit('change-time', this.currentIndex, data)
    },
    
    onSpeedChange() {
       this.$emit('speed-change', this.playSpeed)
     }
  },
  
  watch: {
    timeList: {
      handler() {
        this.reset()
      },
      immediate: true
    }
  },
  
  mounted() {
    if (this.autoPlay && this.timeList.length > 0) {
      this.play()
    }
  },
  
  beforeDestroy() {
    this.pause()
  }
}
</script>

<style scoped>
.high-player {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 16px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.control-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.icon {
  width: 20px;
  height: 20px;
  color: white;
}

.speed-control {
  margin-left: auto;
}

.speed-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
}

.speed-select option {
  background: #333;
  color: white;
}

.timeline-container {
  position: relative;
}

.timeline-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.timeline-slider {
  position: relative;
  padding: 20px 0;
}

.slider {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}



.loading-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cache-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.cache-progress {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
}

.cache-progress-bar {
  height: 100%;
  background: #28a745;
  transition: width 0.3s ease;
}
</style>