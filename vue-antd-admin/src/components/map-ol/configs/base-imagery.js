// --eslint-disable-next-line import/no-extraneous-dependencies
import TileLayer from "ol/layer/Tile";
// --eslint-disable-next-line import/no-extraneous-dependencies
import { TileImage as TileImageSource } from "ol/source";
import XYZ from "ol/source/XYZ";

const terrainImagery = {
  layerName: "terrainImagery",
  url:
    "https://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5f5fa58b5efa1d8470ecc079ca1b7c81",
  serviceType: "xyz",
  opacity: 1,
  minimumLevel: 1,
  maximumLevel: 23,
  title: "地形图",
  visible: false,
  zIndex: 1,
};

const satelliteImagery = {
  layerName: "satelliteImagery",
  // url: `http://10.6.181.245:20046/layers/map/{z}/{x}/{-y}.png`,
  url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}", //图层瓦片的URL模板
  serviceType: "xyz",
  opacity: 1,
  minimumLevel: 1,
  maximumLevel: 23,
  visible: true,
  title: "卫星图",
  zIndex: 1,
};

const vectorImagery = {
  layerName: "vectorImagery",
    url:"http://t0.tianditu.gov.cn/vec_c/wmts?tk=924398118dffa8d76d5321f9dae623b5&layer=vec&STYLE=default&TILEMATRIXSET=c&SERVICE=WMTS&REQUEST=GetTile&Version=1.0.0&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}",
    // url: "http://10.6.181.245:19002/geoserver/osm/gwc/service/wmts?layer=osm:osm&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png8&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}",
    // url: 'https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5f5fa58b5efa1d8470ecc079ca1b7c81',
  params: {
    LAYERS: "aqzhsl_slgc:wdd_region",
    STYLES: "aqzhsl_slgc:wdd_district_web",
    FORMAT: "image/png",
    RANDOM: 1082999688,
    EXCEPTIONS: "application/vnd.ogc.se_inimage",
  },
  serverType: "geoserver",
  ratio: 1,
  visible: false,
  title: "矢量图",
  zIndex: 1,
};

const createImageryTileLayer = (options) => {
  return new TileLayer({
    source: new TileImageSource({
      projection: options.projection || "EPSG:3857",
      url: options.url,
    }),
    layerName: options.layerName,
    extent: options.extent,
    zIndex: options.zIndex || 1,
    opacity: options.opacity || 1,
    visible: options.visible,
  });
};
const createTileLayerXYZ = (options) => {
  return new TileLayer({
    source: new XYZ({
      projection: options.projection || "EPSG:3857",
      url: options.url,
      maxZoom: 18,
      tileSize: 256,
    }),
    layerName: options.layerName,
    extent: options.extent,
    zIndex: options.zIndex || 1,
    opacity: options.opacity || 1,
    visible: options.visible,
  });
};

export const getImageryLayers = () => {
  return [
    createImageryTileLayer(terrainImagery),
    createTileLayerXYZ(satelliteImagery),
    createImageryTileLayer(vectorImagery),
  ];
};
