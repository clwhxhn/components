<template>
  <div class="easy-table">
    <div :style="{ height: headerHeight }" class="easy-table-header">
      <div
        v-for="col in columns"
        :key="col.dataIndex || col.key"
        :style="getCellStyle(col)"
        :class="{
          group: col.hasOwnProperty('children') && col.children.length,
        }"
      >
        <template v-if="col.hasOwnProperty('children') && col.children.length">
          <div>{{ col.title }}</div>
          <div>
            <div
              v-for="child in col.children"
              :key="child.dataIndex"
              :style="getGroupCellStyle(child)"
            >
              <span class="header-cell">
                {{ child.title }}
              </span>
            </div>
          </div>
        </template>
        <span v-else class="header-cell">
          {{ col.title }}
        </span>
      </div>
    </div>
    <div class="easy-table-content" :style="{ maxHeight: contentHeight }">
      <div
        :style="{ height: rowHeight }"
        @click="handleRowClick(it, i)"
        v-for="(it, i) in dataSource"
        :key="i"
        class="easy-table-row"
      >
        <div
          :style="getCellStyle(col)"
          class="content-cell"
          v-for="col in columns"
          :key="col.dataIndex"
          :title="
            col.filter
              ? col.filter(it[col.dataIndex], it, i)
              : it[col.dataIndex]
          "
        >
          <template
            v-if="col.hasOwnProperty('children') && col.children.length"
          >
            <div class="group-cell-par">
              <div
                v-for="child in col.children"
                :key="child.dataIndex"
                :style="getGroupCellStyle(child)"
              >
                <span class="content-cell">
                  {{
                    child.filter
                      ? child.filter(it[child.dataIndex], it, i)
                      : it[child.dataIndex]
                  }}
                </span>
              </div>
            </div>
          </template>
          <template v-else>
            {{
              col.filter
                ? col.filter(it[col.dataIndex], it, i)
                : it[col.dataIndex]
            }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    contentHeight: {
      type: String,
      default: "auto",
    },
    headerHeight: {
      type: String,
      default: "32px",
    },
    rowHeight: {
      type: String,
      default: "37px",
    },
  },
  data() {
    return {};
  },
  methods: {
    getCellStyle(col) {
      const style = {
        width: typeof col.width === "number" ? col.width + "px" : col.width,
        textAlign: col.align || "center",
      };
      if (!col.width) {
        style.flex = 1;
      }
      return style;
    },
    getGroupCellStyle(col) {
      const style = {
        textAlign: col.align || "center",
      };
      return style;
    },
    handleRowClick(row, i) {
      this.$emit("rowClick", row, i);
    },
  },
};
</script>
<style lang="less" scoped>
.easy-table-header {
  height: 32px;
  display: flex;
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-image: url(~@/assets/images-new/common/table-header-bg.png);
  background-size: 100% 100%;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: #7dc9ff;
  line-height: 20px;
  font-style: normal;
  text-transform: none;

  .group {
    border-left: 1px solid #216ea1;
    border-right: 1px solid #216ea1;
    & > div:first-child {
      border-bottom: 1px solid #216ea1;
    }
    & > div:last-child {
      display: flex;
      div {
        flex: 1;
      }
    }
  }
  .header-cell {
    padding: 0 8px;
  }
}
.easy-table-content {
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .easy-table-row {
    margin-top: 4px;
    height: 37px;
    background-image: url(~@/assets/images-new/common/table-row-bg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    text-align: left;
    font-style: normal;
    text-transform: none;
    cursor: pointer;
    .content-cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      padding: 0 8px;

      .group-cell-par {
        display: flex;
        &>div {
            flex: 1;
        }
      }
    }
  }
}
</style>
