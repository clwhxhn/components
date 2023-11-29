import TileLayer from 'ol/layer/Tile'
import { TileImage as TileImageSource, ImageWMS } from 'ol/source'
import ImageLayer from 'ol/layer/Image'

const terrainImagery = {
  layerName: 'terrainImagery',
  url: 'https://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5f5fa58b5efa1d8470ecc079ca1b7c81',
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
  url: 'https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5f5fa58b5efa1d8470ecc079ca1b7c81',
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
  url: 'https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5f5fa58b5efa1d8470ecc079ca1b7c81',
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
