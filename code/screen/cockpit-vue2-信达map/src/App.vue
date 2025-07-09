<template>
  <div id="app">
    <template v-if="isLogin">
      <MainView></MainView>
    </template>
  </div>
</template>

<script>
import {
  getAction,
  getToken,
  setToken,
  postAction,
  setRefreshToken,
} from "./utils";
import MainView from "./views/MainView.vue";
import { setAllDict } from "@/utils/dict";
import { requestWithCache } from "@/utils/pre-request/pre-request";

export default {
  name: "App",
  components: {
    MainView,
  },
  data() {
    return {
      isLogin: true,
    };
  },
  mounted() {
    console.log(1111111);
    // this.isLogin = false;

    // const url = new URL(window.location.href);
    // const params = new URLSearchParams(url.search);
    // let refresh_token = params.get("refresh_token");
    // // query不存在时尝试从hash中查找
    // if (!refresh_token) {
    //   const hash = window.location.hash;
    //   // 提取refresh_token参数（假设格式为#/login?refresh_token=xxx）
    //   const params = new URLSearchParams(hash.slice(1).split("?")[1]);
    //   refresh_token = params.get("refresh_token");
    // }
    // if (refresh_token) {
    //   // 进行token转换
    //   postAction("/auth/login", {
    //     grant_type: "refresh_token",
    //     refresh_token: refresh_token,
    //   }).then((res) => {
    //     if (res.success) {
    //       setToken(res.result.access_token);
    //       setRefreshToken(res.result.refresh_token);

    //       requestWithCache({
    //         url: "/rws/rws/rwsWaterSupplyProject/getProjectInfoStat",
    //       });
    //       requestWithCache({
    //         url: "/pcm/pcm.map/queryWrEngineeringMap",
    //       });

    //       this.getDictList().then(() => {
    //         this.isLogin = true;
    //       });
    //     } else {
    //       this.isLogin = false;
    //     }
    //   });
    // } else {
    //   this.isLogin = false;
    // }
  },
  methods: {
    /**
     * 验证是否登录
     */
    getDictList() {
      return getAction("/system/dict/data/list", { pageSize: 9999 }).then(
        (res) => {
          if (res.success) {
            const dictMap = {};
            res.result.records.forEach((it) => {
              if (it.dictCode in dictMap) {
                dictMap[it.dictCode].push({
                  label: it.itemText,
                  value: it.itemValue,
                });
              } else {
                dictMap[it.dictCode] = [
                  {
                    label: it.itemText,
                    value: it.itemValue,
                  },
                ];
              }
            });
            setAllDict(dictMap);
          }
          return true;
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
