# HighPlayer 时间播放器组件

一个功能强大、易于使用的Vue 3时间播放器组件，支持缓存和非缓存两种数据模式，提供完整的播放控制功能。

## 特性

- 🚀 **高性能**: 支持数据缓存，避免重复请求
- 🎮 **完整控制**: 播放、暂停、重置、速度调节
- 💾 **多种缓存策略**: 内存、localStorage、sessionStorage
- 🔄 **智能预加载**: 自动预加载后续数据
- 📱 **响应式设计**: 适配不同屏幕尺寸
- 🎨 **可定制**: 支持自定义时间格式化和样式
- 📊 **统计信息**: 提供缓存命中率等统计数据

## 快速开始

### 基础用法

```vue
<template>
  <div>
    <!-- 完整功能播放器 -->
    <HighPlayer
      :timeList="timeList"
      :enableCache="true"
      @change-time="onTimeChange"
      @load-data="onLoadData"
    />
    
    <!-- 简化版播放器 -->
    <SimplePlayer
      :timeList="timeList"
      @time-change="onTimeChange"
    />
  </div>
</template>

<script>
import { HighPlayer, SimplePlayer } from '@/components/HighPlayer'

export default {
  components: {
    HighPlayer,
    SimplePlayer
  },
  
  data() {
    return {
      timeList: [
        { time: '2024-01-01T00:00:00Z', data: 'data1' },
        { time: '2024-01-01T01:00:00Z', data: 'data2' },
        { time: '2024-01-01T02:00:00Z', data: 'data3' }
      ]
    }
  },
  
  methods: {
    onTimeChange(index, data) {
      console.log('当前时间索引:', index, '数据:', data)
    },
    
    async onLoadData(index, item, resolve) {
      try {
        // 调用真实的数据请求方法
        const data = await this.getResult(index, item)
        
        // 通过回调函数返回数据给通用组件
        resolve(data)
        
        console.log(`数据加载成功: 索引 ${index}`, data)
      } catch (error) {
        console.error(`数据加载失败: 索引 ${index}`, error)
        // 加载失败时传递 null，组件会跳过当前数据继续播放
        resolve(null)
      }
    },
    
    // 真实的数据请求方法
    async getResult(index, item) {
      // 这里应该是真实的 API 调用
      // 例如: return await api.getData(index)
      
      const response = await fetch(`/api/data/${index}`)
      const data = await response.json()
      
      // 返回的数据必须包含 index 字段，用于通用组件验证
      return {
        index, // 必须包含，用于数据响应匹配验证
        ...data,
        ...item // 包含原始时间项数据
      }
    }
  }
}
</script>
```

## 组件说明

### HighPlayer (完整功能播放器)

功能丰富的时间播放器，支持缓存、预加载、统计等高级功能。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| timeList | Array | [] | 时间数据列表 |
| enableCache | Boolean | false | 是否启用缓存模式 |
| interval | Number | 1000 | 播放间隔(毫秒) |
| autoPlay | Boolean | false | 是否自动播放 |
| loop | Boolean | false | 是否循环播放 |
| timeFormatter | Function | null | 时间格式化函数 |
| maxMarks | Number | 10 | 最大显示刻度数 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| change-time | (index, data) | 时间改变时触发 |
| load-data | (index, item, resolve) | 需要加载数据时触发，通过resolve回调返回数据 |
| data-loaded | (index, data) | 数据加载完成时触发 |
| load-error | (index, error) | 数据加载失败时触发 |
| play | (index) | 开始播放时触发 |
| pause | (index) | 暂停播放时触发 |
| reset | () | 重置时触发 |
| speed-change | (speed) | 播放速度改变时触发 |
| complete | () | 播放完成时触发 |

### SimplePlayer (简化版播放器)

轻量级的时间播放器，适用于不需要复杂功能的场景。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| timeList | Array | [] | 时间数据列表 |
| interval | Number | 1000 | 播放间隔(毫秒) |
| loop | Boolean | false | 是否循环播放 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| time-change | (index, data) | 时间改变时触发 |
| play | (index) | 开始播放时触发 |
| pause | (index) | 暂停播放时触发 |
| reset | () | 重置时触发 |
| speed-change | (speed) | 播放速度改变时触发 |

## 高级用法

### 缓存模式

```vue
<template>
  <HighPlayer
    :timeList="timeList"
    :enableCache="true"
    @load-data="onLoadData"
    @data-loaded="onDataLoaded"
    @load-error="onLoadError"
  />
</template>

<script>
export default {
  methods: {
    async onLoadData(index, item, resolve) {
      try {
        // 调用真实的数据请求方法
        const data = await this.fetchApiData(index, item)
        
        // 通过回调函数返回数据给通用组件
        resolve(data)
        
        console.log(`数据加载成功: 索引 ${index}`, data)
      } catch (error) {
        console.error(`数据加载失败: 索引 ${index}`, error)
        // 加载失败时传递 null，组件会跳过当前数据继续播放
        resolve(null)
      }
    },
    
    async fetchApiData(index, item) {
      // 调用API获取数据
      const response = await this.$api.getTimeData(item.time)
      const data = response.data
      
      // 返回的数据必须包含 index 字段
      return {
        index, // 必须包含，用于数据响应匹配验证
        ...data,
        ...item
      }
    },
    
    onDataLoaded(index, data) {
      console.log('数据加载完成:', index, data)
    },
    
    onLoadError(index, error) {
      console.error('数据加载错误:', index, error)
    }
  }
}
</script>
```

### 自定义时间格式化

```vue
<template>
  <HighPlayer
    :timeList="timeList"
    :timeFormatter="formatTime"
  />
</template>

<script>
export default {
  methods: {
    formatTime(time) {
      const date = new Date(time)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
  }
}
</script>
```

### 使用DataManager

```javascript
import { createDataManager, presets } from '@/components/HighPlayer/DataManager'

// 创建数据管理器
const dataManager = createDataManager(presets.localStorage)

// 监听事件
dataManager.on('data-loaded', (data) => {
  console.log('数据加载完成:', data)
})

// 获取数据
const data = await dataManager.getData(index, async (index) => {
  const response = await fetch(`/api/data/${index}`)
  return response.json()
})

// 预加载数据
await dataManager.preloadData(0, 5, loader)

// 获取统计信息
const stats = dataManager.getStats()
console.log('缓存命中率:', stats.hitRate)

// 清除缓存
dataManager.clearCache()
```

## 数据格式

### timeList 支持的数据格式

```javascript
// 字符串格式
const timeList1 = [
  '2024-01-01T00:00:00Z',
  '2024-01-01T01:00:00Z'
]

// 数字时间戳
const timeList2 = [
  1704067200000,
  1704070800000
]

// 对象格式
const timeList3 = [
  { time: '2024-01-01T00:00:00Z', data: 'extra data' },
  { endTime: '2024-01-01T01:00:00Z', value: 100 },
  { tm: '2024-01-01T02:00:00Z', info: 'some info' }
]
```

## 缓存策略

### 内存缓存 (memory)
- 数据存储在内存中
- 页面刷新后丢失
- 性能最好
- 适合临时数据

### 本地存储 (localStorage)
- 数据持久化存储
- 浏览器关闭后保留
- 容量较大(通常5-10MB)
- 适合长期缓存

### 会话存储 (sessionStorage)
- 会话级别存储
- 标签页关闭后丢失
- 容量中等
- 适合会话期间缓存

## 样式定制

### CSS变量

```css
.high-player {
  --primary-color: #007bff;
  --background-color: rgba(0, 0, 0, 0.8);
  --text-color: white;
  --border-radius: 8px;
}
```

### 自定义样式

```vue
<style>
.high-player {
  /* 自定义背景 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* 自定义按钮样式 */
  .control-btn {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
  
  /* 自定义滑块样式 */
  .custom-slider :deep(.ant-slider-handle) {
    background: #ff6b6b;
    border-color: #ff6b6b;
    box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
  }
  
  .custom-slider :deep(.ant-slider-track) {
    background: #ff6b6b;
  }
}
</style>
```

## 迁移指南

### 从旧版TimePlayer迁移

```javascript
// 旧版用法
<TimePlayer 
  :list="list" 
  @changeTime="changeTime" 
/>

// 新版用法
<HighPlayer 
  :timeList="list" 
  @change-time="changeTime"
  @load-data="loadData"
/>
```

### 主要变化

1. **属性名变化**:
   - `list` → `timeList`
   - `changeTime` → `change-time`

2. **新增功能**:
   - 缓存支持
   - 预加载
   - 统计信息
   - 更好的错误处理

3. **简化配置**:
   - 移除复杂的mixin
   - 使用Composition API
   - 更清晰的事件系统

## 浏览器兼容性

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 注意事项

1. **数据加载机制**:
   - 必须在`load-data`事件中调用`resolve(data)`返回数据
   - 数据加载失败时调用`resolve(null)`，组件会跳过当前数据继续播放
   - 返回的数据必须包含`index`字段，用于数据响应匹配验证
   - 组件具有重试机制，最大重试3次后会跳过失败的数据

2. **架构设计**:
   - 通用组件(`HighPlayer`)不包含具体的业务逻辑
   - 数据请求逻辑应放在使用组件的地方，通过事件机制传递数据
   - 推荐将API调用封装为独立的方法（如`getResult`、`fetchApiData`等）

3. **性能优化**:
   - 大数据量时建议启用缓存
   - 合理设置`maxMarks`避免过多刻度
   - 使用预加载提升用户体验
   - 组件具有10秒的数据加载超时机制

4. **内存管理**:
   - 组件销毁时会自动清理定时器
   - 长期使用建议定期清理缓存
   - 数据加载失败不会阻塞播放器，确保播放流畅性

## 更新日志

### v1.1.0
- 🔧 **架构优化**: 移除通用组件中的具体业务逻辑，提升组件复用性
- 🚀 **重试机制**: 添加数据加载重试机制，最大重试3次后跳过失败数据
- ⏱️ **超时处理**: 增加10秒数据加载超时机制，防止长时间等待
- 🔄 **容错能力**: 数据加载失败时自动跳过，确保播放流畅性
- 📝 **事件优化**: 新增 `load-error` 事件，完善错误处理机制
- 🎯 **数据验证**: 增强数据响应匹配验证，确保数据一致性
- 📚 **文档更新**: 更新示例代码，反映最新的架构设计

### v1.0.0
- 初始版本发布
- 支持基础播放功能
- 支持缓存和非缓存模式
- 提供完整的事件系统
- 包含简化版播放器
- 提供数据管理器工具类

## 许可证

MIT License