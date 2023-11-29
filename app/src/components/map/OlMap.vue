<template>
  <div class="map-layout">
    <div id="mainMap" class="ol-map"></div>
    <div id="hover-popup" class="ol-map-popup">
      <div id="popup-content">
        <slot name="hover-popup"></slot>
      </div>
    </div>
    <div id="click-popup" class="ol-map-popup">
      <div id="popup-content">
        <slot name="click-popup"></slot>
      </div>
    </div>
    <!-- 左侧控制按钮 -->
    <LeftMapBtns @change="leftBtnClick" />
    <!-- 底图切换 -->
    <BaseMapSelect
      :defaultType="defaultBaseLayer"
      v-show="btnConfig.magerySwitch"
      @layerSelect="BaseLayerSelect"
    />
    <!-- 图例插槽 -->
    <slot v-if="legendSlot && btnConfig.legend" name="legend"></slot>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { defaults } from "ol/control";
import Overlay from "ol/Overlay";

import { getImageryLayers } from "./configs/base-imagery";
import { getLayerConfigs } from "./configs";
import LeftMapBtns from "./components/LeftMapBtns.vue";
import BaseMapSelect from "./components/BaseMapSelect.vue";

export default {
  name: "OlMap",
  components: {
    LeftMapBtns,
    BaseMapSelect,
  },
  props: {
    legendSlot: {
      type: Boolean,
      default: false,
    },
    defaultBaseLayer: {
      type: String,
      default: "vectorImagery",
    },
  },
  data() {
    return {
      map: null,
      baseLayers: [],
      defaultLayers: [],
      btnConfig: {
        magerySwitch: false, // 底图显隐
        legend: true, // 图例
      },
      views: {
        center: [108.4690738595931, 30.67002728391455],
        zoom: 10.5,
      },
      mapTimer: null,
      hoverPopup: null, // 鼠标移入popup
      clickPopup: null, // 点击popup
    };
  },
  computed: {},
  watch: {},
  async mounted() {
    this.baseLayers = getImageryLayers();
    this.defaultLayers = await getLayerConfigs();
    this.initMap();
  },
  beforeDestroy() {
    if (this.mapTimer) clearTimeout(this.mapTimer);
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: "mainMap",
        layers: this.baseLayers,
        view: new View({
          ...this.views,
          projection: "EPSG:4326",
          maxZoom: 18,
          minZoom: 5,
          extent: [
            96.93069229487698, 20.104814507140834, 137.82743636345742,
            42.58926069041331,
          ],
        }),
        // 设置地图控件，默认的三个控件都不显示
        controls: defaults({
          attribution: false,
          rotate: false,
          zoom: false,
        }),
      });
      this.initDefaultLayers();
      // 重置底图搭配的行政区划和蒙版样式,异步操作setTimeout
      const timer = setTimeout(() => {
        this.BaseLayerSelect(this.defaultBaseLayer);
        clearTimeout(timer);
      }, 200);
      this.setHoverOverlay(); // 设置鼠标移入popup
      this.setClickOverlay(); // 设置鼠标点击popup
    },
    initDefaultLayers() {
      const promises = this.defaultLayers.map((layer) => layer.layerHandle);
      Promise.all(promises)
        .then((layers) => {
            console.log('layers: ', layers);
          layers.forEach((layer) => this.map.addLayer(layer));
        })
        .catch((error) => {
          console.error("Error loading layers:", error);
        });
    },
    leftBtnClick(val) {
      Object.keys(this.btnConfig).forEach((key) => {
        if (key === val) {
          this.btnConfig[key] = !this.btnConfig[key];
        } else {
          this.btnConfig[key] = false;
        }
      });
      if (val === "zoomReset") {
        this.mapReset();
      }
    },
    // 底图切换
    BaseLayerSelect(layerName) {
      this.setLayerStyle(layerName, "xzqhout"); // 重置行政区划蒙版样式
      this.baseLayers.forEach((item) => {
        const flag = item.get("layerName") === layerName;
        item.setVisible(flag);
        if (flag) this.setLayerStyle(layerName, "xzqh");
      });
      this.mapReset();
    },
    mapReset() {
      this.map.getView().animate({
        ...this.views,
        duration: 1000,
      });
    },
    /**
     * @description: 设置图层样式
     * @param {*layerName} string 底图名称
     * @param {*key} string 要设置样式的图层名称
     */
    setLayerStyle(layerName, key) {
      // 找到layerName图层
      const xzqhLayer = this.map
        .getLayers()
        .getArray()
        .find((ol) => ol.get("layerName") === key);
      // 找到对应configs中的layer配置找到对应的style
      const style = this.defaultLayers.find((item) => item.layerName === key)
        .styles[`${layerName}Style`];
      // 设置style
      if (xzqhLayer) xzqhLayer.setStyle(style);
    },
    mapResize() {
      this.mapTimer = setTimeout(() => {
        this.map.updateSize();
      }, 200);
    },
    setHoverOverlay() {
      const container = document.getElementById("hover-popup");
      this.hoverPopup = new Overlay({
        element: container,
        autoPan: true,
        positioning: "center-left",
        offset: [15, 0],
        stopEvent: true,
        autoPanAnimation: { duration: 250 },
      });
      this.hoverPopup.setPosition(undefined);
      this.map.addOverlay(this.hoverPopup);
    },
    setClickOverlay() {
      const container = document.getElementById("click-popup");
      this.clickPopup = new Overlay({
        element: container,
        autoPan: true,
        positioning: "center-right",
        offset: [-15, 0],
        stopEvent: true,
        autoPanAnimation: { duration: 250 },
      });
      this.clickPopup.setPosition(undefined);
      this.map.addOverlay(this.clickPopup);
    },
    flyTo(stLong, stLat) {
      const view = this.map.getView();
      view.animate({
        center: [stLong, stLat],
        duration: 2000,
        zoom: 12,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.map-layout {
  width: 100%;
  height: 100vh;

  .ol-map {
    width: 100%;
    height: 100%;
  }

  .legend-div {
    position: absolute;
    left: 20px;
    bottom: 10px;
  }
}
</style>
