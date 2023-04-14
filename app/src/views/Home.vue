<template>
  <div class="container">
    <!-- 菜单 -->
    <ul class="menu">
      <li v-for="(item, index) in list" :key="item.key" @click="key = item.key">
        {{ item.text }}
      </li>
    </ul>
    <div class="content">
      <!-- 滚动的表格 -->
      <Table v-if="key === 0"></Table>
      <PdImage v-if="key === 1"></PdImage>
    </div>
  </div>
</template>

<script>
import Table from "./Table.vue";
import PdImage from './Animation.vue'
export default {
  name: "Home",
  components: {
    Table,
    PdImage
  },
  data() {
    return {
      key: -1,
    };
  },
  created() {
    this.list = [
      {
        key: 0,
        text: "滚动的表格",
      },
      {
        key: 1,
        text: '上下飘动的图片'
      },
    ];
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .menu {
    width: 150px;
    li {
      cursor: pointer;
    }
  }
  .content {
    flex: 1;
  }
}
</style>