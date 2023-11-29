import axios from 'axios'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style } from 'ol/style'
import { GeoJSON } from 'ol/format'


const vectorImageryStyle = () => {
    return new Style({
        stroke: new Stroke({
            color: 'rgba(77, 166, 255, 1)', // 设置边界颜色
            width: 0.5 // 设置边界宽度
        }),
        fill: new Fill({
            color: 'rgba(0, 132, 240, 0.30)' // 设置面颜色
        })
    })
}

const layerName = 'river'

export const config = {
    name: '河流',
    layerName,
    type: 'Vector',
    styles: {},
    layerHandle: new Promise((resolve, reject) => {
        const data = require('../mockData/river.json') //河流json数据
        // axios
        //     .get(
        //         `${process.env.VUE_APP_NGINX_RESOURCE_URL}/layers/common/river.geojson`
        //     )
        //     .then(response => {
                const vectorSource = new VectorSource({
                    features: new GeoJSON().readFeatures(data)
                })
                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                    style: function () {
                        return vectorImageryStyle()
                    },
                    layerName,
                    zIndex: 3,
                    visible: true
                })
                resolve(vectorLayer)
            // })
            // .catch(error => {
            //     reject(error)
            // })
    })
}
