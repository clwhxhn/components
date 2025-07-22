/*
 * @Author: wangxiaohui clwhxhn@163.com
 * @Date: 2024-07-16 10:02:54
 * @LastEditors: wangxiaohui clwhxhn@163.com
 * @LastEditTime: 2025-07-17 17:17:55
 * @FilePath: \app\src\components\map\configs\base-imagery.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import TileLayer from 'ol/layer/Tile'
import { TileImage as TileImageSource, ImageWMS } from 'ol/source'
import ImageLayer from 'ol/layer/Image'

const terrainImagery = {
  layerName: 'terrainImagery',
  url: 'https://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=924398118dffa8d76d5321f9dae623b5',
  serviceType: 'xyz',
  opacity: 1,
  minimumLevel: 1,
  maximumLevel: 23,
  title: '地形图',
  visible: false,
  zIndex: 1
}

const satelliteImagery = {
  layerName: 'satelliteImagery',
  url: 'https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=924398118dffa8d76d5321f9dae623b5',
  serviceType: 'xyz',
  opacity: 1,
  minimumLevel: 1,
  maximumLevel: 23,
  visible: false,
  title: '卫星图',
  zIndex: 1
}

const vectorImagery = {
  layerName: 'vectorImagery',
  url: 'https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=924398118dffa8d76d5321f9dae623b5',
  serviceType: 'xyz',
  opacity: 1,
  minimumLevel: 1,
  maximumLevel: 23,
  visible: false,
  title: '矢量图',
  zIndex: 1
}

const createImageryTileLayer = options => {
  return new TileLayer({
    source: new TileImageSource({
      projection: options.projection || 'EPSG:3857',
      url: options.url
    }),
    layerName: options.layerName,
    extent: options.extent,
    zIndex: options.zIndex || 1,
    opacity: options.opacity || 1,
    visible: options.visible
  })
}

const crtImageWMSBygeoserver = options => {
  return new ImageLayer({
    source: new ImageWMS({
      url: options.url,
      params: options.params,
      serverType: options.serverType || 'geoserver',
      ratio: options.ratio || 1
    }),
    layerName: options.layerName,
    visible: options.visible,
    zIndex: options.zIndex
  })
}

export const getImageryLayers = () => {
  return [
    createImageryTileLayer(terrainImagery),
    createImageryTileLayer(satelliteImagery),
    createImageryTileLayer(vectorImagery)
  ]
}
