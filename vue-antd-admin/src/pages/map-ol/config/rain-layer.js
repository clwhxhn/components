import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Circle, Style, Text } from 'ol/style'
import {
  colors,
  rainfallGrade1,
  rainfallGrade24
} from './config'

const rainStyle24 = (feature, resolution, rainfallGrade) => {
  let textRain = feature.get('sumDrp') > 0 ? feature.get('sumDrp') + '' : ''
  let color = '#fff'
  const newList = JSON.parse(JSON.stringify(rainfallGrade || rainfallGrade24)).filter(item => item.color !== 'transparent')
  newList.forEach((item, index) => {
    if (
      feature.get('sumDrp') >= item.minVal &&
      feature.get('sumDrp') < item.maxVal
    ) {
      color = colors[index]
    }
  })
  const style = new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: 'red'
      }),
      stroke: new Stroke({
        color: '#333',
        width: 0.5
      })
    }),
    text: new Text({
      textAlign: 'center',
      font: 'normal 12px sans-serif',
      text: textRain,
      fill: new Fill({
        color: 'rgba(255, 0, 0, 1)'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      }),
      offsetX: 0,
      offsetY: -15
    })
  })
  const show = resolution < 0.0004
  const textStyle = new Style({
    text: new Text({
      textAlign: 'center',
      font: 'normal 12px sans-serif',
      text: '111', // show ? feature.get('name') : '',
      fill: new Fill({
        color: '#333'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      }),
      offsetX: 0,
      offsetY: 20
    })
  })

  return [style, textStyle]
}
const rainStyle1 = (feature, resolution) => {
  return rainStyle24(feature, resolution, rainfallGrade1)
}
const layerName = 'rain'
export const rainConfig = {
  name: '雨情',
  layerName,
  type: 'Vector',
  styles: {
    rainStyle1,
  },
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function (feature, resolution) {
        return rainStyle24(feature, resolution)
      },
      layerName,
      zIndex: 10,
      visible: true
    })
    resolve(vectorLayer)
  })
}
// 雨情预警图层
export const rainWarnConfig = {
  name: '雨情预警',
  layerName: 'rainWarn',
  type: 'Vector',
  styles: {
    rainStyle1,
    rainStyle24
  },
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function (feature, resolution) {
        return rainStyle24(feature, resolution)
      },
      layerName: 'rainWarn',
      zIndex: 10,
      visible: true
    })
    resolve(vectorLayer)
  })
}

// 等值面样式
const isosurfaceStyle24 = (feature, resolution, rainfallGrade) => {
  let color = colors[6]
  const newList = JSON.parse(JSON.stringify(rainfallGrade || rainfallGrade24)).filter(item => item.color !== 'transparent')
  const isSame = feature.get('lvalue') === feature.get('hvalue')
  newList.forEach((item, index) => {
    if (
      isSame &&
      feature.get('lvalue') >= item.minVal &&
      feature.get('hvalue') < item.maxVal
    ) {
      color = colors[index]
    } else if (
      !isSame &&
      feature.get('lvalue') >= item.minVal &&
      feature.get('hvalue') <= item.maxVal
    ) {
      color = colors[index]
    }
  })
  return new Style({
    fill: new Fill({
      color: color
    })
  })
}
const isosurfaceStyle1 = (feature, resolution) => {
  return isosurfaceStyle24(feature, resolution, rainfallGrade1)
}

// 等值面图层
export const isosurfaceConfig = {
  name: '雨情等值面',
  layerName: 'isosurface',
  type: 'Vector',
  styles: {
    isosurfaceStyle1,
  },
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function (feature, resolution) {
        return isosurfaceStyle24(feature, resolution)
      },
      layerName: 'isosurface',
      zIndex: 4,
      opacity: 0.45,
      visible: false
    })
    resolve(vectorLayer)
  })
}
// 高亮图层
export const highlightConfig = {
  name: '高亮图层',
  layerName: 'highlight',
  type: 'Vector',
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function () {
        return new Style({
          stroke: new Stroke({
            color: '#FFD66A ',
            width: 5
          }),
          fill: new Fill({
            color: 'rgba(137, 100, 0, 0.26)'
          })
        })
      },
      layerName: 'highlight',
      zIndex: 6,
      visible: false
    })
    resolve(vectorLayer)
  })
}
