
export const addIconPoi = option => {
    const iconUrl = option.icon.url
    if (iconUrl.indexOf('data:image/png;base64') > -1) {
        delete option.icon.url
        option.icon.base64 = iconUrl.substr(iconUrl.indexOf(',') + 1)
    }
    swdt.fire('addIconPOI', option)
}

export const removePOIByLayerID = layerID => {
    swdt.fire('removePOIByLayerID', {
        layerID
    })
}

export const addTextPoi = (option) => {
    swdt.fire('addTextPOI', option);
}

// export const initScene = () => {
//     riverJson.features.forEach((feature, index) => {
//         const coords = []
//         feature.geometry.coordinates[0].forEach(e => {
//             coords.push(e[0])
//             coords.push(e[1])
//             coords.push(10)
//         })
//         const option = {
//             layerID: `river_${index}`,
//             isVisable: true, // 可缺省，默认true
//             coords,
//             color: [6, 45, 221, 0.5], // rgba(0-255,0-255,0-255,0-1)
//             sortOrder: 1, // 可缺省，默认0，图层叠加顺序，越大越靠顶层
//             effectX: 10000.0, // 可缺省，默认10000.0，响应区域高度比例
//             offsetLocation: [0.0, 0.0, 0.0], // 可缺省，默认值为[0.0,0.0,0.0],中心位置偏移
//             // offsetCoord:[0.0,0.0,0.0],// 可缺省，默认值为[0.0,0.0,0.0],中心位置偏移
//             rotation: [0, 0, 0], // 可缺省，默认值为[0.0,0.0,0.0],Y轴、Z轴、X轴
//             scale: 1 // 可缺省，默认值为1.0，缩放比例
//         }
//         window.swdt.fire('addGroundPolygon', option)
//     })
// }

export const getCenter = pointArray => {
    const sortedLongitudeArray = pointArray.map(item => item[0]).sort() //  首先对经度进行排序，红色部分是array中经度的名称
    const sortedLatitudeArray = pointArray.map(item => item[1]).sort() // 对纬度进行排序，红色部分是array中纬度的名称
    const centerLongitude = (
        (parseFloat(sortedLongitudeArray[0]) +
            parseFloat(sortedLongitudeArray[sortedLongitudeArray.length - 1])) /
        2
    ).toFixed(4)
    const centerLatitude = (
        (parseFloat(sortedLatitudeArray[0]) +
            parseFloat(sortedLatitudeArray[sortedLatitudeArray.length - 1])) /
        2
    ).toFixed(4)
    return [centerLongitude, centerLatitude]
}

export const flyToGeneralView = (coords) => {
    const view = {
        coords: [
            parseFloat(coords[0]) - 0.00667,
            parseFloat(coords[1]) + 0.006,
            coords[2] + 600
        ],
        heading: 44.5727,
        pitch: -29.3947
    }

    swdt.fire('flyToPoint', {
        ...view,
        duration: 1
    })

    // removePOIByLayerID('pointPanel')
    // swdt.fire('removeGroundPolylineByLayerID', { layerID: 'trackLine' });
    // removePOIByLayerID('trackLinePoints')
}

export const flyToGeneralViewHigher = (coords) => {
    const view = {
        coords: [
            parseFloat(coords[0]) - 0.01967,
            parseFloat(coords[1]) + 0.02,
            coords[2] + 1500
        ],
        heading: 44.5727,
        pitch: -29.3947
    }

    swdt.fire('flyToPoint', {
        ...view,
        duration: 1
    })

    // removePOIByLayerID('pointPanel')
    // swdt.fire('removeGroundPolylineByLayerID', { layerID: 'trackLine' });
    // removePOIByLayerID('trackLinePoints')
}

export const flyToRiverGeneralView = (coords) => {
    const view = {
        coords: [
            parseFloat(coords[0]),
            parseFloat(coords[1]),
            coords[2] + 30000
        ],
        // heading: 44.5727,
        // pitch: -29.3947
        heading: -111.364,
        pitch: -86.3388
    }

    swdt.fire('flyToPoint', {
        ...view,
        duration: 1
    })

    // removePOIByLayerID('pointPanel')
    // swdt.fire('removeGroundPolylineByLayerID', { layerID: 'trackLine' });
    // removePOIByLayerID('trackLinePoints')
}

export const setHubView = () => {
    const option = {
        duration: 3.0,
        coords: [113.904182, 29.657303, 2279.66],
        heading: -114.393,
        pitch: -38.7023
    }
    swdt.fire('flyToPoint', option)
}

export const setGlobalView = () => {
    const option = {
        duration: 3.0,
        coords: [114.068321, 28.902996, 91729.63],
        heading: -94.1844,
        pitch: -57.0478
    }
    swdt.fire('flyToPoint', option)
}


