import { mapGetters } from 'vuex'
import { iconAnimation } from '@/utils/mapTool';
const colors = {
  1: '242,86,86',
  2: '255,144,53',
  3: '255,223,85',
  4: '2,167,240'
};

export const MapMixin = {
  data() {
    return {
      left: 216,
      rfRightVisible: true,
      loading: false,
      dataSource: [],
      properties: {}, // 鼠标移入站点属性
      clickProperties: {}, // 鼠标点击站点属性
      defaultLayer: null, // 默认图层
      warningLayer: null, // 预警图层
      timer: null, // 预警动画定时器
      isHighlightPolygonLayer: false, // 洪水预报-人工交互预报：是否有需要高亮的面图层
      warnDataSource: [], // 预警数据源
      dealHover: false, // hover后，是否需要根据站点类型单独处理overlayer
      dealClick: false, // click后，是否需要根据站点类型单独处理overlayer
      highlightLayer: null, // 高亮图层
    //   defaultViews: {
    //     center: [108.4690738595931, 30.67002728391455],
    //     zoom: 10.3
    //   },
      rightMapViews: {
        center: [108.7190738595931, 30.67002728391455],
        zoom: 10.3
      }
    }
  },
  computed: {
    // 地图实例
    mapDom() {
      const ref = this.$refs.olMapRef
      return ref
    },
    ...mapGetters(['queryParam','latestForecast'])
  },
  mounted() {
    // this.initBusEvents()
  },
  beforeDestroy() {
    // this.$bus.$off('sideMenuExpanded')
    if (this.timer) cancelAnimationFrame(this.timer)
  },
  methods: {
    // 面板展开收起事件, 重新计算地图宽度
    initBusEvents() {
      this.left =
        sessionStorage.getItem('sideMenuExpanded') === 'true' ? 216 : 0
      this.$bus.$on('sideMenuExpanded', val => {
        this.left = val ? 216 : 0
        this.mapDom.mapResize()
      })
    },
    // 展示右侧面板
    showRightPanel() {
      this.rfRightVisible = !this.rfRightVisible
      const mapViews = this.rfRightVisible
        ? this.rightMapViews
        : this.defaultViews
      this.mapDom.mapReset(mapViews)
      if (this.rfRightVisible) {
        this.state = 'show'
        this.rightComponentWidth = 450
      } else {
        this.state = 'hide'
        this.rightComponentWidth = 0
      }
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
    // 设置站点鼠标移入事件
    setPointHover() {
      const {
        mapDom: { map }
      } = this
      const that = this
      map.on('pointermove', function (evt) {
        if (evt.dragging) {
          return
        }
        const pixel = map.getEventPixel(evt.originalEvent)
        // eslint-disable-next-line no-shadow
        const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature
        })
        // 业务图层: 鼠标移到站点显示小手
        if (feature && feature.get('layerFlag')) {
          map.getTargetElement().style.cursor = 'pointer'
          if (feature.get('layerFlag') === 'fourBasin') {
            that.setPolygonHighlight(feature, true)
            return
          }
          const properties = feature.getProperties()
          that.properties = properties
          const coordinates = feature.getGeometry().getCoordinates()
          that.mapDom.hoverPopup.setPosition(coordinates)
          if (that.dealHover) {
            that.handleAfterHover(properties)
          }
        } else {
          if (that.isHighlightPolygonLayer) {
            that.setPolygonHighlight(feature, false)
          }
          map.getTargetElement().style.cursor = 'auto'
          that.mapDom.hoverPopup.setPosition(undefined)
        }
      })
    },
    // 设置站点点击事件
    setPointClick(flag) {
      const {
        mapDom: { map }
      } = this
      const that = this
      // 地图单击事件
      map.on('singleclick', e => {
        const pixel = map.getEventPixel(e.originalEvent)
        // eslint-disable-next-line no-shadow
        const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature
        })
        that.mapDom.clickPopup.setPosition(undefined)
        if (feature) {
          const coordinate = map.getCoordinateFromPixel(pixel)
          const properties = feature.getProperties()
          const [lon, lat] = coordinate
          if (properties && feature.get('layerFlag')) {
            that.clickProperties = properties
            const coordinates = feature.getGeometry().getCoordinates()
            if (that.dealClick) {
              this.handleAfterClick(properties, coordinates)
            } else {
              that.mapDom.clickPopup.setPosition(coordinates)
            }
            if (that.dealHover) {
              that.handleAfterClick(properties, coordinates)
            } else {
              if (feature.get('layerFlag') !== 'fourBasin') {
                if (!flag) {
                  that.flyToPoint(lon, lat)
                }
              }
            }
          }
        }
      })
    },
    // 地图放大平移到指定位置
    flyToPoint(stLong, stLat) {
      this.mapDom.flyTo(stLong, stLat)
    },
    // 手动关闭点击弹窗
    popupClose() {
      if (this.mapDom.clickPopup) this.mapDom.clickPopup.setPosition(undefined)
    },
    // 预警动画
    warnAnimation(radiusKey) {
      const {
        mapDom: { map }
      } = this
      const that = this
      let radius = 1
      let animationSpeed = 0.25 // 将动画速度减慢一半
      function animate() {
        // 执行动画操作
        if (radius > radiusKey) {
          radius = 1
        }
        let resolution = map.getView().getResolution()
        if (that.warningLayer) {
          let features = that.warningLayer.getSource().getFeatures()
          features.forEach(item => {
            item.setStyle(that.animationStyle(item, resolution, radius))
          })
        }
        // requestAnimationFrame 是一个浏览器提供的用于执行动画和其他高性能操作的 API。
        // 调用 requestAnimationFrame，并传入回调函数
        requestAnimationFrame(animate)
        radius += animationSpeed
      }

      this.timer = requestAnimationFrame(animate)
    },
    // 表格行选中高亮
    tableRowSelectHighlight(type, code) {
      const {
        mapDom: { map }
      } = this
      this.visibleFalseHighlightLayer()
      const source = this.highlightLayer.getSource()
      if (source) source.clear()
      // 如果type为1，说明是行政区划，xzqh图层，否则是流域river-basin
      const layerKey = type === 1 ? 'xzqh' : 'river-basin'
      const CodeKey = type === 1 ? 'Code' : 'bas_code'
      const layer = map
        .getLayers()
        .getArray()
        .find(ol => ol.get('layerName') === layerKey)
      if (!layer) return
      const features = layer.getSource().getFeatures()
      const feature = features.find(item => item.get(CodeKey) === code)
      if (feature) {
        source.addFeature(feature)
        this.highlightLayer.setVisible(true)
      }
    },
    // 高亮图层隐藏
    visibleFalseHighlightLayer() {
      if (this.highlightLayer) {
        this.highlightLayer.setVisible(false)
      }
    },
    showHideLayer(type) {
      const {
        mapDom: { map }
      } = this

      // 如果是'0'，则隐藏流域图层,显示行政区划图层;如果是'1'，则显示流域图层,隐藏行政区划图层
      const layers = map.getLayers()
      const some = layers
        .getArray()
        .some(item => item.get('layerName') === 'river-basin')
      if (type === '0') {
        if (!some) {
          // 轮询调用showHideLayer
          const timer = setTimeout(() => {
            this.showHideLayer('0')
            clearTimeout(timer)
          }, 1000)
        }
        layers.forEach(item => {
          if (item.get('layerName') === 'river-basin') {
            item.setVisible(false)
          }
          if (item.get('layerName') === 'xzqh') {
            item.setVisible(true)
          }
        })
      } else {
        layers.forEach(item => {
          if (item.get('layerName') === 'river-basin') {
            item.setVisible(true)
          }
          if (item.get('layerName') === 'xzqh') {
            item.setVisible(false)
          }
        })
      }
    },

    // 预警闪烁
    refreshWaterLayers(layerName,bascode) {
      let basinSattionArr =[]
      if(bascode){
        basinSattionArr = this.latestForecast.warnList.filter(i=>i.basCode == bascode)
      }else{
        basinSattionArr = this.latestForecast.warnList
      }
      const {
        mapDom: { map }
      } = this
      const layers = layerName; // 水文站、水库、视频站、水位站
        layers.forEach((el) => {
          const layer = map.getLayers().getArray().find(ol => ol.get('layerName') === el)
          if (!layer) return;
          //获取当前图层的所有feature,并过滤出warnType不为空的feature
          let features = null
          features = layer
            .getSource()
            .getFeatures()
            .filter((fea) =>
            basinSattionArr.find(i=>i.stCode === fea.values_.stCode && i.warnLevel)
            );
          if (features.length === 0) return;
          const params = {
            layer,
            features,
            map: map,
            colors,
            key: el,
            warnList: basinSattionArr,
          };
          iconAnimation(params); //调用动画
        });
    },
  }
}
