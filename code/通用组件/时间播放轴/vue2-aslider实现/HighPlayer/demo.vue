<template>
  <div class="demo-container">
    <h2>HighPlayer 演示</h2>
    
    <!-- 配置面板 -->
    <div class="config-panel">
      <h3>配置选项</h3>
      <div class="config-row">
        <label>
          <input type="checkbox" v-model="enableCache" /> 
          启用缓存
        </label>
        
        <label v-if="enableCache">
          缓存策略:
          <select v-model="cacheStrategy">
            <option value="memory">内存缓存</option>
            <option value="localStorage">本地存储</option>
            <option value="sessionStorage">会话存储</option>
          </select>
        </label>
        
        <label>
          播放间隔:
          <input type="number" v-model="interval" min="100" max="5000" step="100" />
          ms
        </label>
        
        <label>
          <input type="checkbox" v-model="autoPlay" /> 
          自动播放
        </label>
        
        <label>
          <input type="checkbox" v-model="loop" /> 
          循环播放
        </label>
      </div>
      
      <div class="config-row">
        <button @click="generateData" class="btn">生成测试数据</button>
        <button @click="clearCache" class="btn">清除缓存</button>
        <button @click="resetStats" class="btn">重置统计</button>
      </div>
    </div>
    
    <!-- 完整功能播放器 -->
    <div class="player-section">
      <h3>完整功能播放器</h3>
      <HighPlayer
        ref="playerRef"
        :timeList="timeList"
        :enableCache="enableCache"
        :interval="interval"
        :autoPlay="autoPlay"
        :loop="loop"
        :timeFormatter="formatTime"
        @change-time="onTimeChange"
        @load-data="onLoadData"
        @data-loaded="onDataLoaded"
        @play="onPlay"
        @pause="onPause"
        @reset="onReset"
        @speed-change="onSpeedChange"
        @complete="onComplete"
      />
    </div>
    
    <!-- 简化版播放器 -->
    <div class="player-section">
      <h3>简化版播放器</h3>
      <SimplePlayer
        :timeList="timeList"
        :interval="interval"
        :loop="loop"
        @time-change="onSimpleTimeChange"
        @play="onSimplePlay"
        @pause="onSimplePause"
        @reset="onSimpleReset"
        @speed-change="onSimpleSpeedChange"
      />
    </div>
    
    <!-- 状态信息 -->
    <div class="status-panel">
      <h3>状态信息</h3>
      <div class="status-grid">
        <div class="status-item">
          <label>当前时间:</label>
          <span>{{ currentTime }}</span>
        </div>
        <div class="status-item">
          <label>当前索引:</label>
          <span>{{ currentIndex }}</span>
        </div>
        <div class="status-item">
          <label>播放状态:</label>
          <span>{{ playStatus }}</span>
        </div>
        <div class="status-item">
          <label>播放速度:</label>
          <span>{{ playSpeed }}x</span>
        </div>
        <div class="status-item">
          <label>数据加载次数:</label>
          <span>{{ loadCount }}</span>
        </div>
        <div class="status-item">
          <label>缓存命中次数:</label>
          <span>{{ cacheHitCount }}</span>
        </div>
      </div>
    </div>
    
    <!-- 操作日志 -->
    <div class="log-panel">
      <h3>操作日志</h3>
      <div class="log-container">
        <div 
          v-for="(log, index) in logs" 
          :key="index" 
          class="log-item"
          :class="log.type"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
      <button @click="clearLogs" class="btn btn-small">清除日志</button>
    </div>
  </div>
</template>

<script>
import HighPlayer from './index.vue'
import SimplePlayer from './SimplePlayer.vue'
import { createDataManager, presets } from './DataManager.js'

export default {
  name: 'HighPlayerDemo',
  components: {
    HighPlayer,
    SimplePlayer
  },
  
  data() {
    return {
      // 配置
      enableCache: true,
      cacheStrategy: 'memory',
      interval: 1000,
      autoPlay: false,
      loop: false,
      
      // 数据
      timeList: [],
      currentTime: '',
      currentIndex: 0,
      playStatus: '停止',
      playSpeed: 1,
      loadCount: 0,
      cacheHitCount: 0,
      
      // 日志
      logs: [],
      
      // 数据管理器
      dataManager: null
    }
  },
  
  methods: {
    // 生成测试数据
    generateData() {
      const data = []
      const startTime = new Date('2024-01-01 00:00:00')
      
      for (let i = 0; i < 20; i++) {
        const time = new Date(startTime.getTime() + i * 60 * 60 * 1000) // 每小时一个点
        data.push({
          time: time.toISOString(),
          endTime: time.toISOString(),
          tm: time.toISOString(),
          value: Math.random() * 100,
          data: `模拟数据 ${i + 1}`
        })
      }
      
      this.timeList = data
      this.addLog('生成了 ' + data.length + ' 条测试数据', 'info')
    },
    
    // 格式化时间
    formatTime(time) {
      const date = new Date(time)
      return date.toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    // 模拟数据加载

    
    // 添加日志
    addLog(message, type = 'info') {
      this.logs.unshift({
        time: new Date().toLocaleTimeString(),
        message,
        type
      })
      
      // 限制日志数量
      if (this.logs.length > 50) {
        this.logs = this.logs.slice(0, 50)
      }
    },
    
    // 清除日志
    clearLogs() {
      this.logs = []
    },
    
    // 清除缓存
    clearCache() {
      // 简化缓存清除逻辑
      if (this.$refs.playerRef) {
        this.$refs.playerRef.dataCache = {}
        this.addLog('缓存已清除', 'info')
      }
    },
    
    // 重置统计
    resetStats() {
      this.loadCount = 0
      this.cacheHitCount = 0
      this.addLog('统计信息已重置', 'info')
    },
    
    // 完整播放器事件处理
    onTimeChange(index, data) {
      this.currentIndex = index
      this.currentTime = this.formatTime(this.timeList[index]?.time || new Date())
      this.addLog(`时间改变: 索引 ${index}`, 'info')
    },
    
    async onLoadData(index, item, resolve) {
      try {
        this.addLog(`开始加载数据: 索引 ${index}`, 'info')
        this.loadCount++
        
        // 真实的 API 请求
        const data = {a: 1} //await this.getResult(index, item)
        
        if (data) {
          // 拿到数据
          if (resolve) {
            resolve(data)
          }
          return data
        } else {
          // 失败
          throw new Error('数据获取失败')
        }
      } catch (error) {
        this.addLog(`数据加载失败: ${error.message}`, 'error')
        if (resolve) {
          resolve(null)
        }
        throw error
      }
    },
    
    // 真实的数据请求方法
    async getResult(index, item) {
      // 这里应该是真实的 API 调用
      // 例如: return await api.getData(index)
      
      // 临时返回示例数据结构，实际使用时替换为真实 API
      return {
        index, // 必须包含 index 字段，用于通用组件验证
        ...item,
        loadedAt: new Date().toISOString(),
        additionalData: `真实数据 ${index}`
      }
    },
    
    onDataLoaded(index, data) {
      this.addLog(`数据加载完成: 索引 ${index}`, 'success')
    },
    
    onPlay(index) {
      this.playStatus = '播放中'
      this.addLog(`开始播放: 索引 ${index}`, 'info')
    },
    
    onPause(index) {
      this.playStatus = '暂停'
      this.addLog(`暂停播放: 索引 ${index}`, 'info')
    },
    
    onReset() {
      this.playStatus = '停止'
      this.currentIndex = 0
      this.addLog('播放器重置', 'info')
    },
    
    onSpeedChange(speed) {
      this.playSpeed = speed
      this.addLog(`播放速度改变: ${speed}x`, 'info')
    },
    
    onComplete() {
      this.playStatus = '完成'
      this.addLog('播放完成', 'success')
    },
    
    // 简化播放器事件处理
    onSimpleTimeChange(index, data) {
      this.addLog(`简化播放器时间改变: 索引 ${index}`, 'info')
    },
    
    onSimplePlay(index) {
      this.addLog(`简化播放器开始播放: 索引 ${index}`, 'info')
    },
    
    onSimplePause(index) {
      this.addLog(`简化播放器暂停: 索引 ${index}`, 'info')
    },
    
    onSimpleReset() {
      this.addLog('简化播放器重置', 'info')
    },
    
    onSimpleSpeedChange(speed) {
      this.addLog(`简化播放器速度改变: ${speed}x`, 'info')
    }
  },
  
  mounted() {
    this.generateData()
    
    // 创建数据管理器
    this.dataManager = createDataManager(presets.memory)
    
    // 监听数据管理器事件
    this.dataManager.on('data-loaded', (data) => {
      this.cacheHitCount = this.dataManager.getStats().cacheHits
    })
    
    this.addLog('演示页面初始化完成', 'success')
  }
}
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h2, h3 {
  color: #333;
  margin-bottom: 16px;
}

.config-panel {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.config-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.config-row:last-child {
  margin-bottom: 0;
}

label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

input[type="checkbox"] {
  margin-right: 4px;
}

input[type="number"], select {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.btn {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn:hover {
  background: #0056b3;
}

.btn-small {
  padding: 4px 8px;
  font-size: 12px;
}

.player-section {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.status-panel {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: white;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.status-item label {
  font-weight: 500;
  color: #666;
}

.status-item span {
  color: #333;
}

.log-panel {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 16px;
}

.log-container {
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 12px;
}

.log-item {
  display: flex;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #666;
  min-width: 80px;
}

.log-message {
  flex: 1;
}

.log-item.info .log-message {
  color: #333;
}

.log-item.success .log-message {
  color: #28a745;
}

.log-item.error .log-message {
  color: #dc3545;
}

.log-item.warning .log-message {
  color: #ffc107;
}
</style>