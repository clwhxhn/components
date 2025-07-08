<template>
  <div class="easy-table">
    <div :style="{ height: headerHeight }" class="easy-table-header">
      <span
        :style="getCellStyle(col)"
        class="header-cell"
        v-for="col in columns"
        :key="col.dataIndex"
      >
        {{ col.title }}
      </span>
    </div>
    <div class="empty-text" v-if="!dataSource.length">暂无数据</div>
    <a-spin :spinning="loading">
      <div
        ref="contentRef"
        class="easy-table-content"
        :style="{ maxHeight: contentHeight }"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
      >
        <div
          :style="{ height: rowHeight }"
          @click="handleRowClick(it, i)"
          v-for="(it, i) in dataSource"
          :key="i"
          class="easy-table-row"
          :class="{ 'is-active': activeId === it.id }"
        >
          <span
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
            {{
              col.filter
                ? col.filter(it[col.dataIndex], it, i)
                : it[col.dataIndex]
            }}
          </span>
        </div>
      </div>
    </a-spin>
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
    activeId: {
      type: String,
      default: "",
    },
    // 原有props保持不变...
    autoScroll: {
      type: Boolean,
      default: false,
    },
    // 新增滚动速度控制参数
    scrollSpeed: {
      type: Number,
      default: 40, // 滚动间隔(毫秒)
    },
    scrollStep: {
      type: Number,
      default: 1, // 每次滚动步长(像素)
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollTimer: null, // 滚动计时器
      isScrolling: false, // 滚动状态
      isPaused: false, // 暂停状态
    };
  },
  mounted() {
    this.startScroll();
  },
  beforeDestroy() {
    this.stopScroll();
  },
  watch: {
    autoScroll(newVal) {
      if (newVal) {
        this.startScroll();
      } else {
        this.stopScroll();
      }
    },
    dataSource() {
      // 数据变化时重置滚动位置
      if (this.$refs.contentRef) {
        this.$refs.contentRef.scrollTop = 0;
      }
      if (this.autoScroll) {
        this.stopScroll();
        this.$nextTick(this.startScroll);
      }
    },
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
    handleRowClick(row, i) {
      this.$emit("rowClick", row, i);
    },
    // 开始自动滚动
    startScroll() {
      if (!this.autoScroll || !this.dataSource.length) return;
      const contentEl = this.$refs.contentRef;
      if (!contentEl) return;

      // 确保容器有滚动空间
      this.$nextTick(() => {
        if (contentEl.scrollHeight <= contentEl.clientHeight) return;

        this.isScrolling = true;
        this.scrollTimer = setInterval(() => {
          if (this.isPaused) return;

          // 滚动到底部时回到顶部
          if (
            contentEl.scrollTop + contentEl.clientHeight >=
            contentEl.scrollHeight
          ) {
            contentEl.scrollTop = 0;
          } else {
            contentEl.scrollTop += this.scrollStep;
          }
        }, this.scrollSpeed);
      });
    },

    // 停止滚动
    stopScroll() {
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
      }
      this.isScrolling = false;
    },

    // 暂停滚动（鼠标悬停时）
    pauseScroll() {
      if (this.autoScroll) {
        this.isPaused = true;
      }
    },

    // 恢复滚动（鼠标离开时）
    resumeScroll() {
      if (this.autoScroll) {
        this.isPaused = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.easy-table {
  position: relative;
  .empty-text {
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    color: #fff;
    text-align: center;
  }
}
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
  .header-cell {
    padding: 0 8px;
  }
}
.easy-table-content {
  overflow-y: auto;
  position: relative;
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
    }
    &.is-active {
      background-color: rgba(64, 137, 226, 0.5);
      background-image: none;
    }
  }
}
</style>
