import { formatNumber } from "@/utils/number-helper";
import Vue from "vue";



declare module "vue/types/vue" {
  interface Vue {
    $fn: typeof formatNumber
    /**
     * 重置图层，并且移除overlay 弹窗， 重新设置图例（函数实现在map-helper.js文件中）
     * @param layers 重置后的图层
     * @returns 
     */
    $setCurLayers: (layers: string[]) => void

    /**
     * 地图到某个区域（函数实现在map-helper.js文件中）
     * @param {*} regionId 区域ID，不传时默认从mapParamsValue$中取
     */
    $flyToRegion: (regionId: string) => void

    /**
     * 监听全局区域改变（默认函数会立即执行）
     * @param cb 
     * @param opts 
     * @returns 
     */
    $onGlobalRegionChange: (cb: Function, opts: any) => void
  }
}
