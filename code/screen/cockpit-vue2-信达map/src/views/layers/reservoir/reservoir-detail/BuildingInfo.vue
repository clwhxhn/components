<template>
  <div>
    <div class="common-title-v5" titleText="挡水建筑物"></div>
    <CommonDescription
      :dataSource="wpoResBldBaffle"
      :field-configs="fieldConfigs"
    ></CommonDescription>

    <template v-if="tableData1.length">
      <div class="common-title-v5 mt-12" titleText="正常溢洪道"></div>
      <a-table
        class="common-dark-table mt-12"
        size="small"
        :columns="columns1"
        :pagination="false"
        :dataSource="tableData1"
        :locale="{ emptyText: '暂无数据' }"
      >
      </a-table>
    </template>

    <template v-if="tableData2.length">
      <div class="common-title-v5 mt-12" titleText="非常溢洪道"></div>
      <a-table
        class="common-dark-table mt-12"
        size="small"
        :columns="columns2"
        :pagination="false"
        :dataSource="tableData2"
        :locale="{ emptyText: '暂无数据' }"
      >
      </a-table>
    </template>

    <template v-if="tableData3.length">
      <div class="common-title-v5 mt-12" titleText="泄洪洞"></div>
      <a-table
        class="common-dark-table mt-12"
        size="small"
        :columns="columns3"
        :pagination="false"
        :dataSource="tableData3"
        :locale="{ emptyText: '暂无数据' }"
      >
      </a-table>
    </template>

    <template v-if="tableData4.length">
      <div class="common-title-v5 mt-12" titleText="放空洞"></div>
      <a-table
        class="common-dark-table mt-12"
        size="small"
        :columns="columns3"
        :pagination="false"
        :dataSource="tableData4"
        :locale="{ emptyText: '暂无数据' }"
      >
      </a-table>
    </template>

    <template v-if="tableData5.length">
      <div class="common-title-v5 mt-12" titleText="输水建筑物"></div>
      <a-table
        class="common-dark-table mt-12"
        size="small"
        :columns="columns5"
        :pagination="false"
        :dataSource="tableData5"
        :locale="{ emptyText: '暂无数据' }"
      >
      </a-table>
    </template>
  </div>
</template>

<script>
import CommonDescription from "@/views/components/CommonDescription.vue";
import { getAction } from "@/utils";
import { getDictText } from "@/utils/dict";
export default {
  name: "BuildingInfo",
  components: { CommonDescription },
  props: {
    reservoirId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      // 挡水建筑物
      wpoResBldBaffle: {},
      fieldConfigs: [
        {
          title: "坝型",
          dataIndex: "damType_dictText",
          span: 8,
        },
        {
          title: "最大坝高",
          dataIndex: "damHeight",
          span: 8,
          unit: "m",
          customRender: (text) => (text ? `${text}m` : "-"),
        },
        {
          title: "坝顶高程",
          dataIndex: "damTopElevation",
          span: 8,
          unit: "m",
          customRender: (text) => (text ? `${text}m` : "-"),
        },
        {
          title: "坝顶长度",
          dataIndex: "damTopLength",
          span: 8,
          unit: "m",
          customRender: (text) => (text ? `${text}m` : "-"),
        },
        {
          title: "坝顶宽度",
          dataIndex: "damWidth",
          span: 8,
          unit: "m",
          customRender: (text) => (text ? `${text}m` : "-"),
        },
        {
          title: "坝基防渗体型式",
          dataIndex: "damBodyType",
          span: 8,
          dictCode: "wpo_res_constr_dam_imper_type",
        },
        {
          title: "副坝座数",
          dataIndex: "subDamNum",
          span: 8,
        },
        {
          title: "副坝总长",
          dataIndex: "subDamTotalLength",
          span: 8,
          unit: "m",
          customRender: (text) => (text ? `${text}m` : "-"),
        },
        {
          title: "副坝最大坝高",
          dataIndex: "subDamMaxHeight",
          span: 8,
          unit: "m",
          customRender: (text) => (text ? `${text}m` : "-"),
        },
      ],
      // 正常溢洪道
      tableData1: [],
      columns1: [
        {
          title: "序号",
          dataIndex: "idx",
          width: 60,
          ellipsis: true,
          align: "center",
          customRender: (t, r, index) => {
            return index + 1;
          },
        },
        {
          title: "建筑物名称",
          dataIndex: "architectureName",
          ellipsis: true,
          align: "center",
        },
        {
          title: "型式",
          dataIndex: "spillwayType",
          ellipsis: true,
          align: "center",
          customRender: (text) => getDictText("wpo_res_constr_form", text),
        },
        {
          title: (
            <div>
              <div>堰顶高程</div>
              <div>（m）</div>
            </div>
          ),
          dataIndex: "weirTopElevation",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>溢流段长或</div>
              <div>堰顶宽（m）</div>
            </div>
          ),
          dataIndex: "weirTopWidth",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>设计泄洪</div>
              <div>流量（m³/s）</div>
            </div>
          ),
          dataIndex: "designFloodDischarge",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>校核泄洪</div>
              <div>流量（m³/s）</div>
            </div>
          ),
          dataIndex: "checkingFloodDischarge",
          ellipsis: true,
          align: "center",
        },

        {
          title: (
            <div>
              <div>工作闸</div>
              <div>门型式</div>
            </div>
          ),
          dataIndex: "workingGateType",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            getDictText("wpo_res_constr_strobe_form", text),
        },
        {
          title: (
            <div>
              <div>启闭</div>
              <div>方式</div>
            </div>
          ),
          width: 60,
          dataIndex: "ocType",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            getDictText("wpo_res_constr_start_stop_way", text),
        },
        {
          title: (
            <div>
              <div>消能</div>
              <div>方式</div>
            </div>
          ),
          width: 60,
          dataIndex: "disEnergyType",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            getDictText("wpo_res_constr_energy_dissipation_way", text),
        },
      ],
      // 非常溢洪道
      tableData2: [],
      columns2: [
        {
          title: "序号",
          dataIndex: "idx",
          width: 60,
          ellipsis: true,
          align: "center",
          customRender: (t, r, index) => {
            return index + 1;
          },
        },
        {
          title: "建筑物名称",
          dataIndex: "architectureName",
          ellipsis: true,
          align: "center",
        },
        {
          title: "型式",
          dataIndex: "spillwayType",
          ellipsis: true,
          align: "center",
          customRender: (text) => getDictText("wpo_res_constr_form", text),
        },
        {
          title: "堰顶高程（m）",
          dataIndex: "weirTopElevation",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>溢流段长或</div>
              <div>堰顶宽（m）</div>
            </div>
          ),
          dataIndex: "weirTopWidth",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>设计泄洪</div>
              <div>流量（m³/s）</div>
            </div>
          ),
          dataIndex: "designFloodDischarge",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>校核泄洪</div>
              <div>流量（m³/s）</div>
            </div>
          ),
          dataIndex: "checkingFloodDischarge",
          ellipsis: true,
          align: "center",
        },
        {
          title: "启用标准",
          dataIndex: "enableStandards",
          ellipsis: true,
          align: "center",
        },
      ],
      // 泄洪洞
      tableData3: [],
      columns3: [
        {
          title: "序号",
          dataIndex: "idx",
          width: 60,
          ellipsis: true,
          align: "center",
          customRender: (t, r, index) => {
            return index + 1;
          },
        },
        {
          title: "建筑物名称",
          dataIndex: "architectureName",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>洞（孔）身</div>
              <div>型式</div>
            </div>
          ),
          dataIndex: "spillwayType",
          ellipsis: true,
          align: "center",
          customRender: (text) => getDictText("wpo_res_constr_form", text),
        },
        {
          title: (
            <div>
              <div>断面</div>
              <div>尺寸</div>
            </div>
          ),
          dataIndex: "sectionSize",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>进口底槛</div>
              <div>高程（m）</div>
            </div>
          ),
          dataIndex: "thresholdElevation",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>设计泄洪</div>
              <div>流量（m³/s）</div>
            </div>
          ),
          dataIndex: "designFloodDischarge",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>校核泄洪</div>
              <div>流量（m³/s）</div>
            </div>
          ),
          dataIndex: "checkingFloodDischarge",
          ellipsis: true,
          align: "center",
        },
        {
          title: (
            <div>
              <div>工作闸</div>
              <div>门型式</div>
            </div>
          ),
          dataIndex: "workingGateType",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            getDictText("wpo_res_constr_strobe_form", text),
        },
        {
          title: (
            <div>
              <div>启闭</div>
              <div>方式</div>
            </div>
          ),
          width: 60,
          dataIndex: "ocType",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            getDictText("wpo_res_constr_start_stop_way", text),
        },
        {
          title: (
            <div>
              <div>消能</div>
              <div>方式</div>
            </div>
          ),
          width: 60,
          dataIndex: "disEnergyType",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            getDictText("wpo_res_constr_energy_dissipation_way", text),
        },
      ],
      // 放空洞
      tableData4: [],
      // 输水建筑物
      tableData5: [],
      columns5: [
        {
          title: "序号",
          dataIndex: "idx",
          ellipsis: true,
          align: "center",
          customRender: (t, r, index) => {
            return index + 1;
          },
        },
        {
          title: "建筑物名称",
          dataIndex: "name",
          ellipsis: true,
          align: "center",
        },
        {
          title: "设计流量",
          dataIndex: "designFlow",
          ellipsis: true,
          align: "center",
        },
        {
          title: "输水道型式",
          dataIndex: "aqueductType",
          ellipsis: true,
          align: "center",
          customRender: (text) =>
            getDictText("wpo_res_constr_aqueduct_type", text),
        },
        {
          title: "断面尺寸",
          dataIndex: "sectionSize",
          ellipsis: true,
          align: "center",
        },
        {
          title: "输水道长度（m）",
          dataIndex: "aqueductLength",
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
          // 挡水建筑物
          getAction(`/roms/yg.rsvr.wrb/query.by.rsId`, {
            rsId: this.reservoirId,
          }).then((res) => {
            this.wpoResBldBaffle = res.result;
          });

          // 正常溢洪道
          getAction(`/roms/yg.rsvr.rsb.norspi/query.by.rsId`, {
            rsId: this.reservoirId,
          })
            .then((res) => res.result || [])
            .then((res) => {
              this.tableData1 = res;
            });

          // 正常溢洪道
          getAction(`/roms/yg.rsvr.rsb.verspi/query.by.rsId`, {
            rsId: this.reservoirId,
          })
            .then((res) => res.result || [])
            .then((res) => {
              this.tableData2 = res;
            });

          // 泄洪洞
          getAction(`/roms/yg.rsvr.rsb.spillway/query.by.rsId`, {
            rsId: this.reservoirId,
          })
            .then((res) => res.result || [])
            .then((res) => {
              this.tableData3 = res;
            });

          // 放空洞
          getAction(`/roms/yg.rsvr.rsb.fkd/query.by.rsId`, {
            rsId: this.reservoirId,
          })
            .then((res) => res.result || [])
            .then((res) => {
              this.tableData4 = res;
            });

          // 输水建筑物
          getAction(`/roms/yg.rsvr.wcb/query.by.rsId`, {
            rsId: this.reservoirId,
          })
            .then((res) => res.result || [])
            .then((res) => {
              this.tableData5 = res;
            });
        }
      },
    },
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
