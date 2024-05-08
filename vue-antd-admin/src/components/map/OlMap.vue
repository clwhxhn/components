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

import { getImageryLayers } from "./configs/base-imagery"; //底图（卫星/矢量/地形图）
import { getLayerConfigs } from './configs'

export default {
  props: {
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
  },
  data() {
    return {
      map: null,
      baseLayers: [],
      defaultLayers: [],
    };
  },
  async mounted() {
    this.baseLayers = getImageryLayers();
    this.defaultLayers = await getLayerConfigs()
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
      });
      window.map = this.map;
      this.initDefaultLayers()
      this.setMapZoom(); // 监听地图缩放事件
    },
    initDefaultLayers() {
      const promises = this.defaultLayers.map(layer => layer.layerHandle)
      Promise.all(promises)
        .then(layers => {
          layers.forEach(layer => {
            layer.setVisible(true)
            this.map.addLayer(layer)
          })
        })
        .catch(error => {
          console.error('Error loading layers:', error)
        })
    },
    setMapZoom() {
      const { map } = this;
      map.getView().on("change:resolution", (evt) => {
        this.$emit("zoomChange", evt.target.values_);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.map-layout {
  width: 100%;
  height: calc(100vh);
  .ol-map {
    width: 100%;
    height: 100%;
  }
}
</style>