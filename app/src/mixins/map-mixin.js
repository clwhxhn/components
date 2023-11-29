// import { mapGetters } from 'vuex'
export const MapMixin = {
  data() {
    return {
      loading: false,
      left: 208,
      rfRightVisible: true,
      dataSource: [],
      properties: {}, // 鼠标移入站点属性
      clickProperties: {}, // 鼠标点击站点属性
      defaultLayer: null, // 默认图层
      warnLayer: null, // 预警图层
      timer: null, // 预警动画定时器
      warnDataSource: [], // 预警数据源
      dealHover: false, // hover后，是否需要根据站点类型单独处理overlayer
      dealClick: false, // click后，是否需要根据站点类型单独处理overlayer
    }
  },
  computed: {
    // 地图实例
    mapDom() {
      const ref = this.$refs.olMapRef
      return ref
    },
    // ...mapGetters(['queryParam'])
  },
  mounted() {
    this.initBusEvents()
  },
  beforeDestroy() {
    this.$bus.$off('sideMenuExpanded')
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    // 面板展开收起事件, 重新计算地图宽度
    initBusEvents() {
      this.left =
        sessionStorage.getItem('sideMenuExpanded') === 'true' ? 208 : 0
      this.$bus.$on('sideMenuExpanded', val => {
        this.left = val ? 208 : 0
        this.mapDom.mapResize()
      })
    },
    // 展示右侧面板
    showRightPanel() {
      this.rfRightVisible = !this.rfRightVisible
      this.mapDom.mapResize()
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
          const properties = feature.getProperties()
          that.properties = properties
          const coordinates = feature.getGeometry().getCoordinates()
          that.mapDom.hoverPopup.setPosition(coordinates)
          if (that.dealHover) {
            that.handleAfterHover(properties)
          }
        } else {
          map.getTargetElement().style.cursor = 'auto'
          that.mapDom.hoverPopup.setPosition(undefined)
        }
      })
    },
    // 设置站点点击事件
    setPointClick() {
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
            that.mapDom.clickPopup.setPosition(coordinates)
            if (that.dealHover) {
              that.handleAfterClick(properties, coordinates)
            } else {
              that.flyToPoint(lon, lat)
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
      this.mapDom.clickPopup.setPosition(undefined)
    },
    // 预警动画
    warnAnimation(radiusKey) {
      const {
        mapDom: { map }
      } = this
      const that = this
      let radius = 1
      this.timer = setInterval(function () {
        if (radius > radiusKey) {
          radius = 1
        }
        let resolution = map.getView().getResolution()
        if (that.warnLayer) {
          let features = that.warnLayer.getSource().getFeatures()
          features.forEach(item => {
            item.setStyle(that.animationStyle(item, resolution, radius))
          })
        }
        radius += 2
      }, 200)
    }
  }
}
