<template>
  <div class="high-time-player">
    <div class="player-controls">
      <!-- 播放/暂停按钮 -->
      <div class="control-btn" @click="togglePlay">
        <a-icon :type="isPlaying ? 'pause' : 'caret-right'" />
      </div>
      
      <!-- 重置按钮 -->
      <div class="control-btn" @click="reset">
        <a-icon type="reload" />
      </div>
    </div>

    <!-- 时间滑块 -->
    <div class="slider-container">
      <a-slider
        :value="currentIndex"
        :min="0"
        :max="maxIndex"
        :marks="marks"
        :step="1"
        :tooltip-visible="showTooltip"
        :tip-formatter="tipFormatter"
        @change="onSliderChange"
        @afterChange="onSliderAfterChange"
      />
    </div>

    <!-- 播放速度控制 -->
    <div class="speed-control">
      <a-select :value="playSpeed" size="small" @change="onSpeedChange">
        <a-select-option :value="2000">0.5x</a-select-option>
        <a-select-option :value="1000">1x</a-select-option>
        <a-select-option :value="500">2x</a-select-option>
        <a-select-option :value="250">4x</a-select-option>
        <a-select-option :value="100">8x</a-select-option>
      </a-select>
    </div>

    <!-- 缓存状态指示器 -->
    <div v-if="showCacheStatus" class="cache-status">
      <span>缓存: {{ cacheProgress }}%</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'HighTimePlayer',
  props: {
    // 时间数据列表
    timeList: {
      type: Array,
      default: () => []
    },
    // 是否启用缓存
    enableCache: {
      type: Boolean,
      default: true
    },
    // 是否显示缓存状态
    showCacheStatus: {
      type: Boolean,
      default: false
    },
    // 是否显示tooltip
    showTooltip: {
      type: Boolean,
      default: true
    },
    // 时间格式
    timeFormat: {
      type: String,
      default: 'MM-DD HH:mm'
    },
    // 标记显示间隔
    markStep: {
      type: Number,
      default: 5
    },
    // 自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 循环播放
    loop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0,
      isPlaying: false,
      playSpeed: 1000,
      marks: {},
      
      // 缓存相关
      dataCache: [],
      cacheStatus: [],
      cacheProgress: 0,
      
      // 播放控制
      playTimer: null,
      cacheTimer: null,
      
      // 状态控制
      isInitialized: false
    }
  },
  computed: {
    maxIndex() {
      return Math.max(0, this.timeList.length - 1)
    },
    
    currentTime() {
      if (this.timeList.length === 0 || this.currentIndex >= this.timeList.length) {
        return ''
      }
      return this.timeList[this.currentIndex]
    }
  },
  watch: {
    timeList: {
      handler(newVal) {
        this.initializePlayer(newVal)
      },
      immediate: true,
      deep: true
    },
    
    autoPlay: {
      handler(newVal) {
        if (newVal && !this.isPlaying) {
          this.play()
        } else if (!newVal && this.isPlaying) {
          this.pause()
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.autoPlay) {
      this.$nextTick(() => {
        this.play()
      })
    }
  },
  beforeDestroy() {
    this.cleanup()
  },
  methods: {
    // 初始化播放器
    initializePlayer(timeList) {
      this.cleanup()
      
      if (!timeList || timeList.length === 0) {
        this.reset()
        return
      }
      
      // 初始化缓存数组
      this.dataCache = new Array(timeList.length).fill(null)
      this.cacheStatus = new Array(timeList.length).fill(false)
      
      // 生成标记
      this.generateMarks(timeList)
      
      // 重置播放状态
      this.currentIndex = 0
      this.isPlaying = false
      this.cacheProgress = 0
      
      // 开始缓存
      if (this.enableCache) {
        this.startCache()
      }
      
      // 触发初始数据加载
      this.loadData(0)
      
      this.isInitialized = true
    },
    
    // 生成时间标记
    generateMarks(timeList) {
      this.marks = {}
      
      timeList.forEach((item, index) => {
        let label = ''
        
        // 根据数据长度决定显示策略
        if (timeList.length <= 10) {
          // 少量数据，显示所有标记
          label = this.formatTime(item)
        } else if (timeList.length <= 20) {
          // 中等数据，显示部分标记
          if (index % 2 === 0 || index === timeList.length - 1) {
            label = this.formatTime(item)
          }
        } else {
          // 大量数据，按步长显示
          if (index % this.markStep === 0 || index === timeList.length - 1) {
            label = this.formatTime(item)
          }
        }
        
        this.marks[index] = label
      })
    },
    
    // 格式化时间
    formatTime(timeData) {
      if (typeof timeData === 'string') {
        return dayjs(timeData).format(this.timeFormat)
      } else if (timeData && timeData.tm) {
        return dayjs(timeData.tm).format(this.timeFormat)
      }
      return ''
    },
    
    // 播放/暂停切换
    togglePlay() {
      if (this.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    
    // 开始播放
    play() {
      if (this.timeList.length === 0) {
        this.$message.warning('暂无时间数据')
        return
      }
      
      // 如果已经到最后，从头开始
      if (this.currentIndex >= this.maxIndex) {
        if (this.loop) {
          this.currentIndex = 0
        } else {
          return
        }
      }
      
      this.isPlaying = true
      this.startPlayTimer()
      
      this.$emit('play', this.currentIndex)
    },
    
    // 暂停播放
    pause() {
      this.isPlaying = false
      this.stopPlayTimer()
      
      this.$emit('pause', this.currentIndex)
    },
    
    // 重置
    reset() {
      this.pause()
      this.currentIndex = 0
      this.loadData(0)
      
      this.$emit('reset')
    },
    
    // 开始播放定时器
    startPlayTimer() {
      this.stopPlayTimer()
      
      this.playTimer = setInterval(() => {
        if (!this.isPlaying) return
        
        this.currentIndex += 1
        
        // 检查是否到达末尾
        if (this.currentIndex > this.maxIndex) {
          if (this.loop) {
            this.currentIndex = 0
          } else {
            this.pause()
            this.$emit('complete')
            return
          }
        }
        
        this.loadData(this.currentIndex)
      }, this.playSpeed)
    },
    
    // 停止播放定时器
    stopPlayTimer() {
      if (this.playTimer) {
        clearInterval(this.playTimer)
        this.playTimer = null
      }
    },
    
    // 滑块变化
    onSliderChange(value) {
      this.currentIndex = value
    },
    
    // 滑块变化完成
    onSliderAfterChange(value) {
      this.currentIndex = value
      this.loadData(value)
      
      this.$emit('change', value, this.getCurrentData())
    },
    
    // 速度变化
    onSpeedChange(speed) {
      this.playSpeed = speed
      
      // 如果正在播放，重新启动定时器
      if (this.isPlaying) {
        this.startPlayTimer()
      }
      
      this.$emit('speed-change', speed)
    },
    
    // 加载数据
    loadData(index) {
      if (index < 0 || index >= this.timeList.length) return
      
      // 如果启用缓存且有缓存数据
      if (this.enableCache && this.dataCache[index] !== null) {
        this.showData(index, this.dataCache[index])
        return
      }
      
      // 触发数据加载事件
      this.$emit('load-data', index, this.timeList[index], (data) => {
        this.setData(index, data)
      })
    },
    
    // 设置数据
    setData(index, data) {
      if (this.enableCache) {
        this.dataCache[index] = data
        this.cacheStatus[index] = true
        this.updateCacheProgress()
      }
      
      // 如果是当前索引，立即显示
      if (index === this.currentIndex) {
        this.showData(index, data)
      }
    },
    
    // 显示数据
    showData(index, data) {
      this.$emit('show-data', index, data, this.timeList[index])
    },
    
    // 获取当前数据
    getCurrentData() {
      if (this.enableCache && this.dataCache[this.currentIndex] !== null) {
        return this.dataCache[this.currentIndex]
      }
      return null
    },
    
    // 开始缓存
    startCache() {
      if (!this.enableCache) return
      
      this.stopCache()
      
      this.cacheTimer = setInterval(() => {
        this.cacheNext()
      }, 100)
    },
    
    // 停止缓存
    stopCache() {
      if (this.cacheTimer) {
        clearInterval(this.cacheTimer)
        this.cacheTimer = null
      }
    },
    
    // 缓存下一个
    cacheNext() {
      // 找到下一个需要缓存的索引
      for (let i = 0; i < this.timeList.length; i++) {
        if (!this.cacheStatus[i]) {
          this.$emit('load-data', i, this.timeList[i], (data) => {
            this.setData(i, data)
          })
          return
        }
      }
      
      // 全部缓存完成
      this.stopCache()
    },
    
    // 更新缓存进度
    updateCacheProgress() {
      const cached = this.cacheStatus.filter(status => status).length
      this.cacheProgress = Math.round((cached / this.timeList.length) * 100)
    },
    
    // Tooltip格式化
    tipFormatter(value) {
      if (this.timeList[value]) {
        return this.formatTime(this.timeList[value])
      }
      return ''
    },
    
    // 清理资源
    cleanup() {
      this.stopPlayTimer()
      this.stopCache()
    },
    
    // 公共方法：跳转到指定索引
    goToIndex(index) {
      if (index >= 0 && index <= this.maxIndex) {
        this.currentIndex = index
        this.loadData(index)
      }
    },
    
    // 公共方法：获取缓存状态
    getCacheStatus() {
      return {
        progress: this.cacheProgress,
        cached: this.cacheStatus.filter(status => status).length,
        total: this.timeList.length
      }
    }
  }
}
</script>

<style lang="less" scoped>
.high-time-player {
  display: flex;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  
  .player-controls {
    display: flex;
    margin-right: 16px;
    
    .control-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1890ff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 8px;
      transition: all 0.3s;
      
      &:hover {
        background: #40a9ff;
      }
      
      &:active {
        background: #096dd9;
      }
    }
  }
  
  .slider-container {
    flex: 1;
    margin: 0 16px;
    
    /deep/ .ant-slider {
      .ant-slider-rail {
        background-color: #f5f5f5;
      }
      
      .ant-slider-track {
        background-color: #1890ff;
      }
      
      .ant-slider-handle {
        border-color: #1890ff;
        
        &:hover {
          border-color: #40a9ff;
        }
        
        &:focus {
          border-color: #40a9ff;
          box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.12);
        }
      }
      
      .ant-slider-mark-text {
        font-size: 12px;
        color: #666;
      }
    }
  }
  
  .speed-control {
    width: 80px;
    margin-right: 16px;
  }
  
  .cache-status {
    font-size: 12px;
    color: #666;
    white-space: nowrap;
  }
}
</style>