<template>
  <div class="map-layout">
    <div id="mainMap" class="ol-map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { defaults } from "ol/control";
import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import Fill from "ol/style/Fill";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";

import { getImageryLayers } from "./configs/base-imagery";
import { getLayerConfigs } from "./configs";

export default {
  name: "OlMap",
  props: {
    pinnedPopupSlot: {
      type: Boolean,
      default: false,
    },
    legendSlot: {
      type: Boolean,
      default: false,
    },
    layerSlot: {
      type: Boolean,
      default: false,
    },
    // 默认底图
    defaultBaseLayer: {
      type: String,
      default: "satelliteImagery",
    },
    // 地图视图
    mapViews: {
      type: Object,
      default: () => {
        return {
          center: [108.4690738595931, 30.67002728391455],
          zoom: 10.3,
        };
      },
    },
    // 隐藏图层
    hideLayers: {
      type: Array,
      default: () => ["xzqhmdxout"],
    },
    // 地图控制按钮显示位置
    mapBtnsLocation: {
      type: String,
      default: "right",
    },
    // 不展示的地图控制按钮
    hideBtns: {
      type: String,
      default: "layerSwitch",
    },
    // 右侧面板的宽度+padding
    rightPanelWidth: {
      type: Number,
      default: 10,
    },
    // 图例的摆放位置
    position: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      map: null,
      baseLayers: [], // 基础图层
      defaultLayers: [], // 默认显示图层
      btnConfig: {
        magerySwitch: false, // 底图显隐
        layerSwitch: false, // 图层显隐
        legend: true, // 图例
      },
      hoverPopup: null, // 鼠标移入popup
      clickPopup: null, // 点击popup
    };
  },
  watch: {
    mapViews() {
      this.mapReset();
    },
  },
  async mounted() {
    this.baseLayers = getImageryLayers();
    this.defaultLayers = await getLayerConfigs();
    console.log(' this.defaultLayers: ',  this.defaultLayers);
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: "mainMap",
        layers: this.baseLayers,
        view: new View({
          ...this.mapViews,
          projection: "EPSG:4326",
          maxZoom: 18,
          minZoom: 5,
          // enableRotation: false,
          // animate: false,
          pixelRatio: window.devicePixelRatio, // 使用设备像素比
          // extent: [
          //   96.93069229487698, 20.104814507140834, 137.82743636345742,
          //   42.58926069041331
          // ]
        }),
        // 设置地图控件，默认的三个控件都不显示
        controls: defaults({
          attribution: false,
          rotate: false,
          zoom: false,
        }),
      });
      window.map = this.map;
      this.initDefaultLayers();
      //   const { tipLayer, highlightLayer } = mouseIns
      //   this.map.addLayer(tipLayer) // 添加名称标识图层
      //   this.map.addLayer(highlightLayer) // 添加高亮图层
      //   this.mapPointerMove() // 监听鼠标移动事件
      //   this.setHoverOverlay() // 设置鼠标移入popup
      //   this.setClickOverlay() // 设置鼠标点击popup
      //   this.setMapZoom() // 监听地图缩放事件
      //   this.$emit('mapInitSuccess') // map实例化完成
    },
    mapReset(views) {
      const newViews = views || this.mapViews;
      if (this.map)
        this.map.getView().animate({
          ...newViews,
          duration: 1000,
        });
    },
    initDefaultLayers() {
      const promises = this.defaultLayers.map((layer) => layer.layerHandle);
      Promise.all(promises)
        .then((layers) => {
          console.log("layers: ", layers);
          layers.forEach((layer) => {
            layer.setVisible(true);
            this.map.addLayer(layer);
          });
          this.BaseLayerSelect(this.defaultBaseLayer);
        })
        .catch((error) => {
          console.error("Error loading layers:", error);
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
    // 底图切换
    BaseLayerSelect(layerName) {
      this.$emit("baseLayerSelect", layerName);
      this.setLayerStyle(
        layerName,
        this.isXzqhHasMdx ? "xzqhmdxout" : "xzqhout"
      ); // 重置行政区划蒙版样式
      this.baseLayers.forEach((item) => {
        const flag = item.get("layerName") === layerName;
        item.setVisible(flag);
        if (flag) this.setLayerStyle(layerName, "xzqh");
      });
      this.mapReset();
      // 隐藏图层
      if (this.hideLayers.length > 0) {
        this.hideLayers.forEach((item) => {
          const layer = this.map
            .getLayers()
            .getArray()
            .find((ol) => ol.get("layerName") === item);
          layer.setVisible(false);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.map-layout {
  width: 100%;
  height: 100%;
  .ol-map {
    width: 100%;
    height: 100%;
  }
}
</style>