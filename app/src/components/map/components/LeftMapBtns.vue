<template>
  <!-- 地图左边控件 -->
  <div class="map-leftbus">
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
export default {
  name: 'LeftMapBtns',
  props: {
    keyStr: {
      type: String,
      default: 'magerySwitch, zoomReset, legend'
    },
    titleList: {
      type: Array,
      default: () => {
        return ['底图切换', '缩放还原', '图例查看']
      }
    }
  },
  data() {
    return {
      baselist: [
        {
          text: '底图切换',
          key: 'magerySwitch',
          src: `${path}baselayer.png`,
          activeSrc: `${path}baselayerActive.png`
        },
        {
          text: '重置',
          key: 'zoomReset',
          src: `${path}mapreset.png`,
          activeSrc: `${path}mapresetActive.png`
        },
        {
          text: '图例',
          key: 'legend',
          src: `${path}legend.png`,
          activeSrc: `${path}legendActive.png`
        }
      ],
      list: [],
      activeVal: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.list = []
    this.baselist.forEach(item => {
      if (this.keyStr.includes(item.key)) {
        this.list.push(item)
      }
    })
    this.titleList.forEach((item, index) => {
      this.list[index].text = item
    })
  },
  beforeDestroy() {
    //
  },
  methods: {
    handle(val) {
      this.activeVal = this.activeVal === val ? '' : val
      this.$emit('change', val)
      // 如果是重置，选中2s后取消选中
      if (val === 'zoomReset') {
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
  left: 7px;
  top: 7px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .water-map-controls {
    margin-bottom: 8px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
