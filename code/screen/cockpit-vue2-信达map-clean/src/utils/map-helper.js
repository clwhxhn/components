import Vue from "vue";
import division from "@/assets/json/division.json";

/**
 * 重庆市本级regionId
 */
export const CQ_REGION_ID = "534996";

export const MAP_CENTER = [107.61, 30.57];

function check(key) {
  if (process.env.NODE_ENV !== "development") return;
  if (!("mapParamsValue$" in this)) {
    console.error(
      "实例中不存在mapParamsValue$属性，请检查是否引入了【SchintaMapHelp】mixin"
    );
  }
  if (!(key in this.mapParamsValue$)) {
    console.error(
      `mapParamsValue$中不存在【${key}】属性，请在MainView.vue组件的loader对象中定义【${key}】属性的初始值，并添加相关注释说明`
    );
  }
}

/**
 * 针对MainView.loader中的数据创建计算函数
 * @param {*} key
 * @param {*} withSetter
 * @returns
 */
export function paramsGetter(key, withSetter = false) {
  if (withSetter) {
    return {
      get() {
        check.call(this, key);
        return this.mapParamsValue$[key];
      },
      set(val) {
        check.call(this, key);
        this.setValues$({
          [key]: val,
        });
      },
    };
  }
  return function () {
    check.call(this, key);
    return this.mapParamsValue$[key];
  };
}

/**
 * 针对MainView.loader中的数据创建计算函数，用法类似vuex中的mapGetter
 * @param {*} key
 * @param {*} withSetter
 * @returns
 */
export function paramsGetters(keys, withSetter = false) {
  return keys.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: paramsGetter(cur, withSetter),
    };
  }, {});
}

/**
 * 重置图层，并且移除overlay 弹窗， 重新设置图例
 * @param {*} layers
 */
Vue.prototype.$setCurLayers = function resetLayers(layers, reset = false) {
  // 检查是否引入了SchintaMapHelp
  if (process.env.NODE_ENV == "development" && !this.resetLayers$) {
    console.error(
      "实例中不存在resetLayers$方法，请检查是否引入了【SchintaMapHelp】mixin"
    );
  }
  if (!Array.isArray(layers)) layers = [layers];

  this.setValues$({ planId: null });

  if (reset) {
    // 重置区划为重庆市本级
    this.setValues$({ regionId: CQ_REGION_ID });
    const zoom = 7.5;
    const padding = [250, 650, 350, 600];
    this.flyTo$(MAP_CENTER, {
      duration: 300,
      maxZoom: zoom,
      minZoom: zoom,
      padding,
    });
  } else if (this.mapParamsValue$.regionId === CQ_REGION_ID) {
    const zoom = 7.5;
    const padding = [250, 650, 350, 600];
    this.flyTo$(MAP_CENTER, {
      duration: 300,
      maxZoom: zoom,
      minZoom: zoom,
      padding,
    });
  }
  // 重置overlay
  this.getOverlayController$().clearOverlayGroup();
  this.resetLayers$([...this.mapParamsValue$.baseLayers, ...layers]);
};

/**
 * 地图到某个区域
 * @param {*} regionId 区域ID，不传时默认从mapParamsValue$中取
 */
Vue.prototype.$flyToRegion = function flyToRegion(regionId) {
  // 检查是否引入了SchintaMapHelp
  if (process.env.NODE_ENV == "development" && !this.resetLayers$) {
    console.error(
      "实例中不存在resetLayers$方法，请检查是否引入了【SchintaMapHelp】mixin"
    );
  }
  if (!regionId) {
    regionId = this.mapParamsValue$.regionId;
  }
  this.getOverlayController$().clearOverlayGroup();

  if (regionId === CQ_REGION_ID) {
    const zoom = 7.5;
    const padding = [250, 650, 350, 600];
    this.flyTo$(MAP_CENTER, {
      duration: 300,
      maxZoom: zoom,
      minZoom: zoom,
      padding,
    });
    return;
  }
  if (division[regionId]) {
    const padding = [300, 650, 200, 650];
    const { extent } = division[regionId];
    this.flyTo$([extent], {
      padding: padding,
    });
  } else if (regionId !== CQ_REGION_ID && regionId !== "534995") {
    this.$message.info("未找到行政区划范围");
  }
};

Vue.prototype.$onGlobalRegionChange = function onGlobalRegionChange(
  callback,
  options = {}
) {
  // 检查是否引入了SchintaMapHelp
  if (process.env.NODE_ENV == "development" && !this.resetLayers$) {
    console.error(
      "实例中不存在resetLayers$方法，请检查是否引入了【SchintaMapHelp】mixin"
    );
  }
  const unwatch = this.$watch(
    () => this.mapParamsValue$.regionId,
    (newVal, oldVal) => {
      callback(newVal, oldVal);
    },
    {
      immediate: true,
      ...options,
    }
  );
  this.$on("hook:beforeDestroy", unwatch);
};

const addvcdMap = {};
Object.values(division).forEach((it) => {
  addvcdMap[it.addvcd] = it;
});
export function getRegionIdByAd(addvcd) {
  const item = addvcdMap[addvcd];
  return item ? item.regionId : null;
}
