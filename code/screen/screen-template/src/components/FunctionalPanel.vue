<template>
  <div class="func-panel">
    <div class="btn" @click="flyToOverview()">回到全局</div>
    <div class="btn" @click="flyToJS()">厥水河</div>
    <div class="btn" @click="roamingJS()">厥水河漫游</div>
    <div class="btn" @click="executeCustomEvent('openMGateJS')">打开检修闸</div>
    <div class="btn" @click="executeCustomEvent('clipChannel')">官沟明渠</div>
    <div class="btn" @click="flyToML()">孟楼七方进口</div>
    <div class="btn" @click="roamingML()">孟楼七方漫游</div>
  </div>
</template>

<script>
/* global swdt */
export default {
  name: 'FunctionalPanel',
  data() {
    return {
      routineOptions: [
        // 孟楼七方定位list
        [
          { id: 'CameraActor_21', duration: 2.0 },
          { id: 'CameraActor_29', duration: 2.0 }
        ],
        [
          { id: 'CameraActor_0', duration: 5 },
          { id: 'CameraActor_2', speed: 20 },
          { id: 'CameraActor_4', speed: 20 },
          { id: 'CameraActor_6', speed: 5 },
          { id: 'CameraActor_8', speed: 20 },
          { id: 'CameraActor_30', speed: 20 },
          { id: 'CameraActor_10', speed: 20 },
          { id: 'CameraActor_11', speed: 5 },
          { id: 'CameraActor_12', speed: 20 },
          { id: 'CameraActor_13', speed: 30 },
          { id: 'CameraActor_14', speed: 30 },
          { id: 'CameraActor_15', speed: 30 },
          { id: 'CameraActor_16', speed: 30 },
          { id: 'CameraActor_17', speed: 30 },
          { id: 'CameraActor_32', speed: 20 },
          { id: 'CameraActor_33', speed: 50 },
          { id: 'CameraActor_34', speed: 50 }
        ],
        [
          { id: 'CameraActor_18', speed: 10 },
          { id: 'CameraActor_19', speed: 10 },
          { id: 'CameraActor_35', speed: 10 },
          { id: 'CameraActor_37', speed: 10 },
          { id: 'CameraActor_25', speed: 10 },
          { id: 'CameraActor_24', speed: 5 },
          { id: 'CameraActor_26', speed: 5 },
          { id: 'CameraActor_27', speed: 5 }
        ]
      ]
    }
  },
  methods: {
    flyToOverview() {
      this.executeCustomEvent('showAllPOI')
      this.flyToCamera('CameraActor_22')
    },
    flyToJS() {
      this.flyToCamera('CameraActor_28')

      setTimeout(() => {
        this.executeCustomEvent('hideAllPOI')
        swdt.fire('executeBPCustomEvents', {
          command: 'showPOIByID',
          param: '{ "id": "BP_POI_icon_Screen_leftAnchor_C_5" }'
        })
        swdt.fire('executeBPCustomEvents', {
          command: 'showPOIByID',
          param: '{ "id": "BP_POI_icon_Screen_leftAnchor_C_10" }'
        })
      }, 4000)
    },
    flyToML() {
      this.flyToCameraList(0, 0)
      setTimeout(() => {
        this.executeCustomEvent('hideAllPOI')
        swdt.fire('executeBPCustomEvents', {
          command: 'showPOIByID',
          param: '{ "id": "BP_POI_icon_Screen_leftAnchor_C_2" }'
        })
      }, 2000)
    },

    roamingJS() {
      this.executeCustomEvent('hideAllPOI')
      this.flyToCameraList(1, 0)
      setTimeout(() => {
        this.executeCustomEvent('hideAllPOI')
        swdt.fire('executeBPCustomEvents', {
          command: 'showPOIByID',
          param: '{ "id": "BP_POI_icon_Screen_leftAnchor_C_5" }'
        })
        swdt.fire('executeBPCustomEvents', {
          command: 'showPOIByID',
          param: '{ "id": "BP_POI_icon_Screen_leftAnchor_C_10" }'
        })
      }, 60000)
    },
    roamingML() {
      this.flyToCameraList(2, 0)
    },

    openMGateJS() {
      this.executeCustomEvent('openMGateJS')
    },

    flyToCamera(cameraId) {
      swdt.fire('flyToCamera', {
        id: cameraId,
        duration: 5
      })
    },

    flyToCameraList(routineIdx, waitTime) {
      swdt.fire('flyToCameraListByActorID', {
        waitTime: waitTime,
        data: this.routineOptions[routineIdx]
      })
    },

    executeCustomEvent(funcName) {
      swdt.fire('executeBPCustomEvents', { command: funcName })
    }
  }
}
</script>

<style lang="less" scoped>
.func-panel {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;

  .btn {
    font-family: FZLanTYJW;
    color: #fff;
    text-shadow: 0 0 0.125rem #383838;
    pointer-events: all;
    cursor: pointer;
    height: 41px;
    background-image: url('@/assets/images/btn.png');
    background-size: 128px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
      background-image: url('@/assets/images/btn-pushed.png') !important;
    }
  }
}
</style>
