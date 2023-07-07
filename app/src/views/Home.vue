<!--
 * @Author: wangxiaohui clwhxhn@163.com
 * @Date: 2023-04-14 10:49:32
 * @LastEditors: wangxiaohui clwhxhn@163.com
 * @LastEditTime: 2023-07-07 17:01:03
 * @FilePath: \components\app\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
        text: '图片动画',
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