<template>
  <span>{{ text }}</span>
</template>

<script>
import { getDictText } from "@/utils";
export default {
  name: "CommonDict",
  components: {},
  props: {
    value: {
      type: [String, Number, Array],
      default: null,
    },
    dictCode: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    text() {
      if (this.multiple && this.value) {
        return (
          this.value
            .split(",")
            .map((i) => {
              return getDictText(this.dictCode, i);
            })
            .join(",") || "-"
        );
      }
      return getDictText(this.dictCode, this.value) || "-";
    },
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
