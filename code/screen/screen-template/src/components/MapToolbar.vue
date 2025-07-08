<template>
  <div class="scene-toolbar" :class="{ collapsed, top }">
    <div
      v-for="(button, index) in displayButtons"
      :key="index"
      class="scene-toolbar__button"
      @click="onButtonClick(button.event)">
      <span
        class="scene-toolbar__button-icon"
        :class="[
          button.icon,
          {
            selected:
              button.event === 'fullScreen'
                ? isPanelCollapsed
                : selectedEvent === button.event
          }
        ]" />
      <span class="scene-toolbar__button-label">{{ button.label }}</span>
    </div>
  </div>
</template>

<script>
import { useUIStateStore } from '@/stores/uiState'
import { mapState } from 'pinia'
import { useSceneStore } from '@/stores/scene'
// import { watch } from 'vue'
export default {
  name: 'MapToolbar',
  props: {
    top: {
      type: Boolean,
      default: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    showRunning: {
      type: Boolean,
      default: false
    },
    showOverview: {
      type: Boolean,
      default: false
    },
    showRoaming: {
      type: Boolean,
      default: false
    },
    showToggle: {
      type: Boolean,
      default: true
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showReset: {
      type: Boolean,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    showFullScreen: {
      type: Boolean,
      default: false
    },
    showMonitor: {
      type: Boolean,
      default: false
    },
    showCamera: {
      type: Boolean,
      default: false
    },
    showMaintain: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toolBarClick'],
  // setup() {
  //   const uiState = useSceneStore()
  //   return { uiState }
  // },
  data() {
    return {
      buttons: [
        { label: '返回', icon: 'back', event: 'back', show: true },
        { label: '工程图例', icon: 'legend', event: 'legend', show: true },
        { label: '地图复位', icon: 'reset', event: 'reset', show: true },
        { label: '漫游飞行', icon: 'roam', event: 'roam', show: true },
        { label: '工程概览', icon: 'overview', event: 'overview', show: true },
        { label: '工程运行', icon: 'running', event: 'running', show: true },
        { label: '视频监控', icon: 'camera', event: 'camera', show: true },
        { label: '安全监测', icon: 'monitor', event: 'monitor', show: false },
        { label: '全屏', icon: 'fullScreen', event: 'fullScreen', show: true },
        { label: '工程维护', icon: 'maintain', event: 'maintain', show: false }
      ],
      selectedEvent: ''
    }
  },
  computed: {
    displayButtons() {
      this.buttons.find(b => b.event === 'reset').show = this.showReset
      this.buttons.find(b => b.event === 'legend').show = this.showLegend
      this.buttons.find(b => b.event === 'roam').show = this.showRoaming
      this.buttons.find(b => b.event === 'back').show = this.showBack
      this.buttons.find(b => b.event === 'running').show = this.showRunning
      this.buttons.find(b => b.event === 'camera').show = this.showCamera
      this.buttons.find(b => b.event === 'monitor').show = this.showMonitor
      this.buttons.find(b => b.event === 'overview').show = this.showOverview
      this.buttons.find(b => b.event === 'fullScreen').show =
        this.showFullScreen
      this.buttons.find(b => b.event === 'maintain').show = this.showMaintain
      return this.buttons.filter(b => b.show)
    },
    ...mapState(useSceneStore, ['currentFeatureID']),
    ...mapState(useUIStateStore, ['isPanelCollapsed'])
  },
  watch: {
    // 显示漫游状态时说明需要显示工具栏整体，不监听隐藏漫游时防止没有漫游路线时工具栏整体也不显示
    showRoaming(value) {
      if (value) {
        this.buttons.forEach(b => {
          b.show = true
        })
      }
    },
    currentFeatureID() {
      this.selectedEvent = ''
    }
  },
  methods: {
    onButtonClick(e) {
      // 需要记住当前状态的事件
      const statefullEvents = [
        'legend',
        'overview',
        'running',
        'camera',
        'monitor',
        'maintain'
      ]

      // 进入漫游状态时隐藏所有其他按钮
      if (e === 'roam') {
        this.buttons.forEach(b => {
          b.show = b.event === 'roam'
        })
      }

      // 根据上一次点击状态来重置选中事件，方便切换和重置选中状态
      if (this.selectedEvent === e && statefullEvents.includes(e)) {
        this.selectedEvent = ''
      } else {
        this.selectedEvent = e
      }
      // 取消选中时需要收起面板的事件
      if (this.selectedEvent === '' && statefullEvents.slice(1).includes(e)) {
        useUIStateStore().setPanelCollapsed(true)
      }
      if (e !== 'fullScreen') {
        this.$emit('toolBarClick', this.selectedEvent)
      } else {
        useUIStateStore().togglePanelCollapsed()
      }
    }
  }
}
</script>

<style lang="less">
.scene-toolbar {
  margin-top: 10px;
}
.scene-toolbar__button {
  display: flex;
  // flex-direction: column;
  align-items: center;
  cursor: pointer;
  pointer-events: all;
  &:not(:first-child) {
    border-top: 1px solid;
    border-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 52%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &:hover > .scene-toolbar__button-label {
    display: inline-block;
    width: 67px;
    height: 17px;
    background-image: url('@/assets/images/bg-toolbar-label.png');
    background-size: 100% 100%;
  }
}
.scene-toolbar__button-icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &.fullScreen {
    background-image: url('@/assets/images/BGFullScreenButton.png');
  }
  &.fullScreen:hover,
  &.fullScreen.selected {
    background-image: url('@/assets/images/BGFullScreenButtonHover.png');
  }
  &.camera {
    background-image: url('@/assets/images/BGCameraButton.png');
  }
  &.camera:hover,
  &.camera.selected {
    background-image: url('@/assets/images/BGCameraButtonHover.png');
  }
  &.back {
    background-image: url('@/assets/images/BGBackButton.png');
  }
  &.back:hover {
    background-image: url('@/assets/images/BGBackButtonHover.png');
  }
  &.legend {
    background-image: url('@/assets/images/BGLegendButton.png');
  }
  &.legend:hover,
  &.legend.selected {
    background-image: url('@/assets/images/BGLegendButtonHover.png');
  }
  &.overview {
    background-image: url('@/assets/images/BGOverviewButton.png');
  }
  &.overview:hover,
  &.overview.selected {
    background-image: url('@/assets/images/BGOverviewButtonHover.png');
  }
  &.running {
    background-image: url('@/assets/images/BGRunningButton.png');
  }
  &.running:hover,
  &.running.selected {
    background-image: url('@/assets/images/BGRunningButtonHover.png');
  }
  &.monitor {
    background-image: url('@/assets/images/BGMonitorButton.png');
  }
  &.monitor:hover,
  &.monitor.selected {
    background-image: url('@/assets/images/BGMonitorButtonHover.png');
  }
  &.reset {
    background-image: url('@/assets/images/BGResetButton.png');
  }
  &.reset:hover {
    background-image: url('@/assets/images/BGResetButtonHover.png');
  }
  &.toggle {
    background-image: url('@/assets/images/BGToggleButton.png');
  }
  &.toggle:hover,
  &.toggle.selected {
    background-image: url('@/assets/images/BGToggleButtonHovered.png');
  }
  &.roam {
    background-image: url('@/assets/images/BGRoamButton.png');
  }
  &.roam:hover {
    background-image: url('@/assets/images/BGRoamButtonHover.png');
  }
  &.maintain {
    background-image: url('@/assets/images/BGOverviewButton.png');
  }
  &.maintain:hover,
  &.maintain.selected {
    background-image: url('@/assets/images/BGOverviewButtonHover.png');
  }
}
.scene-toolbar__button-label {
  display: none;
  font-size: 10px;
  color: #dae8ff;
  line-height: 17px;
  text-align: center;
}
</style>
