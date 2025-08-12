<template>
  <div class="time-player-demo">
    <div class="demo-header">
      <h2>HighTimePlayer 组件演示</h2>
      <p>这是一个功能完整的时间播放器组件演示</p>
    </div>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-group">
        <label>数据类型:</label>
        <a-radio-group :value="dataType" @change="onDataTypeChange">
          <a-radio value="weather">天气数据</a-radio>
          <a-radio value="traffic">交通数据</a-radio>
          <a-radio value="custom">自定义数据</a-radio>
        </a-radio-group>
      </div>
      
      <div class="control-group">
        <label>缓存模式:</label>
        <a-switch 
          :checked="enableCache" 
          @change="val => enableCache = val" 
          checked-children="开启" 
          un-checked-children="关闭" 
        />
      </div>
      
      <div class="control-group">
        <label>循环播放:</label>
        <a-switch 
          :checked="loopPlay" 
          @change="val => loopPlay = val" 
          checked-children="开启" 
          un-checked-children="关闭" 
        />
      </div>
      
      <div class="control-group">
        <label>显示缓存状态:</label>
        <a-switch 
          :checked="showCacheStatus" 
          @change="val => showCacheStatus = val" 
          checked-children="显示" 
          un-checked-children="隐藏" 
        />
      </div>
    </div>

    <!-- 时间播放器 -->
    <div class="player-section">
      <h3>时间播放器</h3>
      <HighTimePlayer
        ref="timePlayer"
        :time-list="currentTimeList"
        :enable-cache="enableCache"
        :show-cache-status="showCacheStatus"
        :loop="loopPlay"
        :auto-play="false"
        @load-data="handleLoadData"
        @show-data="handleShowData"
        @change="handleChange"
        @play="handlePlay"
        @pause="handlePause"
        @complete="handleComplete"
        @speed-change="handleSpeedChange"
      />
    </div>

    <!-- 数据显示区域 -->
    <div class="data-display">
      <div class="current-info">
        <h3>当前时间点信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>时间:</label>
            <span>{{ currentTime }}</span>
          </div>
          <div class="info-item">
            <label>索引:</label>
            <span>{{ currentIndex }}</span>
          </div>
          <div class="info-item">
            <label>播放状态:</label>
            <span>{{ playStatus }}</span>
          </div>
          <div class="info-item">
            <label>播放速度:</label>
            <span>{{ currentSpeed }}</span>
          </div>
        </div>
      </div>

      <!-- 数据图表 -->
      <div class="chart-section">
        <h3>数据可视化</h3>
        <div class="chart-container">
          <div v-if="currentData" class="data-chart">
            <div class="chart-item" v-for="(value, key) in currentData" :key="key">
              <div class="chart-label">{{ getDataLabel(key) }}</div>
              <div class="chart-bar">
                <div 
                  class="chart-fill" 
                  :style="{ width: getBarWidth(key, value) + '%', backgroundColor: getBarColor(key) }"
                />
                <span class="chart-value">{{ formatValue(key, value) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            <a-icon type="loading" /> 加载数据中...
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <a-button @click="generateRandomData">生成随机数据</a-button>
      <a-button @click="clearData">清空数据</a-button>
      <a-button @click="exportData">导出数据</a-button>
      <a-button @click="showCacheInfo">查看缓存状态</a-button>
    </div>

    <!-- 日志区域 -->
    <div class="log-section">
      <h3>事件日志</h3>
      <div class="log-container">
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-type" :class="log.type">{{ log.type }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
      <a-button size="small" @click="clearLogs">清空日志</a-button>
    </div>
  </div>
</template>

<script>
import HighTimePlayer from './index.vue'
import dayjs from 'dayjs'

export default {
  name: 'TimePlayerDemo',
  components: {
    HighTimePlayer
  },
  data() {
    return {
      // 控制参数
      dataType: 'weather',
      enableCache: true,
      loopPlay: false,
      showCacheStatus: true,
      
      // 当前状态
      currentIndex: 0,
      currentTime: '',
      currentData: null,
      playStatus: '停止',
      currentSpeed: '1x',
      
      // 数据集
      weatherData: [],
      trafficData: [],
      customData: [],
      
      // 事件日志
      eventLogs: [],
      maxLogs: 50
    }
  },
  computed: {
    currentTimeList() {
      switch (this.dataType) {
          case 'weather':
            return this.weatherData
          case 'traffic':
            return this.trafficData
          case 'custom':
            return this.customData
          default:
            return []
        }
    }
  },
  mounted() {
    this.initializeData()
  },
  methods: {
    // 初始化数据
    initializeData() {
      this.generateWeatherData()
      this.generateTrafficData()
      this.generateCustomData()
      this.addLog('info', '演示数据初始化完成')
    },
    
    // 生成天气数据
    generateWeatherData() {
      const data = []
      const startTime = dayjs().subtract(24, 'hour')
      
      for (let i = 0; i < 24; i++) {
        data.push({
          tm: startTime.add(i, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          value: i
        })
      }
      
      this.weatherData = data
    },
    
    // 生成交通数据
    generateTrafficData() {
      const data = []
      const startTime = dayjs().subtract(12, 'hour')
      
      for (let i = 0; i < 12; i++) {
        data.push({
          tm: startTime.add(i * 30, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          value: i
        })
      }
      
      this.trafficData = data
    },
    
    // 生成自定义数据
    generateCustomData() {
      const data = []
      const startTime = dayjs().subtract(6, 'hour')
      
      for (let i = 0; i < 36; i++) {
        data.push({
          tm: startTime.add(i * 10, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          value: i
        })
      }
      
      this.customData = data
    },
    
    // 数据类型变化
    onDataTypeChange() {
      this.addLog('info', `切换到${this.getDataTypeName()}数据`)
      this.currentData = null
    },
    
    // 获取数据类型名称
    getDataTypeName() {
      const names = {
        weather: '天气',
        traffic: '交通',
        custom: '自定义'
      }
      return names[this.dataType] || '未知'
    },
    
    // 处理数据加载
    handleLoadData(index, timeData, callback) {
      this.addLog('load', `加载数据: 索引${index}`)
      
      // 模拟异步数据加载
      setTimeout(() => {
        let data = {}
        
        switch (this.dataType) {
          case 'weather':
            data = {
              temperature: Math.round(Math.random() * 40 - 10), // -10 到 30度
              humidity: Math.round(Math.random() * 100), // 0-100%
              pressure: Math.round(Math.random() * 100 + 950), // 950-1050hPa
              windSpeed: Math.round(Math.random() * 20) // 0-20m/s
            }
            break
            
          case 'traffic':
            data = {
              speed: Math.round(Math.random() * 120), // 0-120km/h
              flow: Math.round(Math.random() * 1000), // 0-1000辆/小时
              density: Math.round(Math.random() * 100), // 0-100%
              incidents: Math.round(Math.random() * 5) // 0-5起事故
            }
            break
            
          case 'custom':
            data = {
              value1: Math.round(Math.random() * 100),
              value2: Math.round(Math.random() * 200),
              value3: Math.round(Math.random() * 50),
              value4: Math.round(Math.random() * 300)
            }
            break
            
          default:
            data = {}
            break
        }
        
        callback(data)
      }, Math.random() * 200 + 50) // 50-250ms随机延迟
    },
    
    // 处理数据显示
    handleShowData(index, data, timeData) {
      this.currentIndex = index
      this.currentTime = dayjs(timeData.tm).format('YYYY-MM-DD HH:mm:ss')
      this.currentData = data
      
      this.addLog('show', `显示数据: 索引${index}, 时间${this.currentTime}`)
    },
    
    // 处理时间变化
    handleChange(index, data) {
      this.addLog('change', `时间变化: 索引${index}`)
    },
    
    // 处理播放
    handlePlay(index) {
      this.playStatus = '播放中'
      this.addLog('play', `开始播放: 从索引${index}开始`)
    },
    
    // 处理暂停
    handlePause(index) {
      this.playStatus = '已暂停'
      this.addLog('pause', `暂停播放: 当前索引${index}`)
    },
    
    // 处理播放完成
    handleComplete() {
      this.playStatus = '播放完成'
      this.addLog('complete', '播放完成')
    },
    
    // 处理速度变化
    handleSpeedChange(speed) {
      const speedMap = {
        2000: '0.5x',
        1000: '1x',
        500: '2x',
        250: '4x',
        100: '8x'
      }
      this.currentSpeed = speedMap[speed] || '未知'
      this.addLog('speed', `播放速度变化: ${this.currentSpeed}`)
    },
    
    // 生成随机数据
    generateRandomData() {
      this.initializeData()
      this.addLog('action', '重新生成随机数据')
    },
    
    // 清空数据
    clearData() {
      this.weatherData = []
      this.trafficData = []
      this.customData = []
      this.currentData = null
      this.addLog('action', '清空所有数据')
    },
    
    // 导出数据
    exportData() {
      const data = {
        type: this.dataType,
        timeList: this.currentTimeList,
        currentData: this.currentData,
        cacheStatus: this.$refs.timePlayer ? this.$refs.timePlayer.getCacheStatus() : null
      }
      
      // eslint-disable-next-line no-console
      console.log('导出数据:', data)
      this.addLog('action', '数据已导出到控制台')
    },
    
    // 显示缓存信息
    showCacheInfo() {
      if (this.$refs.timePlayer) {
        const cacheStatus = this.$refs.timePlayer.getCacheStatus()
        this.$message.info(`缓存进度: ${cacheStatus.progress}% (${cacheStatus.cached}/${cacheStatus.total})`)
        this.addLog('info', `缓存状态: ${cacheStatus.progress}%`)
      }
    },
    
    // 获取数据标签
    getDataLabel(key) {
      const labels = {
        // 天气数据标签
        temperature: '温度',
        humidity: '湿度',
        pressure: '气压',
        windSpeed: '风速',
        
        // 交通数据标签
        speed: '平均速度',
        flow: '交通流量',
        density: '拥堵密度',
        incidents: '事故数量',
        
        // 自定义数据标签
        value1: '数值1',
        value2: '数值2',
        value3: '数值3',
        value4: '数值4'
      }
      return labels[key] || key
    },
    
    // 获取柱状图宽度
    getBarWidth(key, value) {
      const maxValues = {
        temperature: 40,
        humidity: 100,
        pressure: 100,
        windSpeed: 20,
        speed: 120,
        flow: 1000,
        density: 100,
        incidents: 5,
        value1: 100,
        value2: 200,
        value3: 50,
        value4: 300
      }
      
      const max = maxValues[key] || 100
      return Math.min((Math.abs(value) / max) * 100, 100)
    },
    
    // 获取柱状图颜色
    getBarColor(key) {
      const colors = {
        temperature: '#ff4d4f',
        humidity: '#1890ff',
        pressure: '#52c41a',
        windSpeed: '#faad14',
        speed: '#722ed1',
        flow: '#13c2c2',
        density: '#eb2f96',
        incidents: '#f5222d',
        value1: '#1890ff',
        value2: '#52c41a',
        value3: '#faad14',
        value4: '#722ed1'
      }
      return colors[key] || '#1890ff'
    },
    
    // 格式化数值
    formatValue(key, value) {
      const units = {
        temperature: '°C',
        humidity: '%',
        pressure: 'hPa',
        windSpeed: 'm/s',
        speed: 'km/h',
        flow: '辆/h',
        density: '%',
        incidents: '起'
      }
      
      const unit = units[key] || ''
      return `${value}${unit}`
    },
    
    // 添加日志
    addLog(type, message) {
      const log = {
        time: dayjs().format('HH:mm:ss'),
        type,
        message
      }
      
      this.eventLogs.unshift(log)
      
      // 限制日志数量
      if (this.eventLogs.length > this.maxLogs) {
        this.eventLogs = this.eventLogs.slice(0, this.maxLogs)
      }
    },
    
    // 清空日志
    clearLogs() {
      this.eventLogs = []
    }
  }
}
</script>

<style lang="less" scoped>
.time-player-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  .demo-header {
    text-align: center;
    margin-bottom: 30px;
    
    h2 {
      color: #1890ff;
      margin-bottom: 8px;
    }
    
    p {
      color: #666;
      margin: 0;
    }
  }
  
  .control-panel {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    
    .control-group {
      display: flex;
      align-items: center;
      gap: 8px;
      
      label {
        font-weight: 500;
        min-width: 80px;
      }
    }
  }
  
  .player-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    
    h3 {
      margin-top: 0;
      margin-bottom: 16px;
      color: #333;
    }
  }
  
  .data-display {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    margin-bottom: 20px;
    
    .current-info {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      
      h3 {
        margin-top: 0;
        margin-bottom: 16px;
        color: #333;
      }
      
      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
          
          label {
            font-weight: 500;
            color: #666;
          }
          
          span {
            color: #333;
          }
        }
      }
    }
    
    .chart-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      
      h3 {
        margin-top: 0;
        margin-bottom: 16px;
        color: #333;
      }
      
      .chart-container {
        min-height: 200px;
        
        .data-chart {
          .chart-item {
            margin-bottom: 12px;
            
            .chart-label {
              font-size: 12px;
              color: #666;
              margin-bottom: 4px;
            }
            
            .chart-bar {
              position: relative;
              height: 24px;
              background: #f5f5f5;
              border-radius: 12px;
              overflow: hidden;
              
              .chart-fill {
                height: 100%;
                border-radius: 12px;
                transition: width 0.3s ease;
              }
              
              .chart-value {
                position: absolute;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 12px;
                color: #333;
                font-weight: 500;
              }
            }
          }
        }
        
        .no-data {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .log-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    
    h3 {
      margin-top: 0;
      margin-bottom: 16px;
      color: #333;
    }
    
    .log-container {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #f0f0f0;
      border-radius: 4px;
      padding: 8px;
      margin-bottom: 12px;
      background: #fafafa;
      
      .log-item {
        display: flex;
        align-items: center;
        padding: 4px 0;
        font-size: 12px;
        border-bottom: 1px solid #f0f0f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .log-time {
          color: #999;
          margin-right: 8px;
          min-width: 60px;
        }
        
        .log-type {
          padding: 2px 6px;
          border-radius: 2px;
          margin-right: 8px;
          min-width: 50px;
          text-align: center;
          font-size: 10px;
          
          &.info {
            background: #e6f7ff;
            color: #1890ff;
          }
          
          &.load {
            background: #f6ffed;
            color: #52c41a;
          }
          
          &.show {
            background: #fff2e8;
            color: #fa8c16;
          }
          
          &.play {
            background: #f9f0ff;
            color: #722ed1;
          }
          
          &.pause {
            background: #fff1f0;
            color: #f5222d;
          }
          
          &.complete {
            background: #f6ffed;
            color: #52c41a;
          }
          
          &.speed {
            background: #feffe6;
            color: #fadb14;
          }
          
          &.change {
            background: #f0f5ff;
            color: #2f54eb;
          }
          
          &.action {
            background: #fff0f6;
            color: #eb2f96;
          }
        }
        
        .log-message {
          color: #333;
          flex: 1;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .time-player-demo {
    padding: 10px;
    
    .control-panel {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .data-display {
      grid-template-columns: 1fr;
    }
    
    .action-buttons {
      justify-content: center;
    }
  }
}
</style>