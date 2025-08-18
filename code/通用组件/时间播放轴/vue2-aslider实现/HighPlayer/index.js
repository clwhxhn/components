/**
 * HighPlayer 时间播放器组件
 * 统一导出入口
 */

// 导入组件
import HighPlayer from './index.vue'
import SimplePlayer from './SimplePlayer.vue'
import { DataManager, createDataManager, presets } from './DataManager.js'

// 版本信息
export const version = '1.0.0'

// 组件导出
export { HighPlayer, SimplePlayer, DataManager, createDataManager, presets }

// 默认导出主组件
export default HighPlayer

// Vue插件安装函数
export const install = (app) => {
  app.component('HighPlayer', HighPlayer)
  app.component('SimplePlayer', SimplePlayer)
}

// 按需导出
export const components = {
  HighPlayer,
  SimplePlayer
}

// 工具函数导出
export const utils = {
  createDataManager,
  presets
}

// 预设配置导出
export const configs = {
  // 内存缓存配置
  memory: {
    enableCache: true,
    cacheStrategy: 'memory',
    interval: 1000,
    maxMarks: 10,
    preloadCount: 3
  },
  
  // 本地存储配置
  localStorage: {
    enableCache: true,
    cacheStrategy: 'localStorage',
    interval: 1000,
    maxMarks: 15,
    preloadCount: 5
  },
  
  // 会话存储配置
  sessionStorage: {
    enableCache: true,
    cacheStrategy: 'sessionStorage',
    interval: 1000,
    maxMarks: 15,
    preloadCount: 5
  },
  
  // 无缓存配置
  noCache: {
    enableCache: false,
    interval: 1000,
    maxMarks: 10
  },
  
  // 高性能配置
  performance: {
    enableCache: true,
    cacheStrategy: 'memory',
    interval: 500,
    maxMarks: 20,
    preloadCount: 10
  },
  
  // 简单模式配置
  simple: {
    enableCache: false,
    interval: 2000,
    maxMarks: 5,
    autoPlay: false,
    loop: false
  }
}

// 常用工具函数
export const helpers = {
  /**
   * 格式化时间
   * @param {Date|string|number} time 时间
   * @param {string} format 格式类型
   * @returns {string} 格式化后的时间
   */
  formatTime(time, format = 'default') {
    const date = new Date(time)
    
    switch (format) {
      case 'full':
        return date.toLocaleString('zh-CN')
      case 'date':
        return date.toLocaleDateString('zh-CN')
      case 'time':
        return date.toLocaleTimeString('zh-CN')
      case 'short':
        return date.toLocaleString('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      default:
        return date.toLocaleString('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
    }
  },
  
  /**
   * 生成测试数据
   * @param {number} count 数据数量
   * @param {Date} startTime 开始时间
   * @param {number} interval 时间间隔(小时)
   * @returns {Array} 测试数据
   */
  generateTestData(count = 24, startTime = new Date(), interval = 1) {
    const data = []
    const start = new Date(startTime)
    
    for (let i = 0; i < count; i++) {
      const time = new Date(start.getTime() + i * interval * 60 * 60 * 1000)
      data.push({
        time: time.toISOString(),
        endTime: time.toISOString(),
        tm: time.toISOString(),
        value: Math.random() * 100,
        data: `测试数据 ${i + 1}`,
        index: i
      })
    }
    
    return data
  },
  
  /**
   * 验证时间列表格式
   * @param {Array} timeList 时间列表
   * @returns {boolean} 是否有效
   */
  validateTimeList(timeList) {
    if (!Array.isArray(timeList)) {
      return false
    }
    
    return timeList.every(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        return !isNaN(new Date(item).getTime())
      }
      
      if (typeof item === 'object' && item !== null) {
        const timeField = item.time || item.endTime || item.tm
        return timeField && !isNaN(new Date(timeField).getTime())
      }
      
      return false
    })
  },
  
  /**
   * 标准化时间列表
   * @param {Array} timeList 原始时间列表
   * @returns {Array} 标准化后的时间列表
   */
  normalizeTimeList(timeList) {
    return timeList.map((item, index) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return {
          time: new Date(item).toISOString(),
          endTime: new Date(item).toISOString(),
          tm: new Date(item).toISOString(),
          index,
          originalData: item
        }
      }
      
      if (typeof item === 'object' && item !== null) {
        const timeField = item.time || item.endTime || item.tm || new Date().toISOString()
        return {
          ...item,
          time: new Date(timeField).toISOString(),
          endTime: new Date(timeField).toISOString(),
          tm: new Date(timeField).toISOString(),
          index
        }
      }
      
      return {
        time: new Date().toISOString(),
        endTime: new Date().toISOString(),
        tm: new Date().toISOString(),
        index,
        originalData: item
      }
    })
  },
  
  /**
   * 计算时间间隔
   * @param {Array} timeList 时间列表
   * @returns {number} 平均间隔(毫秒)
   */
  calculateInterval(timeList) {
    if (timeList.length < 2) {
      return 1000 // 默认1秒
    }
    
    const intervals = []
    
    for (let i = 1; i < timeList.length; i++) {
      const prev = timeList[i - 1]
      const curr = timeList[i]
      
      const prevTime = new Date(prev.time || prev.endTime || prev.tm || prev)
      const currTime = new Date(curr.time || curr.endTime || curr.tm || curr)
      
      const interval = currTime.getTime() - prevTime.getTime()
      if (interval > 0) {
        intervals.push(interval)
      }
    }
    
    if (intervals.length === 0) {
      return 1000
    }
    
    // 返回平均间隔
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
    return Math.max(100, Math.min(avgInterval, 10000)) // 限制在100ms-10s之间
  }
}

// 常量定义
export const constants = {
  // 播放速度选项
  SPEED_OPTIONS: [
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
    { label: '5x', value: 5 }
  ],
  
  // 缓存策略选项
  CACHE_STRATEGIES: [
    { label: '内存缓存', value: 'memory' },
    { label: '本地存储', value: 'localStorage' },
    { label: '会话存储', value: 'sessionStorage' }
  ],
  
  // 默认配置
  DEFAULT_CONFIG: {
    enableCache: false,
    interval: 1000,
    autoPlay: false,
    loop: false,
    maxMarks: 10,
    preloadCount: 3
  },
  
  // 事件名称
  EVENTS: {
    CHANGE_TIME: 'change-time',
    LOAD_DATA: 'load-data',
    DATA_LOADED: 'data-loaded',
    PLAY: 'play',
    PAUSE: 'pause',
    RESET: 'reset',
    SPEED_CHANGE: 'speed-change',
    COMPLETE: 'complete',
    ERROR: 'error'
  }
}

// 类型定义(用于TypeScript)
export const types = {
  TimeItem: {
    time: 'string',
    endTime: 'string',
    tm: 'string',
    data: 'any'
  },
  
  PlayerConfig: {
    enableCache: 'boolean',
    interval: 'number',
    autoPlay: 'boolean',
    loop: 'boolean',
    maxMarks: 'number',
    preloadCount: 'number'
  },
  
  CacheStrategy: ['memory', 'localStorage', 'sessionStorage']
}