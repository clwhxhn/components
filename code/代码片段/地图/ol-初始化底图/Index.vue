<template>
    <div class="main-map" id="olMap" ref="mapRef">
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import * as ol from 'ol';
import 'ol/ol.css'; // 导入OpenLayers样式
// import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import { Map } from 'ol';


const mapRef = ref()
const map = ref()
const TK = '8ebdf0e8b6d6e546dc9e1b255f946127' // 公司企业版key

function initMap() {
    // 1088bb8aed4db9dd711f68db3e18a466
    const tianDiTuLayer = new TileLayer({
        source: new XYZ({
            // url: 'https://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=924398118dffa8d76d5321f9dae623b5',
            url: `http://t{1-4}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${TK}`, // 卫星图
            // url: 'http://t{1-4}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=1088bb8aed4db9dd711f68db3e18a466', // 矢量图层(街道)
            // url: 'http://t{1-4}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=1088bb8aed4db9dd711f68db3e18a466' // 地形图
        }),
    });

    // 创建地图实例
    map.value = new Map({
        target: mapRef.value,
        layers: [
            tianDiTuLayer
        ],
        view: new View({
            projection: 'EPSG:4326',
            center: [110.90, 32.58],
            zoom: 12,
            pixelRatio: window.devicePixelRatio // 使用设备像素比
        }),
    });

}

onMounted(() => {
    initMap()
})

</script>

<style scoped lang="less">
.main-map {
    height: 100%;
}
</style>