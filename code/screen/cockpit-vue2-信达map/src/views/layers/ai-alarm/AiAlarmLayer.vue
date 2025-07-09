<template>
  <SchintaMapLayerGeo
    :list-style="listStyle"
    name="aiAlarmLayer"
    :list="list"
    id-key="monitorId"
    :overlay-type="''"
    :is-custom="true"
    :is-overlay="true"
  >
    <template #overlay="{ properties }">
      <CommonOverlay :title="properties.monitorNm" width="300px">
        <CommonDescription
          :fieldConfigs="fieldConfigs"
          :data-source="properties"
        >
        </CommonDescription>
      </CommonOverlay>
    </template>
    <template #custom>
      <div class="flat-wave">
        <div class="flat-wave-circle" :style="circleStyle">
          <div class="flat-wave-circle-1" :style="circleColor"></div>
          <div class="flat-wave-circle-2" :style="circleColor"></div>
        </div>
      </div>
    </template>
  </SchintaMapLayerGeo>
</template>
<script>
import { getAiAlarmDataList } from "@/views/panels/construction-management/mock/mock";
import { SchintaMapLayerGeo } from "schinta-map";
import CommonOverlay from "@/views/components/CommonOverlay.vue";
import CommonDescription from "@/views/components/CommonDescription.vue";
export default {
  name: "AiAlarmLayer",
  components: { SchintaMapLayerGeo, CommonOverlay, CommonDescription },
  data() {
    return {
      list: [],
      listStyle(prop) {
        return {
          icon: {
            src: require("@/assets/images-new/common/shipin.png"),
            scale: 0.5,
            anchor: [0.5, 1],
          },
        };
      },
      fieldConfigs: [
        {
          title: "报警类别",
          dataIndex: "warningType",
        },
        {
          title: "所在河段",
          dataIndex: "rvSegNm",
        },
        {
          title: "上报时间",
          dataIndex: "monitorTime",
        },
      ],
    };
  },
  computed: {
    circleStyle() {
      return {
        width: `15px`,
        height: `15px`,
        top: `-24px`,
        left: `-7px`,
      };
    },
    circleColor() {
      return {
        border: `2px solid rgb(255, 67, 67)`,
      };
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getAiAlarmDataList().then((list) => {
        this.list = list.map((item) => {
          return {
            geometry: {
              type: "Point",
              coordinates: [+item.lon, +item.lat],
            },
            properties: {
              ...item,
              bussiness_id: item.monitorId,
              coordinates: [+item.lon, +item.lat],
            },
          };
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
@keyframes zoom-in-e {
  0% {
    transform: scale(1);
    opacity: 0.1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.8;
  }

  100% {
    transform: scale(2);
    opacity: 0.3;
  }
}
.flat-wave {
  position: relative;
  pointer-events: none;
  user-select: none;
  transform: scaleY(0.7);

  &-circle {
    position: absolute;
    z-index: -1;
    // filter: blur(1px);
    &-1 {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: -13px;
      left: 0;
      opacity: 0;
      transform-origin: center center;
      border-radius: 50%;
      animation: zoom-in-e 2700ms infinite linear;
    }

    &-2 {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: -13px;
      left: 0;
      opacity: 0;
      transform-origin: center center;
      border-radius: 50%;
      animation: zoom-in-e 2700ms infinite linear 1350ms;
    }

    &-3 {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: -13px;
      left: 0;
      opacity: 0;
      transform-origin: center center;
      border-radius: 50%;
      animation: zoom-in-e 2700ms infinite linear 1800ms;
    }
  }
}
</style>
