<template>
  <div class="map-wrap">
    <OlMap
      ref="olMapRef"
      :map-views="rightMapViews"
      :legend-slot="true"
      :hide-layers="['xzqhmdxout', 'river-basin']"
      :position="rightComponentWidth + 15"
      @mapInitSuccess="mapInitSuccess"
    >
      <RainHoverPopup slot="hover-popup" :properties="properties" />
      <RainClickPopup
        slot="click-popup"
        :properties="clickProperties"
        @close="popupClose"
      />
    </OlMap>
  </div>
</template>

<script>
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { Fill, Style, Circle, Stroke } from "ol/style";
import { GeoJSON } from "ol/format";
import OlMap from "@/components/map-ol/OlMap";
import { MapMixin } from "./mixins/map-mixin";
import { rainConfig, rainWarnConfig } from "./config/rain-layer";
import RainClickPopup from './components/RainClickPopup.vue'
import RainHoverPopup from './components/RainHoverPopup.vue'

export default {
  components: {
    OlMap,
    RainClickPopup,
    RainHoverPopup
  },
  mixins: [MapMixin],
  data() {
    return {
      isosurfaceLayer: null, // 等值面图层
      isosurface: false, // 是否显示等值面
      rightComponentWidth: 450,
      state: "show",
    };
  },
  created() {},
  methods: {
    mapInitSuccess() {
      this.getData();
      // 创建普通点位layer
      this.createLayer("rain", "rainLayer", rainConfig); // 创建雨情基础图层-mixin
      // 创建预警点位layer
      this.createLayer("warning", "warningLayer", rainWarnConfig); // 创建预警基础图层-mixin
    },
    getData() {
      this.dataSource = [
        {
          stLong: 108.4690738595931,
          stLat: 30.67002728391455,
        },
      ];
      this.warnDataSource = [
        {
          stLong: 108.4990738595931,
          stLat: 30.67002728391455,
        },
      ];
    },
    // 渲染雨情点位
    renderMapPoint(layer) {
      const source = this[layer].getSource();
      if (source) {
        source.clear();
      }
      const data =
        layer === "warningLayer" ? this.warnDataSource : this.dataSource;
      const config = rainConfig;
      const features = data.map((item) => {
        let feature = new Feature({
          geometry: new Point([item.stLong, item.stLat]),
          layerFlag: "point",
        });
        feature.setProperties(item);
        return feature;
      });
      source.addFeatures(features);
      this[layer].setStyle(config.styles[`rainStyle1`]);
      if (this.timer) cancelAnimationFrame(this.timer);
      // 雨情去掉预警动画2023-12-22
      if (layer === "warningLayer") this.warnAnimation(6); // mixin
      this.setPointHover(); // 设置鼠标移入高亮(MapMixin)
      this.setPointClick(); // 设置地图点击事件(MapMixin)
    },
    // 预警动画样式
    animationStyle(feature, resolution, radius) {
      const style = rainWarnConfig.styles[`rainStyle1`](feature, resolution);
      // 设置预警新样式
      const newStyle = new Style({
        image: new Circle({
          radius: radius,
          stroke: new Stroke({
            color: "rgba(255,223,85,0.8)",
            width: 2,
          }),
          fill: new Fill({
            color: "rgba(255,223,85,0.8)",
          }),
        }),
      });
      return [newStyle, ...style];
    },
  },
};
</script>

<style lang="less" scoped>
.map-wrap {
  height: calc(100vh - 90px);
}
</style>