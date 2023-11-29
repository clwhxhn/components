import axios from 'axios'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, Text } from 'ol/style'
import { GeoJSON } from 'ol/format'

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
// 矢量图层样式
const vectorImageryStyle = feature => {
  const colorIndex = feature.get('colorIndex')
  return new Style({
    stroke: new Stroke({
      color: 'rgb(150, 150, 150, 0.6)',
      width: 1
    }),
    fill: new Fill({
      color: `${areaColors[colorIndex]}99`
    }),
    text: new Text({
      text: feature.get('Name'),
      font: '12px sans-serif',
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
const satelliteImageryStyle = feature => {
  return new Style({
    stroke: new Stroke({
      color: '#FFFFFF',
      width: 1,
      lineDash: [10, 20]
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255,0)'
    }),
    text: new Text({
      text: feature.get('Name'),
      font: '12px sans-serif',
      fill: new Fill({
        color: '#FFFFFF'
      }),
      stroke: new Stroke({
        color: '#252525',
        width: 3
      })
    })
  })
}
// 地形图层样式
const terrainImageryStyle = feature => {
  return new Style({
    stroke: new Stroke({
      color: '#666',
      width: 1
      // lineDash: [10, 20]
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255,0)'
    }),
    text: new Text({
      text: feature.get('Name'),
      font: '12px sans-serif',
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
const layerName = 'xzqh'
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
    const data = require('../mockData/xzqh.json') //河流json数据
    // axios
    //   .get(
    //     `${process.env.VUE_APP_NGINX_RESOURCE_URL}/layers/common/xzqh.geojson`
    //   )
    //   .then(response => {
        const vectorSource = new VectorSource({
          features: new GeoJSON()
            .readFeatures(data)
            .map((feature, idx) => {
              /*  为了避免每次地图操作都重新计算要素的颜色
                      在创建图层时，预先计算并设置好每个要素的颜色
                      (每个要素添加一个名为 colorIndex 的属性，
                      用于记录该要素应该使用的颜色索引)
                      然后在 style 函数中直接读取即可。
                  */
              feature.set('colorIndex', idx % areaColors.length)
              return feature
            })
        })
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: function (feature) {
            return vectorImageryStyle(feature)
          },
          layerName,
          zIndex: 2,
          visible: true
        })
        resolve(vectorLayer)
      })
//       .catch(error => {
//         reject(error)
//       })
//   })
}
