<template>
    <div class="html2canvas-container" v-html="htmlTemplate" />
</template>

<script>
import html2Canvas from 'html2canvas'
import { cloneDeep } from 'lodash-es'
// import moment from 'moment'

// const manageStationImg = new URL(
//     '@/assets/images/projectManagement/bg-station.png',
//     import.meta.url
// ).href

export default {
    name: 'HtmlToCanvas',
    components: {},
    data() {
        return {
            htmlTemplate: '',
            poiData: {},
            cacheBase64: {},
            base64List: []
        }
    },
    computed: {},
    // created() {},
    // mounted() {},
    methods: {
        createTemplate(item) {
            const type = item.type
            switch (type) {
                // 管理站信息面板标签
                // case 'manageStation':
                //     return `<div class="manageStation-wrap ${type}${item.id}">
                //         <img src="${manageStationImg}" alt="" />
                //         <div class="content">
                //             <div class="title">${item.name}</div>
                //             <div class="details">
                //                 <div class="post">桩号：${item.data.postRange}</div>
                //                 <div>管辖范围：<span>${item.data.area}</span></div>
                //                 <div>责任部门：<span>${item.data.managementUnit}</span></div>
                //                 <div>人员配置：<span></span></div>
                //             </div>
                //         </div>
                //     </div>`

                case 'warning-panel':
                    return `
                    <div class="warning-panel  ${type}${item.id}">
                      <span class="gate-name">${item.data.gateName}</span>
                      <span class="warning-time">${item.data.lastTime}</span>
                      <div style="display: flex">
                        <div class="icon">&nbsp;</div>
                        <span class="warning-content">${item.data.warnTypeStr}</span>
                      </div>
                    </div>`
                default:
                    break
            }
            return ''
        },

        addComplexPoi(data) {
            this.base64List = []
            //  暂存需要更新的数据
            this.poiData = cloneDeep(data).filter(item => !item.static)

            this.htmlTemplate = ''
            data.forEach(item => {
                this.htmlTemplate += this.createTemplate(item)
            })

            this.$nextTick(() => {
                data.forEach(item => {
                    const anchor = item.anchor ? item.anchor : 'center'
                    const scaleByDistance = item.scaleByDistance
                        ? item.scaleByDistance
                        : [500.0, 0.5, 2000.0, 0.25]
                    const poiType = item.poiType || 'screen'

                    //  静态图片直接从缓存里面取，不重新生成
                    if (this.cacheBase64[item.id]) {
                        this.addIconPOI({
                            ...item,
                            layerId: item.type,
                            base64: this.cacheBase64[item.id].split(',')[1],
                            anchor: poiType === 'screen' ? anchor : [0.5, 0.5],
                            type: poiType,
                            scaleByDistance
                        })
                    } else {
                        const dom = document.querySelector(
                            `.${item.type}${item.id}`
                        )
                        html2Canvas(dom, {
                            allowTaint: true,
                            scale: 1,
                            backgroundColor: null
                        }).then(canvas => {
                            const imgData = canvas.toDataURL('image/png', 1.0)
                            if (item.static && !this.cacheBase64[item.id]) {
                                this.cacheBase64[item.id] = imgData
                            }

                            // this.base64List.push(imgData.split(',')[1])
                            // if(this.base64List.length === data.length) {
                            //   console.log(JSON.stringify(this.base64List))
                            // }
                            this.addIconPOI({
                                ...item,
                                layerId: item.type,
                                base64: imgData.split(',')[1],
                                anchor:
                                    poiType === 'screen' ? anchor : [0.5, 0.5],
                                type: poiType,
                                scaleByDistance
                            })
                        })
                    }
                })
            })
        },

        addIconPOI(project) {
            const {
                id,
                coords,
                layerId,
                base64,
                anchor,
                type,
                scaleByDistance,
                isVisable
            } = project
            var option = {
                id, //  唯一标识
                layerID: layerId, //  图层标识，layerID如果一样，则会放在一个图层内
                type, //  可缺省，"screen"和"world"，默认"screen"
                renderScale: 1.0, //  可缺省，默认1.0
                switchScale: true, //  可缺省，默认false
                scaleByDistance, //  可缺省，默认[0.0, 0.0, 0.0, 0.0]，switchScale为true时才生效
                coords, //  使用coords则为地理坐标，只能与location选其一
                isVisable: typeof isVisable === 'boolean' ? isVisable : true, //  可缺省，默认true
                anchor, //  可缺省，left:左下，center:中下，right:右下，默认为center，仅type: "screen"时生效
                onClickedCallBack: '_onPOIClickCallback',
                // onHoveredCallBack: '_onPOIHoverCallback', // 可缺省，缺省时不执行
                // onUnhoveredCallBack: '_onPOIUnhoverCallback', // 可缺省，缺省时不执行
                icon: {
                    base64,
                    backgroundcolor: [255, 255, 255, 1] //  可缺省，默认[255,255,255,1]
                },
                faceType: 6
            }
            window.swdt.fire('addIconPOI', option)
        },
        updatePoi() {
            this.htmlTemplate = ''
            this.poiData.forEach(item => {
                this.htmlTemplate += this.createTemplate(item)
            })

            this.$nextTick(() => {
                this.poiData.forEach(item => {
                    const dom = document.querySelector(
                        `.${item.type}${item.id}`
                    )

                    html2Canvas(dom, {
                        allowTaint: true,
                        scale: 1,
                        backgroundColor: null
                    }).then(canvas => {
                        const imgData = canvas.toDataURL('image/png', 1.0)

                        window.swdt.fire('updateIconPOI', {
                            id: item.id, // 唯一标识
                            layerID: item.type,
                            onClickedCallBack: '_onPOIClickCallback',
                            icon: {
                                // 可缺省，缺省时只修改文本
                                base64: imgData.split(',')[1]
                            }
                        })
                    })
                })
            })
        },
        updatePois(poilist) {
            this.htmlTemplate = ''
            poilist.forEach(item => {
                this.htmlTemplate += this.createTemplate(item)
            })
            this.$nextTick(() => {
                poilist.forEach(item => {
                    const dom = document.querySelector(
                        `.${item.type}${item.id}`
                    )

                    html2Canvas(dom, {
                        allowTaint: true,
                        scale: 1,
                        backgroundColor: null
                    }).then(canvas => {
                        const imgData = canvas.toDataURL('image/png', 1.0)

                        window.swdt.fire('updateIconPOI', {
                            id: item.id, // 唯一标识
                            layerID: item.type,
                            onClickedCallBack: '_onPOIClickCallback',
                            icon: {
                                // 可缺省，缺省时只修改文本
                                base64: imgData.split(',')[1]
                            }
                        })
                    })
                })
            })
        },

        updateSinglePoi(item) {
            this.htmlTemplate = ''
            this.htmlTemplate += this.createTemplate(item)
            this.$nextTick(() => {
                const dom = document.querySelector(`.${item.type}${item.id}`)

                html2Canvas(dom, {
                    allowTaint: true,
                    scale: 1,
                    backgroundColor: null
                }).then(canvas => {
                    const imgData = canvas.toDataURL('image/png', 1.0)

                    window.swdt.fire('updateIconPOI', {
                        id: item.id, // 唯一标识
                        layerID: item.type,
                        onClickedCallBack: '_onPOIClickCallback',
                        // onHoveredCallBack: '_onPOIHoverCallback', // 可缺省，缺省时不执行
                        // onUnhoveredCallBack: '_onPOIUnhoverCallback', // 可缺省，缺省时不执行
                        icon: {
                            // 可缺省，缺省时只修改文本
                            base64: imgData.split(',')[1]
                        }
                    })
                })
            })
        }
    }
}
</script>

<style lang="less">
.html2canvas-container {
    position: fixed;
    left: -99999px;
    font-family: 'PingFang';
    z-index: -10;
    .warning-panel {
        width: 224px;
        height: 114px;
        background: linear-gradient(
                270deg,
                rgba(23, 41, 78, 0.42) 0%,
                rgba(23, 41, 78, 0.72) 100%
            ),
            linear-gradient(
                270deg,
                rgba(252, 0, 0, 0) 0%,
                rgba(255, 0, 0, 0.32) 100%
            );
        border-radius: 4px;
        border: 1px solid;
        border-image: linear-gradient(
                270deg,
                rgba(76, 110, 255, 0.8),
                rgba(50, 118, 255, 0.72),
                rgba(222, 28, 70, 1)
            )
            1 1;
        padding: 8px;
        line-height: 22px;
        display: flex;
        flex-direction: column;

        .gate-name {
            font-size: 16px;
            color: white;
        }

        .warning-time {
            font-size: 14px;
            color: white;
        }

        .warning-content {
            font-size: 14px;
            color: #ff6060;
        }

        .icon {
            width: 14px;
            height: 20px;
            flex-shrink: 0;
            margin-right: 4px;
            background-image: url('@/assets/images/icon-warning.png');
            background-size: 13.5px 14px;
            background-repeat: no-repeat;
            background-position: center;
        }
    }

    .manageStation-wrap {
        position: relative;
        width: 365px;
        height: 271px;
        // transform: scale(0.8);
        img {
            width: 100%;
            height: 100%;
        }
        .content {
            position: absolute;
            top: 0;
            padding: 25px 20px 0 60px;
            width: 100%;
            .title {
                margin-bottom: 10px;
                font-size: 22px;
                color: #ffffff;
                font-family: YouSheBiaoTiHei;
            }
            .details {
                line-height: 1.2;
                font-size: 24px;
                color: #ffffff;
                div {
                    margin-bottom: 5px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    font-size: 14px;
                    span {
                        width: 198px;
                    }
                }
                .post {
                    color: #00ffff;
                }
            }
        }
    }
}
</style>
