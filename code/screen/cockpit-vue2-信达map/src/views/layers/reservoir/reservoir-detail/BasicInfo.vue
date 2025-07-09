<template>
  <div>
    <div class="common-title-v5" titleText="基础信息"></div>
    <CommonDescription
      class="mt-12"
      :dataSource="dataSource"
      :field-configs="fieldConfigs1"
    ></CommonDescription>
    <CommonDescription
      :dataSource="dataSource"
      :field-configs="fieldConfigs2"
    ></CommonDescription>
    <div class="common-title-v5 mt-12" titleText="工程详情"></div>
    <div class="detail-rsComment mt-12">
      {{ dataSource.rsComment | ValidFill }}
    </div>

    <a-table
      class="common-dark-table mt-12"
      size="small"
      :columns="columns"
      :pagination="false"
      :dataSource="tableData"
      :locale="{ emptyText: '暂无数据' }"
    >
    </a-table>
  </div>
</template>

<script>
import CommonDescription from "@/views/components/CommonDescription.vue";
import { getAction } from "@/utils";
import moment from "moment";

export default {
  name: "BasicInfo",
  components: { CommonDescription },
  props: {
    reservoirId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dataSource: {},
      fieldConfigs1: [
        {
          title: "水库名称",
          dataIndex: "rsName",
          span: 8,
        },
        {
          title: "行政区划",
          dataIndex: "addvnm3",
          span: 8,
        },
        {
          title: "所在乡镇",
          dataIndex: "addvnm4",
          span: 8,
        },
        {
          title: "注册登记号",
          dataIndex: "rsRegCode",
          span: 8,
        },
        {
          title: "所属行业部门",
          dataIndex: "industryDept_dictText",
          span: 8,
        },
        {
          title: "高程基准面",
          dataIndex: "heightBaseStdTp",
          span: 8,
        },
        {
          title: "工程规模",
          dataIndex: "rsScale_dictText",
          span: 8,
        },
        {
          title: "水库类别",
          dataIndex: "rsCategory",
          span: 8,
          dictCode: "wpo_res_category",
        },
        {
          title: "工程等别",
          dataIndex: "engGrad",
          span: 8,
          dictCode: "wpo_att_eng_grad",
        },
      ],
      fieldConfigs2: [
        {
          title: "所在流域",
          dataIndex: "ctlo",
          span: 8,
          dictCode: "wpo_res_drainage_system",
        },
        {
          title: "所在水系",
          dataIndex: "ctlt",
          span: 8,
          dictCode: "wpo_res_drainage_system",
        },
        {
          title: "所在河流",
          dataIndex: "locRvCode",
          span: 8,
        },
        {
          title: "水库功能",
          dataIndex: "rsFun",
          span: 16,
          dictCode: "wpo_res_function",
          multiple: true,
        },
        {
          title: "是否为农村水电站",
          dataIndex: "ruralStation",
          span: 8,
          dictCode: "wpo_res_rps",
        },
        {
          title: "主管部门",
          dataIndex: "competentUnitName",
          span: 8,
        },
        {
          title: "水库注册登记机构",
          dataIndex: "address",
          span: 8,
        },
      ],
      tableData: [],
      columns: [
        {
          title: "序号",
          dataIndex: "idx",
          ellipsis: true,
          align: "center",
          customRender: (t, r, index) => {
            return +index + 1;
          },
        },
        {
          title: "状态",
          dataIndex: "state_dictText",
          ellipsis: true,
          align: "center",
        },
        {
          title: "工程开工时间",
          dataIndex: "startDate",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            text ? moment(text).format("YYYY-MM-DD") : "-",
        },
        {
          title: "投入使用时间",
          dataIndex: "waterStorageDate",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            text ? moment(text).format("YYYY-MM-DD") : "-",
        },
        {
          title: "竣工验收时间",
          dataIndex: "completionDate",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            text ? moment(text).format("YYYY-MM-DD") : "-",
        },
        {
          title: "改扩建内容",
          dataIndex: "buildInfo",
          ellipsis: true,
          align: "center",
        },
      ],
    };
  },
  watch: {
    reservoirId: {
      immediate: true,
      handler(val) {
        if (val) {
          getAction(`/roms/yg.rsvr.b/query.by.id`, {
            id: this.reservoirId,
          }).then((res) => {
            console.log(res, 'xxx')
            this.dataSource = res.result;
          });

          getAction(`/roms/yg.rsvr.build.info/list`, {
            pageNo: 1,
            pageSize: 99,
            rsId: this.reservoirId,
          })
            .then((res) => res.result || {})
            .then((res) => res.records || [])
            .then((res) => {
              this.tableData = res;
            });
        }
      },
    },
  },
  methods: {},
};
</script>

<style scoped lang="less">
.detail-rsComment {
  background: rgba(0, 118, 171, 0.2);
  padding: 16px;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  max-height: 150px;
  overflow-y: auto;
  // &::-webkit-scrollbar{
  //   display: none;
  // }
  &::-webkit-scrollbar-thumb {
    background: rgba(22, 139, 255, 0.32);
    border-radius: 2px;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
}
</style>
