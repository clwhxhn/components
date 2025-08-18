/**
 * 数据管理器 - 处理时间播放器的数据缓存和加载
 */
export class DataManager {
  constructor(options = {}) {
    this.options = {
      enableCache: true,
      cacheStrategy: 'memory', // 'memory' | 'localStorage' | 'sessionStorage'
      maxCacheSize: 100,
      preloadCount: 3, // 预加载数量
      ...options
    }
    
    this.cache = new Map()
    this.loadingQueue = new Set()
    this.listeners = new Map()
    this.stats = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0
    }
    
    this.init()
  }
  
  init() {
    if (this.options.cacheStrategy !== 'memory') {
      this.loadFromStorage()
    }
  }
  
  /**
   * 获取数据
   * @param {number} index 时间索引
   * @param {Function} loader 数据加载函数
   * @returns {Promise} 数据
   */
  async getData(index, loader) {
    this.stats.totalRequests++
    
    // 检查缓存
    if (this.options.enableCache && this.hasCache(index)) {
      this.stats.cacheHits++
      return this.getFromCache(index)
    }
    
    this.stats.cacheMisses++
    
    // 防止重复加载
    if (this.loadingQueue.has(index)) {
      return this.waitForLoading(index)
    }
    
    // 开始加载
    this.loadingQueue.add(index)
    
    try {
      const data = await loader(index)
      
      if (this.options.enableCache) {
        this.setCache(index, data)
      }
      
      this.notifyListeners('data-loaded', { index, data })
      return data
    } catch (error) {
      this.notifyListeners('error', { index, error })
      throw error
    } finally {
      this.loadingQueue.delete(index)
    }
  }
  
  /**
   * 预加载数据
   * @param {number} startIndex 开始索引
   * @param {number} count 预加载数量
   * @param {Function} loader 数据加载函数
   */
  async preloadData(startIndex, count, loader) {
    const promises = []
    
    for (let i = 0; i < count; i++) {
      const index = startIndex + i
      if (!this.hasCache(index) && !this.loadingQueue.has(index)) {
        promises.push(this.getData(index, loader))
      }
    }
    
    try {
      await Promise.all(promises)
    } catch (error) {
      console.warn('预加载部分数据失败:', error)
    }
  }
  
  /**
   * 检查是否有缓存
   */
  hasCache(index) {
    if (this.options.cacheStrategy === 'memory') {
      return this.cache.has(index)
    }
    
    const key = this.getCacheKey(index)
    const storage = this.getStorage()
    return storage && storage.getItem(key) !== null
  }
  
  /**
   * 从缓存获取数据
   */
  getFromCache(index) {
    if (this.options.cacheStrategy === 'memory') {
      return this.cache.get(index)
    }
    
    const key = this.getCacheKey(index)
    const storage = this.getStorage()
    if (storage) {
      try {
        const data = storage.getItem(key)
        return data ? JSON.parse(data) : null
      } catch (error) {
        console.warn('缓存数据解析失败:', error)
        return null
      }
    }
    
    return null
  }
  
  /**
   * 设置缓存
   */
  setCache(index, data) {
    if (this.options.cacheStrategy === 'memory') {
      // 内存缓存大小限制
      if (this.cache.size >= this.options.maxCacheSize) {
        const firstKey = this.cache.keys().next().value
        this.cache.delete(firstKey)
      }
      this.cache.set(index, data)
    } else {
      const key = this.getCacheKey(index)
      const storage = this.getStorage()
      if (storage) {
        try {
          storage.setItem(key, JSON.stringify(data))
        } catch (error) {
          console.warn('缓存数据存储失败:', error)
        }
      }
    }
  }
  
  /**
   * 清除缓存
   */
  clearCache() {
    if (this.options.cacheStrategy === 'memory') {
      this.cache.clear()
    } else {
      const storage = this.getStorage()
      if (storage) {
        const keys = []
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i)
          if (key && key.startsWith(this.getCachePrefix())) {
            keys.push(key)
          }
        }
        keys.forEach(key => storage.removeItem(key))
      }
    }
    
    this.notifyListeners('cache-cleared')
  }
  
  /**
   * 等待正在加载的数据
   */
  waitForLoading(index) {
    return new Promise((resolve, reject) => {
      const checkLoading = () => {
        if (!this.loadingQueue.has(index)) {
          if (this.hasCache(index)) {
            resolve(this.getFromCache(index))
          } else {
            reject(new Error('数据加载失败'))
          }
        } else {
          setTimeout(checkLoading, 50)
        }
      }
      checkLoading()
    })
  }
  
  /**
   * 获取存储对象
   */
  getStorage() {
    switch (this.options.cacheStrategy) {
      case 'localStorage':
        return typeof localStorage !== 'undefined' ? localStorage : null
      case 'sessionStorage':
        return typeof sessionStorage !== 'undefined' ? sessionStorage : null
      default:
        return null
    }
  }
  
  /**
   * 获取缓存键名
   */
  getCacheKey(index) {
    return `${this.getCachePrefix()}_${index}`
  }
  
  /**
   * 获取缓存前缀
   */
  getCachePrefix() {
    return 'high_player_cache'
  }
  
  /**
   * 从存储加载缓存
   */
  loadFromStorage() {
    const storage = this.getStorage()
    if (!storage) return
    
    const prefix = this.getCachePrefix()
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key && key.startsWith(prefix)) {
        const index = parseInt(key.replace(prefix + '_', ''))
        if (!isNaN(index)) {
          // 标记为已缓存，但不立即加载到内存
          // 实际数据在需要时从存储读取
        }
      }
    }
  }
  
  /**
   * 添加事件监听器
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
  }
  
  /**
   * 移除事件监听器
   */
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }
  
  /**
   * 通知监听器
   */
  notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('事件监听器执行错误:', error)
        }
      })
    }
  }
  
  /**
   * 获取统计信息
   */
  getStats() {
    return {
      ...this.stats,
      cacheSize: this.cache.size,
      loadingCount: this.loadingQueue.size,
      hitRate: this.stats.totalRequests > 0 
        ? (this.stats.cacheHits / this.stats.totalRequests * 100).toFixed(2) + '%'
        : '0%'
    }
  }
  
  /**
   * 重置统计信息
   */
  resetStats() {
    this.stats = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0
    }
  }
  
  /**
   * 销毁管理器
   */
  destroy() {
    this.clearCache()
    this.loadingQueue.clear()
    this.listeners.clear()
    this.resetStats()
  }
}

/**
 * 创建数据管理器实例
 */
export function createDataManager(options) {
  return new DataManager(options)
}

/**
 * 预设配置
 */
export const presets = {
  // 内存缓存模式
  memory: {
    enableCache: true,
    cacheStrategy: 'memory',
    maxCacheSize: 50,
    preloadCount: 3
  },
  
  // 本地存储模式
  localStorage: {
    enableCache: true,
    cacheStrategy: 'localStorage',
    maxCacheSize: 100,
    preloadCount: 5
  },
  
  // 会话存储模式
  sessionStorage: {
    enableCache: true,
    cacheStrategy: 'sessionStorage',
    maxCacheSize: 100,
    preloadCount: 5
  },
  
  // 无缓存模式
  noCache: {
    enableCache: false,
    preloadCount: 0
  }
}

export default DataManager