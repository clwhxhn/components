<template>
  <div class="container">
    <!-- 菜单 -->
    <ul class="menu">
        <li @click="key = 0">
            滚动的表格
        </li>
    </ul>
    <div class="content">
        <!-- 滚动的表格 -->
        <Table v-if="key === 0"></Table>
    </div>
  </div>
</template>

<script>
import Table from './Table.vue'
export default {
  name: "Home",
  components: {
    Table,
  },
  data() {
    return {
        key: -1
    };
  },
  created() {
  },
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    .menu {
        width: 150px;
        li{
            cursor: pointer;
        }
    }
    .content{
        flex: 1;
    }
}
</style>