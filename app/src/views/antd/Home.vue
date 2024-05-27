<template>
  <div class="box">
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 200 }">
      <a slot="action" slot-scope="text" href="javascript:;">action</a>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "Full Name",
    width: 200,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  { title: "Age", width: 500, dataIndex: "age", key: "age", fixed: "left" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 90,
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park",
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>

<style lang="less" scoped>
.box {
    // width: 300px;
}
</style>