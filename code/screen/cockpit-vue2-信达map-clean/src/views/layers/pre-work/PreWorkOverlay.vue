<template>
  <CommonOverlay :title="dataSource.name" width="300px">
    <CommonDescription :field-configs="fieldConfigs" :data-source="dataSource">
    </CommonDescription>
    <template #action>
      <div class="btn-item" @click="detailClick">详情</div>
    </template>
  </CommonOverlay>
</template>

<script>
import CommonOverlay from "@/views/components/CommonOverlay.vue";
import CommonDescription from "@/views/components/CommonDescription.vue";
import { getAction } from "@/utils";
import moment from "moment";
import { showModal } from "@/components/easy-modal/modal";
import PreWorkDetail from "./PreWorkDetail.vue";

export default {
  name: "PreWorkOverlay",
  components: { CommonOverlay, CommonDescription },
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dataSource: {},
      dateFormat: "YYYY-MM-DD",
      isRealData: false,
      fieldConfigs: [
        {
          title: "工程名称",
          dataIndex: "name",
        },
        {
          title: "工程编码",
          dataIndex: "code",
        },
        {
          title: "工程类型",
          dataIndex: "typ_dictText",
        },
        {
          title: "工程规模",
          dataIndex: "engScal_dictText",
        },
      ],
    };
  },
  methods: {
    moment,
    detailClick() {
      showModal({
        width: 1100,
        component: PreWorkDetail,
        title: "工程详情",
        params: {
          model: this.dataSource,
        },
      });
    },
  },
  mounted() {
    getAction("/pcm/wpm.engineering/query.by.id", { id: this.params.id }).then(
      (res) => {
        this.dataSource = res.result;
      }
    );
  },
};
</script>

<style scoped lang="less">
.btn-item {
  width: 64px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: 600;
  font-size: 16px;
  color: #00ffff;
  background-size: 100% 100%;
  background-image: url("~@/assets/images/common/overlay-btn-bg.png");
  cursor: pointer;
}
.warning-tag {
  display: inline-block;
  background: linear-gradient(270deg, #dd0000 0%, #480000 97%);
  border-radius: 1px solid #ff5656;
  line-height: 20px;
  padding: 0 3px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}
</style>
