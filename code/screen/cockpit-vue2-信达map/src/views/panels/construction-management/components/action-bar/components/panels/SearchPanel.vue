<template>
  <transition @leave="handleLeave" name="translate">
    <div @click.stop v-show="panelVisible" class="search-panel">
      <a-input-search
        v-model.trim="searchKey"
        placeholder="请输入关键字搜索"
        @search="search"
      />
      <div v-if="!results.length && searchKey" class="empty-text">
        暂无搜索结果
      </div>
      <div v-if="searchKey" class="search-result-list">
        <div
          v-for="(item, idx) in results"
          :key="idx"
          class="search-result-item"
          @click="goDetail(item)"
        >
          <div class="search-result-icon"></div>
          <div :title="item.rsName" class="search-result-label">
            {{ item.rsName }}-{{ item.addvnm3 }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { CQ_REGION_ID, paramsGetters } from "@/utils/map-helper";
import { useOutSideClickListener } from "@/utils/tooltip-utils";
import { getProjectList } from "@/views/panels/construction-management/mock/mock";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  props: {
    panelVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      searchKey: "",
      results: [],
    };
  },
  computed: paramsGetters(["regionId"]),
  mounted() {
    useOutSideClickListener(
      this,
      () => {
        this.close();
      },
      this.$el.parentElement
    );
  },
  methods: {
    search() {
      getProjectList({
        searchKey: this.searchKey,
        regionId: this.regionId === CQ_REGION_ID ? "" : this.regionId,
      }).then((res) => {
        this.results = res;
      });
    },
    goDetail(data) {
      this.$setCurLayers(["projectLayer", "countLayer"]);
      const { longitude, latitude } = data;
      if (longitude && latitude) {
        this.flyTo$([longitude, latitude], {
          maxZoom: 14,
        });
        this.$emit("close");
      } else {
        this.$message.warning("没有空间数据");
      }
    },
    close() {
      this.$emit("close");
    },
    handleLeave() {
      this.searchKey = "";
      this.results = [];
    },
  },
};
</script>
<style lang="less" scoped>
.search-panel {
  position: absolute;
  top: 0;
  z-index: 99999;
  right: 50px;
  width: 250px;
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(64, 137, 226, 1),
      rgba(117, 190, 243, 0.33)
    )
    1 1;
  pointer-events: all;
  background: rgba(0, 51, 102, 0.8);
  box-shadow: inset 0px -2px 6px 0px #2296f0;
  transition: all 300ms;
  user-select: none;
  padding: 12px;
  &::after {
    position: absolute;
    top: 15px;
    right: -7px;
    width: 7px;
    height: 14px;
    background-image: url(~@assets/images/common/action-bar/panel_arrow.png);
    background-size: 100% 100%;
    content: "";
  }
  /deep/ .ant-input-search-icon {
    color: #fff;
  }
  /deep/ .ant-input,
  /deep/ .ant-select .ant-select-selection {
    border: 0;
    color: #d1e2ff;
    font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
    font-weight: normal;
    background: none;
    border: 1px solid #0783fa;
    background-size: 100% 100%;
    .ant-calendar-range-picker-separator,
    .ant-select-arrow-icon {
      color: #d1e2ff;
    }
  }
  .empty-text {
    padding: 20px 0;
    color: #ffffff;
    text-align: center;
  }
  .search-result-list {
    padding: 10px 0 0 0;
    max-height: 500px;
    overflow: auto;
    .search-result-item {
      width: 100%;
      height: 30px;
      line-height: 30px;
      display: flex;
      color: #ffffff;
      align-items: center;
      cursor: pointer;
      &:hover {
        font-weight: 600;
        color: #72daff;
        font-size: 16px;
      }
      .search-result-icon {
        margin-right: 8px;
        width: 17px;
        height: 22px;
        background-size: 100% 100%;
        background-image: url(~@/assets/images-new/common/project-icon-1.png);
      }
      .search-result-label {
        width: calc(100% - 20px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: all 0.3s;
}

.translate-enter,
.translate-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
