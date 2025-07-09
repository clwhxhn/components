<template>
  <div class="one-map-group">
    <SchintaMapGroup>
      <div
        class="one-map-group-mark one-map-group-absolute"
        style="z-index: 2"
      ></div>
      <SchintaMap
        key="schinta-map-group-2"
        v-model="baseLayers"
        class="one-map-group-absolute one-map-group-blur"
        style="z-index: 3"
        :center="center"
        :zoom="zoom"
      >
        <SchintaMapLayerGeo
          name="base"
          :list="list"
          :list-style="blurStyle"
          idKey="ADDVCD"
        ></SchintaMapLayerGeo>
      </SchintaMap>

      <SchintaMap
        key="schinta-map-group-3"
        v-model="baseLayers"
        class="one-map-group-absolute one-map-group-tranform"
        style="z-index: 3"
        :center="center"
        :zoom="zoom"
      >
        <SchintaMapLayerGeo
          name="base"
          :list="list"
          :list-style="tranformListStyle"
          idKey="ADDVCD"
        ></SchintaMapLayerGeo>
      </SchintaMap>

      <SchintaMap
        key="schinta-map-group-4"
        v-model="baseLayers"
        class="one-map-group-absolute"
        style="z-index: 4"
        :center="center"
        :zoom="zoom"
      >
        <SchintaMapLayerGeo
          name="base"
          :list="list"
          :list-style="listStyle"
          idKey="ADDVCD"
        ></SchintaMapLayerGeo>

        <!-- 行政区划 -->
        <schinta-map-layer-tile-image
          name="base"
          :z-index="2"
          :config="baseConfig"
          :url="url"
        >
          <template #widget>
            <SchintaMapLayerWidgetClip
              v-if="list.length"
              :list="list"
            ></SchintaMapLayerWidgetClip>
          </template>
        </schinta-map-layer-tile-image>
      </SchintaMap>

      <SchintaMap
        key="schinta-map-group-5"
        v-model="baseLayers"
        class="one-map-group-absolute"
        style="z-index: 5"
        :center="center"
        :zoom="zoom"
      >
        <SchintaMapLayerGeo
          name="base"
          :z-index="1"
          :list="list"
          :list-style="coverStyle"
          idKey="ADDVCD"
          v-if="regionId === CQ_REGION_ID"
        ></SchintaMapLayerGeo>
      </SchintaMap>

      <div class="one-map-group-absolute" style="z-index: 7">
        <slot />
      </div>
    </SchintaMapGroup>
  </div>
</template>

<script>
import {
  SchintaMapGroup,
  SchintaMap,
  SchintaMapLayerGeo,
  SchintaMapLayerTileImage,
  SchintaMapLayerWidgetClip,
} from "schinta-map";
import Cq_Json from "@/assets/json/chongqing_shi.json";
import Qx_Json from "@/assets/json/chongqing_qu.json";
import { Fill, Stroke } from "ol/style";
import { getBottomLeft, getHeight, getWidth } from "ol/extent.js";
import { toContext } from "ol/render.js";
import { textureBase64 } from "@/assets/base64/cover";
import division from "@/assets/json/division.json";
import { CQ_REGION_ID } from "@/utils/map-helper";
const textureImage = new Image();
textureImage.src = textureBase64;
export default {
  components: {
    SchintaMapGroup,
    SchintaMap,
    SchintaMapLayerGeo,
    SchintaMapLayerTileImage,
    SchintaMapLayerWidgetClip,
  },
  props: {
    center: {
      type: Array,
      default: () => [],
    },
    zoom: {
      type: Number,
      default: 9.6,
    },
    regionId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      CQ_REGION_ID,
      url: "https://hzz.slj.cq.gov.cn/tileservice/imagery/TianAerial/{z}/{x}/{y}",
      baseConfig: {
        projection: "EPSG:3857",
      },
      baseLayers: ["base"],
      config: {
        projection: "EPSG:3857",
      },
      dataMap: {
        [CQ_REGION_ID]: Cq_Json.features,
      },
      listStyle: () => {
        return {
          stroke: {
            color: "#f7d98b",
            width: 4,
          },
        };
      },
      blurStyle: () => {
        return {
          fill: {
            color: "rgba(249, 218, 140,0.8)",
          },
        };
      },
      tranformListStyle: () => {
        return {
          fill: {
            color: "rgba(249, 218, 140,0.3)",
          },
          stroke: {
            color: "#f7d98b",
            width: 1,
          },
        };
      },
      coverStyle: () => {
        return {
          renderer: (pixelCoordinates, state) => {
            const fill = new Fill({
              color: "rgba(0,0,0,0)",
            });
            const stroke = new Stroke({
              color: "rgba(0,0,0,0)",
              width: 0,
            });
            const context = state.context;
            const geometry = state.geometry.clone();
            geometry.setCoordinates(pixelCoordinates);
            const extent = geometry.getExtent();
            const width = getWidth(extent);
            const height = getHeight(extent);
            context.save();
            const renderContext = toContext(context, {
              pixelRatio: 1,
            });
            renderContext.setFillStrokeStyle(fill, stroke);
            renderContext.drawGeometry(geometry);
            context.clip();
            const bottomLeft = getBottomLeft(extent);
            const left = bottomLeft[0];
            const bottom = bottomLeft[1];
            context.drawImage(textureImage, left, bottom, width, height);
            context.restore();
          },
        };
      },
    };
  },
  computed: {
    list() {
      const res = this.regionId
        ? this.dataMap[this.regionId] ||
          this.dataMap[division[this.regionId].addvcd] ||
          []
        : [];
      return res;
    },
  },
  mounted() {
    this.setRegionDataMap();
  },
  methods: {
    setRegionDataMap() {
      Qx_Json.features.forEach((item) => {
        this.dataMap[item.properties.ADDVCD] = [item];
      });
    },
  },
};
</script>

<style lang="less" scoped>
.one-map-group {
  position: relative;
  width: 100%;
  height: 100%;

  &-absolute {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100%;
    height: 100%;
  }

  &-mark {
    background-size: 100% 100%;
    background-image: url("~@/assets/images/layout/bg.png");
    pointer-events: none;
  }

  &-blur {
    filter: blur(14px);
  }

  &-tranform {
    transform: translate3d(0px, 8px, 0px);
  }
}
</style>
