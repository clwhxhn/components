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
import EngineeringDetail from "./EngineeringDetail.vue";

export default {
  name: "EngineeringOverlay",
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
          title: "项目名称",
          dataIndex: "name",
        },
        {
          title: "自编码",
          dataIndex: "selfCode",
        },
        {
          title: "项目分类",
          dataIndex: "category_dictText",
        },
        {
          title: "项目类型",
          dataIndex: "typ_dictText",
        },
      ],
    };
  },
  methods: {
    moment,
    detailClick() {
      showModal({
        width: 1100,
        component: EngineeringDetail,
        title: "项目详情",
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
