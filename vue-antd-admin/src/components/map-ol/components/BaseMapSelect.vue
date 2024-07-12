<template>
  <!-- 地图底图切换 -->
  <div
    :class="
      location === 'right' ? 'right-select-control' : 'left-select-control'
    "
    :style="location === 'right' ? `right:${rightPx + 35}px` : ''"
  >
    <div
      v-for="(item, i) in basicList"
      :key="'baselayer' + i"
      :title="item.text"
      class="mapSelectBox"
      @click="mapTypeChange(item)"
    >
      <img
        :src="item.src"
        :class="mapType === item.layerName ? ' activeMap' : ''"
      />
      <!--      <span class="maptext">{{ item.text }}</span>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultType: {
      type: String,
      default: ''
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
      basicList: [
        {
          text: '地形图',
          type: '1',
          layerName: 'terrainImagery',
          src: '/img/map/base-terrain.png'
        },
        {
          text: '卫星图',
          type: '2',
          layerName: 'satelliteImagery',
          src: '/img/map/base-imagery.png'
        },
        {
          text: '矢量图',
          type: '3',
          layerName: 'vectorImagery',
          src: '/img/map/base-vector.png'
        }
      ],
      mapType: '3',
      visible: false
    }
  },
  created() {
    //
  },
  mounted() {
    if (this.defaultType) {
      this.mapType = this.defaultType
    }
  },
  beforeDestroy() {
    //
  },
  methods: {
    mapTypeChange(val) {
      this.mapType = val.layerName
      this.$emit('layerSelect', val.layerName)
    }
  }
}
</script>

<style lang="less" scoped>
.left-select-control {
  display: flex;
  position: absolute;
  left: 55px;
  top: 9px;
}

.right-select-control {
  display: flex;
  position: absolute;
  right: 60px;
  top: 9px;
}

.mapSelectBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin: 0 5px;

  > img {
    width: 88px;
    height: 56px;
    margin-bottom: 10px;
  }

  .maptext {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #7a8a99;
    font-size: 12px;
  }
}

.activeMap {
  box-shadow: 0px 0px 4px 0px #3384ff;
  border-radius: 4px;
  border: 1px solid #3384ff;
}
</style>
