<template>
  <div class="container">
    <!-- 菜单 -->
    <ul class="menu">
      <li v-for="(item, index) in list" :key="item.key" @click="key = item.component">
        {{ item.text }}
      </li>
    </ul>
    <div class="content">
      <component :is="key"></component>
    </div>
  </div>
</template>

<script>
import Table from "./Table.vue";
import PdImage from './Animation.vue'
import Upload from "./Upload.vue";
export default {
  name: "Home",
  components: {
    Table,
    PdImage,
    Upload
  },
  data() {
    return {
      key: 'Table',
    };
  },
  created() {
    this.list = [
      {
        text: "滚动的表格",
        component: 'Table'
      },
      {
        text: '上下飘动的图片',
        component: 'PdImage'
      },
      {
        text: '附件上传：antdv',
        component: 'Upload'
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