<template>
  <GreyBackground :no-margin="true">
    <div
      class="main-warp"
      :style="{
        width: `calc(100vw - ${left}px)`
      }"
    >
      <a-spin :spinning="loading">
        <OlMap
          ref="olMapRef"
          :legend-slot="true"
          :default-base-layer="'satelliteImagery'"
        >
          <StationLegend slot="legend" />
          <WlHoverPopup
            slot="hover-popup"
            :properties="properties"
          ></WlHoverPopup>

          <StationClickPopup
            slot="click-popup"
            :properties="clickProperties"
            :type="clickPopupType"
            @close="popupClose"
          />
        </OlMap>
      </a-spin>
      <div
        class="right-img"
        :class="rfRightVisible ? 'arrowhead-icon2' : 'arrowhead-icon1'"
        @click="showRightPanel"
      ></div>
      <!-- <RightPanel v-show="rfRightVisible" ref="rightPanelRef" /> -->
    </div>
  </GreyBackground>
</template>

<script>
import GreyBackground from '@/components/bg/GreyBackground'
import OlMap from '@/components/map/OlMap'
import { MapMixin } from '@/mixins/map-mixin'
import RightPanel from './components/RightPanel'
import StationLegend from './components/StationLegend'
import WlHoverPopup from './components/WlHoverPopup'
import StationClickPopup from './components/StationClickPopup'
// import { postAction, getAction } from '@/api/manage'
import {
  styleFunction,
  stationConfig,
  dangerousConfig,
  warnColor,
  lineConfig
} from './components/station-layer'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import { Fill, Style, Text, Icon, Circle, Stroke } from 'ol/style'
import LineString from 'ol/geom/LineString'

export default {
  name: 'EmergencyInstruction',
  components: {
    GreyBackground,
    OlMap,
    RightPanel,
    StationLegend,
    WlHoverPopup,
    StationClickPopup
  },
  mixins: [MapMixin],
  data() {
    return {
      normalSites: [],
      dangerousSites: [],
      timer: null,
      dealHover: true,
      dealClick: true,
      clickPopupType: 'video'
    }
  },
  mounted() {
    this.getAllData()
    this.getDanderousData()
    setTimeout(() => {
      this.createdLineLayer()
    }, 3000)
  },
  methods: {
    async getDanderousData() {
      // 所有风险点
    //   const res = await getAction(
    //     '/basin.flood.prevention/bfpEmePlan/queryAllRisk'
    //   )
    //   if (res.success) {
    //     this.dangerousSites = res.result.records || []
    //     console.log(' this.dangerousSites: ', this.dangerousSites)

    //     await this.createLayer(
    //       'dangerousStation',
    //       'dangerousStationLayer',
    //       dangerousConfig
    //     ) // 创建风险点图层
    //   }
    },
    async getAllData() {
      // 所有站点信息
    //   const res = await getAction(
    //     '/basin.flood.prevention/bfpEmePlan/queryAllStations',
    //     {
    //       pageNo: 1,
    //       pageSize: 9999
    //     }
    //   )
    //   if (res.success) {
    //     this.normalSites = res.result.records || []
    //     await this.createLayer('station', 'stationLayer', stationConfig) // 创建所有站点（全部）图层
    //   }
    },
    // 创建图层
    /**
     * @description: 创建图层
     * @param {*layerName} string 图层配置js文件，layerName名称
     * @param {*layer} string 具体图层名称
     * @param {*config} object 图层配置
     */
    async createLayer(layerName, layer, config) {
      const {
        mapDom: { map }
      } = this
      console.log(map.getLayers().getArray())
      const flag = map
        .getLayers()
        .getArray()
        .some(ol => ol.get('layerName') === layerName)
      if (flag) {
        this.renderMapPoint(layer)
        return
      }
      const newLayer = await config.layerHandle
      this[layer] = newLayer
      map.addLayer(this[layer])
      this.renderMapPoint(layer)
    },
    // 渲染点位
    renderMapPoint(layer) {
      const source = this[layer].getSource()
      if (source) {
        source.clear()
      }
      let features
      if (layer === 'stationLayer') {
        features = this.defaultLayerFeatures()
      } else if (layer === 'dangerousStationLayer') {
        features = this.dangerousLayerFeatures()
        this.warnAnimation()
      }

      source.addFeatures(features)

      if (this.timer) clearInterval(this.timer)
      this.setPointHover() // 设置鼠标移入高亮(MapMixin)
      this.setPointClick() // 设置地图点击事件(MapMixin)
    },
    defaultLayerFeatures() {
      const features = this.normalSites.map(item => {
        item.waringColor = warnColor[item.warnLevel]
        let feature = new Feature({
          geometry: new Point([item.longitude, item.latitude]),
          layerFlag: 'point'
        })
        feature.setProperties(item)
        return feature
      })
      return features
    },
    dangerousLayerFeatures() {
      const features = this.dangerousSites.map(item => {
        item.waringColor = warnColor[item.warnLevel]
        let feature = new Feature({
          geometry: new Point([item.longitude, item.latitude]),
          layerFlag: 'point'
        })
        feature.setProperties(item)
        return feature
      })
      return features
    },
    // 预警动画
    warnAnimation() {
      const {
        mapDom: { map }
      } = this
      const that = this
      let radius = 1
      this.timer = setInterval(function () {
        if (radius > 8) {
          radius = 1
        }
        let resolution = map.getView().getResolution()
        if (that.stationLayer) {
          let features = that.dangerousSites.getSource().getFeatures()
          features.forEach(item => {
            item.setStyle(that.animationStyle(item, resolution, radius))
          })
        }
        radius += 2
      }, 200)
    },
    // 预警动画
    animationStyle(feature, resolution, radius) {
      const style = styleFunction(feature, resolution) // 获取默认样式
      // 设置预警新样式
      const newStyle = new Style({
        image: new Circle({
          radius: radius,
          stroke: new Stroke({
            color: feature.get('waringColor'),
            width: 1
          }),
          fill: new Fill({
            color: feature.get('waringColor')
          })
        })
      })
      return [newStyle, style]
    },
    handleAfterHover(properties) {
      // 水位站有hoverpopup，其余类型站点没有
      if (!(properties.stType && properties.stType == 3)) {
        this.mapDom.hoverPopup.setPosition(undefined)
      }
    },
    handleAfterClick(properties, coordinate) {
      console.log(properties.stType)
      // 视频站
      if (properties.stType && properties.stType == 4) {
        const [lon, lat] = coordinate
        this.clickPopupType = 'video'
        this.flyToPoint(lon, lat)
      } else {
        this.mapDom.clickPopup.setPosition(undefined)
      }
    },
    async createdLineLayer() {
      const {
        mapDom: { map }
      } = this
      console.log(map)
      const lineCoordinates = [
        [108.449898, 30.759731],
        [108.28235, 30.66889]
      ]
      // 创建 LineString 几何体
      const lineGeometry = new LineString(lineCoordinates)
      // 创建 Feature
      const lineFeature = new Feature(lineGeometry)
      const layer = await lineConfig.layerHandle
      // 获取图层的数据源
      const layerSource = layer.getSource()
      // 添加 Feature 到图层的数据源
      layerSource.addFeature(lineFeature)
      map.addLayer(layer)
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/less/map-common.less';
</style>
