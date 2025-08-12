<template>
  <div class="example-container">
    <h2>HighTimePlayer 使用示例</h2>
    
    <!-- 基础使用 -->
    <div class="example-section">
      <h3>基础使用</h3>
      <HighTimePlayer
        :time-list="basicTimeList"
        :enable-cache="true"
        @load-data="handleBasicLoadData"
        @show-data="handleBasicShowData"
      />
      <div class="current-data">
        当前数据: {{ basicCurrentData ? JSON.stringify(basicCurrentData) : '无' }}
      </div>
    </div>
    
    <!-- 高级使用 -->
    <div class="example-section">
      <h3>高级使用 (带缓存状态显示)</h3>
      <HighTimePlayer
        :time-list="advancedTimeList"
        :enable-cache="true"
        :show-cache-status="true"
        :loop="false"
        :auto-play="false"
        @load-data="handleAdvancedLoadData"
        @show-data="handleAdvancedShowData"
        @play="handlePlay"
        @pause="handlePause"
        @complete="handleComplete"
      />
      <div class="current-data">
        当前数据: {{ advancedCurrentData ? JSON.stringify(advancedCurrentData) : '无' }}
      </div>
    </div>
    
    <!-- 无缓存模式 -->
    <div class="example-section">
      <h3>无缓存模式</h3>
      <HighTimePlayer
        :time-list="noCacheTimeList"
        :enable-cache="false"
        @load-data="handleNoCacheLoadData"
        @show-data="handleNoCacheShowData"
      />
      <div class="current-data">
        当前数据: {{ noCacheCurrentData ? JSON.stringify(noCacheCurrentData) : '无' }}
      </div>
    </div>
  </div>
</template>

<script>
import HighTimePlayer from './index.vue'
import dayjs from 'dayjs'

export default {
  name: 'HighTimePlayerExample',
  components: {
    HighTimePlayer
  },
  data() {
    return {
      // 基础示例数据
      basicTimeList: [],
      basicCurrentData: null,
      
      // 高级示例数据
      advancedTimeList: [],
      advancedCurrentData: null,
      
      // 无缓存示例数据
      noCacheTimeList: [],
      noCacheCurrentData: null
    }
  },
  mounted() {
    this.initializeData()
  },
  methods: {
    // 初始化数据
    initializeData() {
      // 基础示例 - 简单时间数组
      this.basicTimeList = [
        '2024-01-01 08:00:00',
        '2024-01-01 09:00:00',
        '2024-01-01 10:00:00',
        '2024-01-01 11:00:00',
        '2024-01-01 12:00:00',
        '2024-01-01 08:00:00',
        '2024-01-01 09:00:00',
        '2024-01-01 10:00:00',
        '2024-01-01 11:00:00',
        '2024-01-01 12:00:00',
        '2024-01-01 08:00:00',
        '2024-01-01 09:00:00',
        '2024-01-01 10:00:00',
        '2024-01-01 11:00:00',
        '2024-01-01 12:00:00'
      ]
      
      // 高级示例 - 对象数组
      const advancedData = []
      const startTime = dayjs().subtract(2, 'hour')
      for (let i = 0; i < 12; i++) {
        advancedData.push({
          tm: startTime.add(i * 10, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          value: i * 10
        })
      }
      this.advancedTimeList = advancedData
      
      // 无缓存示例
      const noCacheData = []
      const noCacheStartTime = dayjs().subtract(1, 'hour')
      for (let i = 0; i < 6; i++) {
        noCacheData.push({
          tm: noCacheStartTime.add(i * 10, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          value: i * 5
        })
      }
      this.noCacheTimeList = noCacheData
    },
    
    // 基础示例 - 加载数据
    handleBasicLoadData(index, timeData, callback) {
      // 模拟异步数据加载
      setTimeout(() => {
        const data = {
          temperature: Math.round(Math.random() * 30),
          humidity: Math.round(Math.random() * 100)
        }
        callback(data)
      }, 100)
    },
    
    // 基础示例 - 显示数据
    handleBasicShowData(index, data, timeData) {
      this.basicCurrentData = data
      // eslint-disable-next-line no-console
      console.log('基础示例 - 显示数据:', { index, data, timeData })
    },
    
    // 高级示例 - 加载数据
    handleAdvancedLoadData(index, timeData, callback) {
      // 模拟更复杂的数据加载
      setTimeout(() => {
        const data = {
          temperature: Math.round(Math.random() * 40 - 10),
          humidity: Math.round(Math.random() * 100),
          pressure: Math.round(Math.random() * 100 + 950),
          windSpeed: Math.round(Math.random() * 20),
          timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        callback(data)
      }, Math.random() * 300 + 100) // 100-400ms随机延迟
    },
    
    // 高级示例 - 显示数据
    handleAdvancedShowData(index, data, timeData) {
      this.advancedCurrentData = data
      // eslint-disable-next-line no-console
      console.log('高级示例 - 显示数据:', { index, data, timeData })
    },
    
    // 无缓存示例 - 加载数据
    handleNoCacheLoadData(index, timeData, callback) {
      // 每次都重新加载数据
      setTimeout(() => {
        const data = {
          value: Math.round(Math.random() * 100),
          status: Math.random() > 0.5 ? 'normal' : 'warning',
          loadTime: dayjs().format('HH:mm:ss')
        }
        callback(data)
      }, 50)
    },
    
    // 无缓存示例 - 显示数据
    handleNoCacheShowData(index, data, timeData) {
      this.noCacheCurrentData = data
      // eslint-disable-next-line no-console
      console.log('无缓存示例 - 显示数据:', { index, data, timeData })
    },
    
    // 播放事件处理
    handlePlay(index) {
      // eslint-disable-next-line no-console
      console.log('开始播放:', index)
    },
    
    handlePause(index) {
      // eslint-disable-next-line no-console
      console.log('暂停播放:', index)
    },
    
    handleComplete() {
      // eslint-disable-next-line no-console
      console.log('播放完成')
    }
  }
}
</script>

<style lang="less" scoped>
.example-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  
  h2 {
    color: #1890ff;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .example-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    background: #fafafa;
    
    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
      border-bottom: 2px solid #1890ff;
      padding-bottom: 8px;
    }
    
    .current-data {
      margin-top: 16px;
      padding: 12px;
      background: white;
      border-radius: 4px;
      border-left: 4px solid #52c41a;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: #333;
      word-break: break-all;
    }
  }
}
</style>