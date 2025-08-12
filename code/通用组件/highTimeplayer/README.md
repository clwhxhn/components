# HighTimePlayer 高级时间播放器组件

一个功能强大的时间播放器组件，基于 ant-design-vue 的 Slider 组件开发，支持数据缓存、播放速度控制等高级功能。

## 特性

- 🎮 **播放控制**: 支持播放、暂停、重置操作
- 🚀 **速度控制**: 支持 0.5x - 8x 播放速度调节
- 💾 **智能缓存**: 支持数据预加载和缓存机制
- 🔄 **循环播放**: 支持循环播放模式
- 📊 **进度显示**: 实时显示缓存进度
- 🎯 **精确控制**: 支持拖拽定位到任意时间点
- 📱 **响应式**: 自适应不同屏幕尺寸

## 安装

组件基于 Vue 2 和 ant-design-vue 开发，确保项目中已安装相关依赖：

```bash
npm install vue@^2.6.0 ant-design-vue dayjs
```

## 基本使用

```vue
<template>
  <div>
    <HighTimePlayer
      :time-list="timeList"
      :enable-cache="true"
      :auto-play="false"
      @load-data="handleLoadData"
      @show-data="handleShowData"
      @change="handleChange"
    />
  </div>
</template>

<script>
import HighTimePlayer from '@/components/highTimeplayer'

export default {
  components: {
    HighTimePlayer
  },
  data() {
    return {
      timeList: [
        { tm: '2024-01-01 08:00:00', value: 100 },
        { tm: '2024-01-01 09:00:00', value: 200 },
        { tm: '2024-01-01 10:00:00', value: 300 }
      ]
    }
  },
  methods: {
    // 处理数据加载请求
    handleLoadData(index, timeData, callback) {
      // 模拟异步数据加载
      setTimeout(() => {
        const data = {
          temperature: Math.random() * 30,
          humidity: Math.random() * 100
        }
        callback(data)
      }, 100)
    },
    
    // 处理数据显示
    handleShowData(index, data, timeData) {
      console.log('显示数据:', { index, data, timeData })
      // 在这里更新你的图表、地图等显示内容
    },
    
    // 处理时间变化
    handleChange(index, data) {
      console.log('时间变化:', { index, data })
    }
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| timeList | 时间数据列表 | Array | [] |
| enableCache | 是否启用缓存 | Boolean | true |
| showCacheStatus | 是否显示缓存状态 | Boolean | false |
| showTooltip | 是否显示tooltip | Boolean | true |
| timeFormat | 时间格式 | String | 'MM-DD HH:mm' |
| markStep | 标记显示间隔 | Number | 5 |
| autoPlay | 自动播放 | Boolean | false |
| loop | 循环播放 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load-data | 需要加载数据时触发 | (index, timeData, callback) |
| show-data | 显示数据时触发 | (index, data, timeData) |
| change | 时间点变化时触发 | (index, data) |
| play | 开始播放时触发 | (index) |
| pause | 暂停播放时触发 | (index) |
| reset | 重置时触发 | () |
| complete | 播放完成时触发 | () |
| speed-change | 播放速度变化时触发 | (speed) |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| play() | 开始播放 | - |
| pause() | 暂停播放 | - |
| reset() | 重置到开始 | - |
| goToIndex(index) | 跳转到指定索引 | index: Number |
| getCacheStatus() | 获取缓存状态 | - |

## 时间数据格式

组件支持两种时间数据格式：

### 格式1：字符串数组
```javascript
const timeList = [
  '2024-01-01 08:00:00',
  '2024-01-01 09:00:00',
  '2024-01-01 10:00:00'
]
```

### 格式2：对象数组
```javascript
const timeList = [
  { tm: '2024-01-01 08:00:00', value: 100 },
  { tm: '2024-01-01 09:00:00', value: 200 },
  { tm: '2024-01-01 10:00:00', value: 300 }
]
```

## 缓存机制

组件提供了智能的数据缓存机制：

1. **预加载**: 组件会自动预加载数据，提高播放流畅度
2. **按需加载**: 只有在需要显示时才会触发数据加载
3. **缓存状态**: 可以实时查看缓存进度
4. **内存管理**: 自动管理缓存数据，避免内存泄漏

### 禁用缓存

如果不需要缓存功能，可以设置 `enable-cache="false"`：

```vue
<HighTimePlayer
  :time-list="timeList"
  :enable-cache="false"
  @load-data="handleLoadData"
/>
```

## 播放速度控制

组件支持多种播放速度：

- 0.5x (2000ms间隔)
- 1x (1000ms间隔) - 默认
- 2x (500ms间隔)
- 4x (250ms间隔)
- 8x (100ms间隔)

## 样式自定义

组件使用 Less 编写样式，支持深度自定义：

```vue
<style lang="less">
.high-time-player {
  // 自定义背景
  background: your-custom-background;
  
  .player-controls .control-btn {
    // 自定义按钮样式
    background: your-custom-color;
  }
  
  .slider-container {
    /deep/ .ant-slider {
      // 自定义滑块样式
      .ant-slider-track {
        background-color: your-custom-color;
      }
    }
  }
}
</style>
```

## 注意事项

1. **数据加载**: `load-data` 事件必须调用回调函数，否则组件无法正常工作
2. **内存管理**: 组件会自动清理定时器和缓存，无需手动处理
3. **时间格式**: 确保时间数据格式正确，建议使用 ISO 8601 格式
4. **性能优化**: 大量数据时建议启用缓存机制

## 兼容性

- Vue 2.6+
- ant-design-vue 1.x/3.x
- 现代浏览器 (IE11+)

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基本播放控制
- 支持数据缓存
- 支持播放速度控制