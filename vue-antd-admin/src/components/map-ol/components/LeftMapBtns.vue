<template>
  <!-- 地图左边控件 -->
  <div
    :class="location === 'right' ? 'right-btns' : 'map-leftbus'"
    :style="location === 'right' ? `right:${rightPx}px` : ''"
  >
    <img
      v-for="(item, i) in list"
      :key="'list' + i"
      class="water-map-controls"
      :title="item.text"
      :src="activeVal == item.key ? item.activeSrc : item.src"
      @click="handle(item.key)"
    />
  </div>
</template>

<script>
const path = '/ss-basin-flood-prevention/img/map/'
const pathNew = '/ss-basin-flood-prevention/img/map/satelliteImagery/'

export default {
  name: 'LeftMapBtns',
  props: {
    hideKeyStr: {
      type: String,
      default: 'layerSwitch'
    },
    titleList: {
      type: Array,
      default: () => {
        return ['底图切换', '缩放还原', '图例查看']
      }
    },
    location: {
      type: String,
      default: 'left'
    },
    rightPx: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      baselist: [
        {
          text: '底图切换',
          key: 'magerySwitch',
          src: `${pathNew}baselayer.png`,
          activeSrc: `${pathNew}baselayerActive.png`
        },
        {
          text: '图层切换',
          key: 'layerSwitch',
          src: `${pathNew}layer.png`,
          activeSrc: `${pathNew}layerActive.png`
        },
        {
          text: '放大',
          key: 'zoomIn',
          src: `${pathNew}zoomin.png`,
          activeSrc: `${pathNew}zoominActive.png`
        },
        {
          text: '缩小',
          key: 'zoomOut',
          src: `${pathNew}zoomout.png`,
          activeSrc: `${pathNew}zoomoutActive.png`
        },
        {
          text: '重置',
          key: 'zoomReset',
          src: `${pathNew}mapreset.png`,
          activeSrc: `${pathNew}mapresetActive.png`
        }
      ],
      list: [],
      activeVal: ''
    }
  },
  computed: {},
  watch: {
    hideKeyStr: {
      immediate: true,
      handler(val) {
        this.list = []
        this.baselist.forEach(item => {
          if (!this.hideKeyStr.includes(item.key)) {
            this.list.push(item)
          }
        })
      }
    }
  },
  mounted() {
    // this.list = []
    // this.baselist.forEach(item => {
    //   if (!this.hideKeyStr.includes(item.key)) {
    //     this.list.push(item)
    //   }
    // })
    // this.titleList.forEach((item, index) => {
    //   this.list[index].text = item
    // })
  },
  beforeDestroy() {
    //
  },
  methods: {
    handle(val) {
      this.activeVal = this.activeVal === val ? '' : val
      this.$emit('change', val)
      // 如果是重置，选中2s后取消选中
      if (val.includes('zoom')) {
        const timer = setTimeout(() => {
          this.activeVal = ''
          clearTimeout(timer)
        }, 2000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.map-leftbus {
  z-index: 999;
  position: absolute;
  left: 16px;
  top: 15px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-btns {
  z-index: 999;
  position: absolute;
  right: 7px;
  top: 15px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.water-map-controls {
  margin-bottom: 5px;

  &:hover {
    cursor: pointer;
  }
}
</style>
