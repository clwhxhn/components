<template>
  <a-row>
    <a-col
      v-for="(item, idx) in fieldConfigs"
      :key="idx"
      class="description-field-item"
      :span="item.span || 24"
    >
      <div class="field-title">{{ item.title }}：</div>
      <div class="field-value">
        <template v-if="item.dictCode">
          <CommonDict
            :value="getText(item.dataIndex)"
            :dictCode="item.dictCode"
            :multiple="item.multiple"
          ></CommonDict>
        </template>
        <template v-else>
          <slot :name="item.dataIndex">
            {{ getText(item.dataIndex) | ValidFill }}{{ item.unit || "" }}
          </slot>
        </template>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import CommonDict from "@/views/components/CommonDict.vue";
export default {
  name: "CommonDescription",
  components: { CommonDict },
  props: {
    // 配置项、title和dataIndex
    fieldConfigs: {
      type: Array,
      default: () => [],
    },
    // 数据对象
    dataSource: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    getText(key) {
      if (key.includes(".")) {
        const arr = key.split(".");
        if (this.dataSource[arr[0]]) {
          return this.dataSource[arr[0]][arr[1]];
        }
        return this.dataSource[arr[0]];
      }
      return this.dataSource[key];
    },
  },
};
</script>

<style scoped lang="less">
.description-field-item {
  display: flex;
  margin-top: 8px;
  .field-title {
    font-weight: 400;
    color: #5fd4fe;
    font-size: 14px;
    flex-shrink: 0;
  }
  .field-value {
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
  }
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
