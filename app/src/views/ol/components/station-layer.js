import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Style, Text, Icon, Circle, Stroke  } from 'ol/style'
import LineString from 'ol/geom/LineString';

const imgsObj = {
  anchor: [0.5, 0.5],
  /*   anchorOrigin: 'top-right',
  anchorXUnits: 'fraction',
  anchorYUnits: 'pixels',
  offsetOrigin: 'top-right', */
  scale: 0.5,
  opacity: 1,
  offsetX: 0
}

const path = '/ss-basin-flood-prevention/img/flood-control-situation/'
const skImg = `${path}sk_3.png` // 水库站
const swImg = `${path}sq_swenz.png` // 水文站
const videoImg = `${path}sk_3.png` // 视频监控站 TODO 图片
const townImg = `${path}sq_swenz.png` // 重点场镇 TODO 图片
const KEYS = {
  1: skImg,// 水库
  2: swImg, // 水文站
  3: skImg, // 水位站
  4: videoImg, // 视频监控站
  5: townImg // 重点场镇
}

export const warnColor = {
  1: 'rgba(242,86,86,0.6)',
  2: 'rgba(255,144,53,0.6)',
  3: 'rgba(255,223,85,0.6)',
  4: 'rgba(2,167,240,0.6)'
}

export const styleFunction = function (feature, resolution) {
  // stType 站点类型
  const stType = feature.get('stType')
  console.log('stType: ', stType);
  const show = resolution < 0.0004
  return new Style({
    image: new Icon({
      ...imgsObj,
      src: KEYS[stType]
    }),
    text: new Text({
      textAlign: 'center',
      font: 'normal 12px sans-serif',
      text: show ? feature.get('name') : '',
      fill: new Fill({
        color: '#242424'
      }),
      offsetX: 0,
      offsetY: 30
    })
  })
}

// 所有站点图层
export const stationConfig = {
  name: '站点',
  layerName: 'station',
  type: 'Vector',
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function (feature, resolution) {
        return styleFunction(feature, resolution)
      },
      layerName: 'station',
      zIndex: 3,
      visible: true
    })
    resolve(vectorLayer)
  })
}

export const dangerousStyleFunction = function (feature, resolution) {
  /**
   * emeType：1-巡险 2-抢险 3-避险
  */
  const emeType = feature.get('emeType')
  const show = resolution < 0.0004

  const Colors = {
    1: 'yellow',
    2: 'orange',
    3: 'red'
  }
  const circlStype = new Circle({
    radius: 4.5, // 圆形半径
    fill: new Fill({
      color: Colors[emeType]  // 填充颜色
    })
  })

  return new Style({
    image: circlStype,
    text: new Text({
      textAlign: 'center',
      font: 'normal 12px sans-serif',
      text: show ? feature.get('name') : '',
      fill: new Fill({
        color: '#242424'
      }),
      offsetX: 0,
      offsetY: 30
    })
  })
}

// 巡线、抢险、避险图层
export const dangerousConfig = {
  name: '站点',
  layerName: 'dangerous',
  type: 'Vector',
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function (feature, resolution) {
        return dangerousStyleFunction(feature, resolution)
      },
      layerName: 'station',
      zIndex: 3,
      visible: true
    })
    resolve(vectorLayer)
  })
}

// 线图层
export const lineConfig = {
  name: '线',
  layerName: 'lineLayer',
  type: 'Vector',
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 2,
        }),
      }),
      layerName: 'lineLayer',
      zIndex: 5,
      visible: true
    })
    resolve(vectorLayer)
  })
}
