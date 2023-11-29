<template>
  <!-- 地图底图切换 -->
  <div class="select-control">
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
      <span class="maptext">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      basicList: [
        {
          text: '地形图',
          type: '1',
          layerName: 'terrainImagery',
          src: '/ss-basin-flood-prevention/img/map/cycle.png'
        },
        {
          text: '卫星图',
          type: '2',
          layerName: 'satelliteImagery',
          src: '/ss-basin-flood-prevention/img/map/img_c.png'
        },
        {
          text: '矢量图',
          type: '3',
          layerName: 'vectorImagery',
          src: '/ss-basin-flood-prevention/img/map/map_vec.png'
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
.select-control {
  display: flex;
  position: absolute;
  left: 60px;
  top: 7px;
  padding: 12px 12px 5px;
  width: 264px;
  height: 121px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px #eaebef;
  border-radius: 4px;
  border: 1px solid #dcdcdc;

  .mapSelectBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    margin: 0 5px;

    > img {
      width: 70px;
      height: 70px;
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
}
</style>
