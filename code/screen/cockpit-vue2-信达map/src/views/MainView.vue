<template>
  <div class="main">
    <!-- <MapScaleBox bgc="transparent" :delay="100"> -->
    <MainGroupView :regionId="regionId" :center="center" :zoom="7.5">
      <SchintaMap
        ref="map"
        v-model="layers"
        :center="center"
        :zoom="7.5"
        :controller="controller"
        :loader="loader"
        :zIndexGroup="zIndexGroup"
        @completed="onCompleted"
        :viewConfig="{
          zoomFactor: 1,
          zoom: 0,
        }"
        :is-hover="false"
      >
        <template v-if="isLoader">
          <ParamsWatcher @regionChange="regionChange"></ParamsWatcher>
          <template v-for="(item, key) in layerComponentMap">
            <template v-if="item.children">
              <template v-for="(child, index) in item.children || []">
                <component
                  :is="item.component"
                  :key="index"
                  v-if="isAfter(child.afterName || getAfterName(key))"
                  v-bind="child.bindProps || {}"
                ></component>
              </template>
            </template>
            <template v-else>
              <component
                :is="item.component"
                :key="key"
                v-if="isAfter(item.afterName || getAfterName(key))"
                v-bind="item.bindProps || {}"
              ></component>
            </template>
          </template>

          <MapHeader></MapHeader>
          <MapMenu></MapMenu>
        </template>
      </SchintaMap>
    </MainGroupView>
    <!-- </MapScaleBox> -->
  </div>
</template>

<script>
import { SchintaMap } from "schinta-map";
import { layerComponentMap } from "./layers";
import MapHeader from "./panels/common/MapHeader.vue";
import MapMenu from "./panels/common/MapMenu.vue";
import MapScaleBox from "./components/MapScaleBox.vue";
import MainGroupView from "./MainGroupView.vue";
import { getUserInfo } from "@/utils";
import { MouseWheelZoom } from "ol/interaction";
import ParamsWatcher from "./panels/common/ParamsWatcher.vue";
import { CQ_REGION_ID, MAP_CENTER } from "@/utils/map-helper";

export default {
  components: {
    SchintaMap,
    MainGroupView,
    MapScaleBox,
    MapMenu,
    MapHeader,
    ParamsWatcher,
  },
  data() {
    const baseLayers = ["baseLayer", "riverLayer", "xzLayer", "qxLayer"];
    return {
      regionId: null, // 用于控制MainGroupView
      layerComponentMap,
      layers: [...baseLayers, "projectLayer", "countLayer"],
      // layers: [...baseLayers, "majorEngineeringCountLayer", "majorEngineeringLayer"],
      // layers: [...baseLayers, "reservoirCountLayer", "reservoirLayer"],
      list: [],
      center: MAP_CENTER,
      /**
       * 控制器，map的部分方法委托到该控制器上
       *
       */
      controller: {},
      /**
       * 全局加载参数
       */
      loader: {
        currentMenu: "0",
        regionId: CQ_REGION_ID, // 默认行政区划
        visibleZoom: 11,
        // 是否折叠两侧面板
        collapseSide: false,
        // 是否折叠底部面板（风险管控仓）
        collapseBottom: false,
        // 是否折叠顶部面板
        collapseTop: false,
        // 基础图层
        baseLayers,
        // 项目图层请求参数
        projectLayerQueryParams: {},
        // 前期工作图层请求参数
        preWorkLayerQUeryParams: {
          typ: '10',
          stage: ''
        },
        // 当前选中的规划id
        planId: null,
        // 当前选中的农水项目id
        activeWaterProjectId: null
      },
      /**
       * 图层层级管理
       */
      zIndexGroup: {
        qxLayer: 1,
        xzLayer: 2,
        riverLayer: 3,
        countLayer: 10,
        projectLayer: 11,
        safetyProblemRateLayer: 5,
        qualityProblemRateLayer: 6,
        waterSupplyRateLayer: 7,
        waterUtilizeRateLayer: 8,
        aiAlarmLayer: 12,
        reservoirLayer: 12.1,
        reservoirCountLayer: 12.2,
        waterProjectCountLayer: 12.3,
        waterProjectLayer: 12.4,
        engineeringLayer: 12.5,
        preWorkLayer: 12.6,
        preWorkCountLayer: 12.7,
        majorEngineeringCountLayer: 12.8,
        majorEngineeringLayer: 12.9
      },
      /**
       * 已经加载过的图层,进行图层懒加载，如果图层一次都没出现过，则不渲染图层
       * 加载过的用after标识
       */
      alreadyLoaderLayers: Object.create({}),
      isLoader: false,
    };
  },
  watch: {
    layers: {
      handler(value) {
        value.forEach((it) => {
          this.alreadyLoaderLayers[it] = "after";
        });
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    // fixme 演示需要免登，先屏蔽鉴权相关信息
    // getUserInfo().then((res) => {
    this.$nextTick(() => {
      this.controller.onLoader();
    });
    //   if (!res) {
    //     window.location.href = `${process.env.VUE_APP_LOGIN_URL}`;
    //   }
    // });
  },
  methods: {
    regionChange(regionId) {
      this.regionId = regionId;
    },
    isAfter(key) {
      return this.alreadyLoaderLayers[key] === "after";
    },
    onCompleted() {
      this.$nextTick(() => {
        const mapInstance = this.$refs.map.mapInstance;
        const views = mapInstance.getView();
        views.setMinZoom(5);
        views.setMaxZoom(18);
        mapInstance.addInteraction(
          new MouseWheelZoom({
            // duration: 0, // 禁用动画效果
            zoomDelta: 1, // 设置缩放增量
            constrainResolution: true, // 禁止非整数级别的缩放
            maxDelta: 1, // 设置最大缩放增量
            minDelta: 1, // 设置最小缩放增量
          })
        );
        this.isLoader = true;
      });
    },
    /**
     * @param {string} key
     */
    getAfterName(key) {
      if (key) {
        return key.substring(0, 1).toLowerCase() + key.substring(1);
      }
      return "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;

  // /deep/ .schinta-map-loader {
  //   position: fixed;
  //   transform: scaleX(var(--scaleBoxX)) scaleY(var(--scaleBoxY))
  //     translate(-50%, -50%);
  //   transform-origin: 0 0;
  //   left: 50%;
  //   top: 50%;
  //   z-index: 999;
  //   width: var(--scaleBoxWidth);
  //   height: var(--scaleBoxHeight);
  //   pointer-events: none;

  //   .schinta-map-panel-bottom,
  //   .schinta-map-panel-top {
  //     width: 100% !important;
  //   }

  //   > div {
  //     pointer-events: all;
  //   }
  // }
}
</style>
