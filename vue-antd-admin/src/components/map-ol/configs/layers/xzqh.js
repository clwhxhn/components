import axios from 'axios'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, Text } from 'ol/style'
import { GeoJSON } from 'ol/format'
import { resolutions } from '../resolution'
const areaColors = [
  '#f6e1ee',
  '#f8ffcb',
  '#d9ffcb',
  '#f6dad9',
  '#bde3f8',
  '#dcf9f7',
  '#c3fdf7',
  '#f5cdde'
]
const layerName = 'xzqh'

// 矢量图层样式
const vectorImageryStyle = (feature, resolution) => {
  const show = resolution <= resolutions[layerName]

  const colorIndex = feature.get('colorIndex')
  return new Style({
    stroke: new Stroke({
      color: show ? '#8b8787' : 'transparent',
      width: 2
    }),
    fill: new Fill({
      color: show ? `${areaColors[colorIndex]}` : 'transparent'
    }),
    text: new Text({
      text: show ? feature.get('Name') : '',
      font: 'bold 14px sans-serif',
      fill: new Fill({
        color: '#252525'
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 3
      })
    })
  })
}
// 卫星图层样式
const satelliteImageryStyle = (feature, resolution) => {
  const show = resolution <= resolutions[layerName]
  return new Style({
    stroke: new Stroke({
      color: show ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
      width: 1, // 边线宽度
      lineDash: [5, 5], // 设置虚线样式，数组内的值分别表示实线长度和空白长度
      lineCap: 'square' // 设置边线末端形状为方形
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255,0)'
    }),
    text: new Text({
      text: show ? feature.get('Name') : '',
      font: '14px bold Calibri,sans-serif',
      fill: new Fill({
        color: '#FFFFFF'
      }),
      overflow: true,
      offsetY: -7,
      textAlign: 'center',
      padding: [3, 3, 0, 3]
    })
  })
}
// 地形图层样式
const terrainImageryStyle = (feature, resolution) => {
  const show = resolution <= resolutions[layerName]
  return new Style({
    stroke: new Stroke({
      color: show ? '#666' : 'transparent',
      width: 2
      // lineDash: [10, 20]
    }),

    text: new Text({
      text: show ? feature.get('Name') : '',
      font: 'bold 14px sans-serif',
      fill: new Fill({
        color: '#252525'
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 3
      })
    })
  })
}
export const config = {
  name: '行政区划',
  layerName,
  type: 'Vector',
  styles: {
    vectorImageryStyle,
    satelliteImageryStyle,
    terrainImageryStyle
  },
  layerHandle: new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.VUE_APP_NGINX_RESOURCE_URL}/layers/common/xzqh.geojson`
      )
      .then(response => {
        const vectorSource = new VectorSource()
        let features = new GeoJSON()
          .readFeatures(response.data)
          .filter(feature => feature.get('Name') == '万州')
          .map((feature, idx) => {
            feature.set('colorIndex', idx % areaColors.length)
            return feature
          })
        features.forEach(feature => {
          feature.set('name', feature.get('Name'))
        })
        vectorSource.addFeatures(features)
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          renderMode: 'image',
          style: function (feature, resolution) {
            return vectorImageryStyle(feature, resolution)
          },
          layerName,
          zIndex: 1,
          visible: false
        })
        resolve(vectorLayer)
      })
      .catch(error => {
        reject(error)
      })
  })
}
