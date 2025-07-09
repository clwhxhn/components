<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
    <ComplexPoi ref="complexPoi" />
  </a-config-provider>
</template>
<script setup lang="ts">
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $img: (path: string) => string
    $httpImg: (path: string) => string
  }
}
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { ref, provide } from 'vue'
import ComplexPoi from '@/components/HtmlToCanvas.vue'
import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()

dayjs.locale('zh-cn')

const complexPoi = ref()
provide('complexPoi', complexPoi)

// 打印视角按钮-仅测试
document.addEventListener('keyup', e => {
    // eslint-disable-next-line
    if (e.key === '1') {
        getViewPoint()
    }

    if(e.key === '2') {
        swdt.fire('executeBPCustomEvents', {
            bpClass: 'BP_CustomEvents',
            command: 'Custom_openGateByTag',
            param: JSON.stringify({
                tag: 'MainDam_Gate03',
            })
        })
    }

    if(e.key === 'Control') {
      swdt.fire('changeDefaultPawn');
    }
})

function getViewPoint() {
    function format(json) {
        var obj = {
            coordinate: {
                x: 0,
                y: 0,
                z: 0
            },
            location: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                roll: 0,
                pitch: 0,
                yaw: 0
            }
        }
        obj.coordinate.x = parseFloat(json.lon)
        obj.coordinate.y = parseFloat(json.lat)
        obj.coordinate.z = parseFloat(json.height)
        obj.location.x = parseFloat(json.x)
        obj.location.y = parseFloat(json.y)
        obj.location.z = parseFloat(json.z)
        obj.rotation.roll = json.roll
        obj.rotation.pitch = json.pitch
        obj.rotation.yaw = json.yaw

        obj.flyParams = {
            coords: [
                parseFloat(json.lon),
                parseFloat(json.lat),
                parseFloat(json.height)
            ],
            heading: json.yaw,
            pitch: json.pitch
        }
        return obj
    }

    function callback(data) {
        if (typeof data === 'string') {
            // alert(data);
            const json = JSON.parse(data)
            // eslint-disable-next-line
            console.log(format(json))
        }
    }
    swdt.fire('getViewPoint', callback)
}

// 全局监听poi点击事件
ue.interface._onPOIClickCallback = data => {
    // vuex储存响应点击的layerId
    const json = JSON.parse(data)
    mapStore.setClickedLayer(json.data)
}
</script>
<style lang="less" scoped></style>
