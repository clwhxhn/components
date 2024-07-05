<template>
  <div class="map-container">
    <BEcharts
      @click="clickEcharts"
      style="height: 100%; width: 100%"
      ref="heatmap"
      class="heatmap"
      :option="options2"
    />
  </div>
</template>

<script>
import BEcharts from "@/components/chart/BEcharts";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import * as echarts from "echarts";

export default {
  components: {
    BEcharts,
  },
  data() {
    return {
      listdata: [],
      allGSGC: [],
      showType: 1
    };
  },
  created() {
    this.allGSGC = [
      {
        regCode: "500101137000",
        regName: "武陵镇",
        proNum: 5,
        engTpOneProNum: 1,
        engTpTwoProNum: 3,
        engTpThreeProNum: 1,
      },
      {
        regCode: "500101152000",
        regName: "走马镇",
        proNum: 52,
        engTpOneProNum: 1,
        engTpTwoProNum: 15,
        engTpThreeProNum: 36,
      },
      {
        regCode: "500101017000",
        regName: "太白街",
        proNum: 28,
        engTpOneProNum: 24,
        engTpTwoProNum: 0,
        engTpThreeProNum: 4,
      },
      {
        regCode: "500101145000",
        regName: "余家镇",
        proNum: 39,
        engTpOneProNum: 1,
        engTpTwoProNum: 21,
        engTpThreeProNum: 17,
      },
      {
        regCode: "500101245000",
        regName: "九池街",
        proNum: 8,
        engTpOneProNum: 0,
        engTpTwoProNum: 6,
        engTpThreeProNum: 2,
      },
      {
        regCode: "500101238000",
        regName: "地宝土",
        proNum: 16,
        engTpOneProNum: 0,
        engTpTwoProNum: 4,
        engTpThreeProNum: 12,
      },
      {
        regCode: "500101139000",
        regName: "甘宁镇",
        proNum: 16,
        engTpOneProNum: 2,
        engTpTwoProNum: 10,
        engTpThreeProNum: 4,
      },
      {
        regCode: "500101023000",
        regName: "钟鼓楼",
        proNum: 10,
        engTpOneProNum: 0,
        engTpTwoProNum: 7,
        engTpThreeProNum: 3,
      },
      {
        regCode: "500101134000",
        regName: "高峰街",
        proNum: 5,
        engTpOneProNum: 1,
        engTpTwoProNum: 4,
        engTpThreeProNum: 0,
      },
      {
        regCode: "500101153000",
        regName: "罗田镇",
        proNum: 30,
        engTpOneProNum: 1,
        engTpTwoProNum: 15,
        engTpThreeProNum: 14,
      },
      {
        regCode: "500101227000",
        regName: "燕山乡",
        proNum: 7,
        engTpOneProNum: 1,
        engTpTwoProNum: 0,
        engTpThreeProNum: 6,
      },
      {
        regCode: "500101234000",
        regName: "梨树乡",
        proNum: 22,
        engTpOneProNum: 1,
        engTpTwoProNum: 1,
        engTpThreeProNum: 20,
      },
      {
        regCode: "500101148000",
        regName: "长岭镇",
        proNum: 48,
        engTpOneProNum: 1,
        engTpTwoProNum: 16,
        engTpThreeProNum: 31,
      },
      {
        regCode: "500101155000",
        regName: "长滩镇",
        proNum: 65,
        engTpOneProNum: 1,
        engTpTwoProNum: 14,
        engTpThreeProNum: 50,
      },
      {
        regCode: "500101141000",
        regName: "熊家镇",
        proNum: 21,
        engTpOneProNum: 1,
        engTpTwoProNum: 17,
        engTpThreeProNum: 3,
      },
      {
        regCode: "500101149000",
        regName: "新田镇",
        proNum: 15,
        engTpOneProNum: 1,
        engTpTwoProNum: 7,
        engTpThreeProNum: 7,
      },
      {
        regCode: "500101136000",
        regName: "响水镇",
        proNum: 18,
        engTpOneProNum: 0,
        engTpTwoProNum: 6,
        engTpThreeProNum: 12,
      },
      {
        regCode: "500101225000",
        regName: "溪口乡",
        proNum: 31,
        engTpOneProNum: 0,
        engTpTwoProNum: 6,
        engTpThreeProNum: 25,
      },
      {
        regCode: "500101212000",
        regName: "铁峰乡",
        proNum: 19,
        engTpOneProNum: 0,
        engTpTwoProNum: 7,
        engTpThreeProNum: 12,
      },
      {
        regCode: "500101132000",
        regName: "孙家镇",
        proNum: 18,
        engTpOneProNum: 0,
        engTpTwoProNum: 7,
        engTpThreeProNum: 11,
      },
      {
        regCode: "500101237000",
        regName: "普子乡",
        proNum: 15,
        engTpOneProNum: 0,
        engTpTwoProNum: 3,
        engTpThreeProNum: 12,
      },
      {
        regCode: "500101151000",
        regName: "龙驹镇",
        proNum: 92,
        engTpOneProNum: 1,
        engTpTwoProNum: 2,
        engTpThreeProNum: 89,
      },
      {
        regCode: "500101138000",
        regName: "瀼渡镇",
        proNum: 9,
        engTpOneProNum: 0,
        engTpTwoProNum: 6,
        engTpThreeProNum: 3,
      },
      {
        regCode: "500101144000",
        regName: "分水镇",
        proNum: 49,
        engTpOneProNum: 2,
        engTpTwoProNum: 35,
        engTpThreeProNum: 12,
      },
      {
        regCode: "500101025000",
        regName: "五桥街",
        proNum: 9,
        engTpOneProNum: 0,
        engTpTwoProNum: 6,
        engTpThreeProNum: 3,
      },
      {
        regCode: "500101226000",
        regName: "长坪乡",
        proNum: 4,
        engTpOneProNum: 0,
        engTpTwoProNum: 3,
        engTpThreeProNum: 1,
      },
      {
        regCode: "500101239000",
        regName: "恒合土",
        proNum: 41,
        engTpOneProNum: 1,
        engTpTwoProNum: 9,
        engTpThreeProNum: 31,
      },
      {
        regCode: "500101146000",
        regName: "后山镇",
        proNum: 19,
        engTpOneProNum: 1,
        engTpTwoProNum: 6,
        engTpThreeProNum: 12,
      },
      {
        regCode: "500101147000",
        regName: "弹子镇",
        proNum: 50,
        engTpOneProNum: 0,
        engTpTwoProNum: 10,
        engTpThreeProNum: 40,
      },
      {
        regCode: "500101156000",
        regName: "太安镇",
        proNum: 32,
        engTpOneProNum: 0,
        engTpTwoProNum: 10,
        engTpThreeProNum: 22,
      },
      {
        regCode: "500101150000",
        regName: "白羊镇",
        proNum: 65,
        engTpOneProNum: 2,
        engTpTwoProNum: 8,
        engTpThreeProNum: 55,
      },
      {
        regCode: "500101244000",
        regName: "黄柏乡",
        proNum: 17,
        engTpOneProNum: 0,
        engTpTwoProNum: 7,
        engTpThreeProNum: 10,
      },
      {
        regCode: "500101247000",
        regName: "茨竹乡",
        proNum: 23,
        engTpOneProNum: 0,
        engTpTwoProNum: 1,
        engTpThreeProNum: 22,
      },
      {
        regCode: "500101123000",
        regName: "新乡镇",
        proNum: 8,
        engTpOneProNum: 1,
        engTpTwoProNum: 5,
        engTpThreeProNum: 2,
      },
      {
        regCode: "500101135000",
        regName: "龙沙镇",
        proNum: 16,
        engTpOneProNum: 2,
        engTpTwoProNum: 7,
        engTpThreeProNum: 7,
      },
      {
        regCode: "500101157000",
        regName: "白土镇",
        proNum: 38,
        engTpOneProNum: 1,
        engTpTwoProNum: 12,
        engTpThreeProNum: 25,
      },
      {
        regCode: "500101154000",
        regName: "太龙镇",
        proNum: 17,
        engTpOneProNum: 0,
        engTpTwoProNum: 9,
        engTpThreeProNum: 8,
      },
      {
        regCode: "500101140000",
        regName: "天城街",
        proNum: 11,
        engTpOneProNum: 0,
        engTpTwoProNum: 9,
        engTpThreeProNum: 2,
      },
      {
        regCode: "500101026000",
        regName: "陈家坝",
        proNum: 5,
        engTpOneProNum: 0,
        engTpTwoProNum: 3,
        engTpThreeProNum: 2,
      },
      {
        regCode: "500101142000",
        regName: "高梁镇",
        proNum: 23,
        engTpOneProNum: 5,
        engTpTwoProNum: 7,
        engTpThreeProNum: 11,
      },
      {
        regCode: "500101109000",
        regName: "小周镇",
        proNum: 10,
        engTpOneProNum: 0,
        engTpTwoProNum: 5,
        engTpThreeProNum: 5,
      },
      {
        regCode: "500101022000",
        regName: "沙河街",
        proNum: 1,
        engTpOneProNum: 0,
        engTpTwoProNum: 0,
        engTpThreeProNum: 1,
      },
      {
        regCode: "500101110000",
        regName: "大周镇",
        proNum: 5,
        engTpOneProNum: 0,
        engTpTwoProNum: 4,
        engTpThreeProNum: 1,
      },
      {
        regCode: "500101158000",
        regName: "郭村镇",
        proNum: 10,
        engTpOneProNum: 0,
        engTpTwoProNum: 10,
        engTpThreeProNum: 0,
      },
      {
        regCode: "500101143000",
        regName: "李河镇",
        proNum: 13,
        engTpOneProNum: 2,
        engTpTwoProNum: 9,
        engTpThreeProNum: 2,
      },
      {
        regCode: "500101024000",
        regName: "百安坝",
        proNum: 2,
        engTpOneProNum: 0,
        engTpTwoProNum: 2,
        engTpThreeProNum: 0,
      },
      {
        regCode: "500101020000",
        regName: "龙都街",
        proNum: 3,
        engTpOneProNum: 0,
        engTpTwoProNum: 2,
        engTpThreeProNum: 1,
      },
      {
        regCode: "500101201000",
        regName: "柱山乡",
        proNum: 2,
        engTpOneProNum: 1,
        engTpTwoProNum: 1,
        engTpThreeProNum: 0,
      },
      {
        regCode: "500101019000",
        regName: "双河口",
        proNum: 4,
        engTpOneProNum: 0,
        engTpTwoProNum: 4,
        engTpThreeProNum: 0,
      },
    ];
    this.listdata = [
      {
        name: "高笋塘街道",
        code: "500101001000",
        value: 0,
        obj: {
          proNum: 0,
        },
      },
      {
        name: "太白街道",
        code: "500101017000",
        value: 28,
        obj: {
          regCode: "500101017000",
          regName: "太白街",
          proNum: 28,
          engTpOneProNum: 24,
          engTpTwoProNum: 0,
          engTpThreeProNum: 4,
        },
      },
      {
        name: "牌楼街道",
        code: "500101018000",
        value: 0,
        obj: {
          proNum: 0,
        },
      },
      {
        name: "双河口街道",
        code: "500101019000",
        value: 4,
        obj: {
          regCode: "500101019000",
          regName: "双河口",
          proNum: 4,
          engTpOneProNum: 0,
          engTpTwoProNum: 4,
          engTpThreeProNum: 0,
        },
      },
      {
        name: "龙都街道",
        code: "500101020000",
        value: 3,
        obj: {
          regCode: "500101020000",
          regName: "龙都街",
          proNum: 3,
          engTpOneProNum: 0,
          engTpTwoProNum: 2,
          engTpThreeProNum: 1,
        },
      },
      {
        name: "周家坝街道",
        code: "500101021000",
        value: 0,
        obj: {
          proNum: 0,
        },
      },
      {
        name: "沙河街道",
        code: "500101022000",
        value: 1,
        obj: {
          regCode: "500101022000",
          regName: "沙河街",
          proNum: 1,
          engTpOneProNum: 0,
          engTpTwoProNum: 0,
          engTpThreeProNum: 1,
        },
      },
      {
        name: "钟鼓楼街道",
        code: "500101023000",
        value: 10,
        obj: {
          regCode: "500101023000",
          regName: "钟鼓楼",
          proNum: 10,
          engTpOneProNum: 0,
          engTpTwoProNum: 7,
          engTpThreeProNum: 3,
        },
      },
      {
        name: "百安坝街道",
        code: "500101024000",
        value: 2,
        obj: {
          regCode: "500101024000",
          regName: "百安坝",
          proNum: 2,
          engTpOneProNum: 0,
          engTpTwoProNum: 2,
          engTpThreeProNum: 0,
        },
      },
      {
        name: "五桥街道",
        code: "500101025000",
        value: 9,
        obj: {
          regCode: "500101025000",
          regName: "五桥街",
          proNum: 9,
          engTpOneProNum: 0,
          engTpTwoProNum: 6,
          engTpThreeProNum: 3,
        },
      },
      {
        name: "陈家坝街道",
        code: "500101026000",
        value: 5,
        obj: {
          regCode: "500101026000",
          regName: "陈家坝",
          proNum: 5,
          engTpOneProNum: 0,
          engTpTwoProNum: 3,
          engTpThreeProNum: 2,
        },
      },
      {
        name: "小周镇",
        code: "500101109000",
        value: 10,
        obj: {
          regCode: "500101109000",
          regName: "小周镇",
          proNum: 10,
          engTpOneProNum: 0,
          engTpTwoProNum: 5,
          engTpThreeProNum: 5,
        },
      },
      {
        name: "大周镇",
        code: "500101110000",
        value: 5,
        obj: {
          regCode: "500101110000",
          regName: "大周镇",
          proNum: 5,
          engTpOneProNum: 0,
          engTpTwoProNum: 4,
          engTpThreeProNum: 1,
        },
      },
      {
        name: "新乡镇",
        code: "500101123000",
        value: 8,
        obj: {
          regCode: "500101123000",
          regName: "新乡镇",
          proNum: 8,
          engTpOneProNum: 1,
          engTpTwoProNum: 5,
          engTpThreeProNum: 2,
        },
      },
      {
        name: "孙家镇",
        code: "500101132000",
        value: 18,
        obj: {
          regCode: "500101132000",
          regName: "孙家镇",
          proNum: 18,
          engTpOneProNum: 0,
          engTpTwoProNum: 7,
          engTpThreeProNum: 11,
        },
      },
      {
        name: "高峰街道",
        code: "500101134000",
        value: 5,
        obj: {
          regCode: "500101134000",
          regName: "高峰街",
          proNum: 5,
          engTpOneProNum: 1,
          engTpTwoProNum: 4,
          engTpThreeProNum: 0,
        },
      },
      {
        name: "龙沙镇",
        code: "500101135000",
        value: 16,
        obj: {
          regCode: "500101135000",
          regName: "龙沙镇",
          proNum: 16,
          engTpOneProNum: 2,
          engTpTwoProNum: 7,
          engTpThreeProNum: 7,
        },
      },
      {
        name: "响水镇",
        code: "500101136000",
        value: 18,
        obj: {
          regCode: "500101136000",
          regName: "响水镇",
          proNum: 18,
          engTpOneProNum: 0,
          engTpTwoProNum: 6,
          engTpThreeProNum: 12,
        },
      },
      {
        name: "武陵镇",
        code: "500101137000",
        value: 5,
        obj: {
          regCode: "500101137000",
          regName: "武陵镇",
          proNum: 5,
          engTpOneProNum: 1,
          engTpTwoProNum: 3,
          engTpThreeProNum: 1,
        },
      },
      {
        name: "瀼渡镇",
        code: "500101138000",
        value: 9,
        obj: {
          regCode: "500101138000",
          regName: "瀼渡镇",
          proNum: 9,
          engTpOneProNum: 0,
          engTpTwoProNum: 6,
          engTpThreeProNum: 3,
        },
      },
      {
        name: "甘宁镇",
        code: "500101139000",
        value: 16,
        obj: {
          regCode: "500101139000",
          regName: "甘宁镇",
          proNum: 16,
          engTpOneProNum: 2,
          engTpTwoProNum: 10,
          engTpThreeProNum: 4,
        },
      },
      {
        name: "天城街道",
        code: "500101140000",
        value: 11,
        obj: {
          regCode: "500101140000",
          regName: "天城街",
          proNum: 11,
          engTpOneProNum: 0,
          engTpTwoProNum: 9,
          engTpThreeProNum: 2,
        },
      },
      {
        name: "熊家镇",
        code: "500101141000",
        value: 21,
        obj: {
          regCode: "500101141000",
          regName: "熊家镇",
          proNum: 21,
          engTpOneProNum: 1,
          engTpTwoProNum: 17,
          engTpThreeProNum: 3,
        },
      },
      {
        name: "高梁镇",
        code: "500101142000",
        value: 23,
        obj: {
          regCode: "500101142000",
          regName: "高梁镇",
          proNum: 23,
          engTpOneProNum: 5,
          engTpTwoProNum: 7,
          engTpThreeProNum: 11,
        },
      },
      {
        name: "李河镇",
        code: "500101143000",
        value: 13,
        obj: {
          regCode: "500101143000",
          regName: "李河镇",
          proNum: 13,
          engTpOneProNum: 2,
          engTpTwoProNum: 9,
          engTpThreeProNum: 2,
        },
      },
      {
        name: "分水镇",
        code: "500101144000",
        value: 49,
        obj: {
          regCode: "500101144000",
          regName: "分水镇",
          proNum: 49,
          engTpOneProNum: 2,
          engTpTwoProNum: 35,
          engTpThreeProNum: 12,
        },
      },
      {
        name: "余家镇",
        code: "500101145000",
        value: 39,
        obj: {
          regCode: "500101145000",
          regName: "余家镇",
          proNum: 39,
          engTpOneProNum: 1,
          engTpTwoProNum: 21,
          engTpThreeProNum: 17,
        },
      },
      {
        name: "后山镇",
        code: "500101146000",
        value: 19,
        obj: {
          regCode: "500101146000",
          regName: "后山镇",
          proNum: 19,
          engTpOneProNum: 1,
          engTpTwoProNum: 6,
          engTpThreeProNum: 12,
        },
      },
      {
        name: "弹子镇",
        code: "500101147000",
        value: 50,
        obj: {
          regCode: "500101147000",
          regName: "弹子镇",
          proNum: 50,
          engTpOneProNum: 0,
          engTpTwoProNum: 10,
          engTpThreeProNum: 40,
        },
      },
      {
        name: "长岭镇",
        code: "500101148000",
        value: 48,
        obj: {
          regCode: "500101148000",
          regName: "长岭镇",
          proNum: 48,
          engTpOneProNum: 1,
          engTpTwoProNum: 16,
          engTpThreeProNum: 31,
        },
      },
      {
        name: "新田镇",
        code: "500101149000",
        value: 15,
        obj: {
          regCode: "500101149000",
          regName: "新田镇",
          proNum: 15,
          engTpOneProNum: 1,
          engTpTwoProNum: 7,
          engTpThreeProNum: 7,
        },
      },
      {
        name: "白羊镇",
        code: "500101150000",
        value: 65,
        obj: {
          regCode: "500101150000",
          regName: "白羊镇",
          proNum: 65,
          engTpOneProNum: 2,
          engTpTwoProNum: 8,
          engTpThreeProNum: 55,
        },
      },
      {
        name: "龙驹镇",
        code: "500101151000",
        value: 92,
        obj: {
          regCode: "500101151000",
          regName: "龙驹镇",
          proNum: 92,
          engTpOneProNum: 1,
          engTpTwoProNum: 2,
          engTpThreeProNum: 89,
        },
      },
      {
        name: "走马镇",
        code: "500101152000",
        value: 52,
        obj: {
          regCode: "500101152000",
          regName: "走马镇",
          proNum: 52,
          engTpOneProNum: 1,
          engTpTwoProNum: 15,
          engTpThreeProNum: 36,
        },
      },
      {
        name: "罗田镇",
        code: "500101153000",
        value: 30,
        obj: {
          regCode: "500101153000",
          regName: "罗田镇",
          proNum: 30,
          engTpOneProNum: 1,
          engTpTwoProNum: 15,
          engTpThreeProNum: 14,
        },
      },
      {
        name: "太龙镇",
        code: "500101154000",
        value: 17,
        obj: {
          regCode: "500101154000",
          regName: "太龙镇",
          proNum: 17,
          engTpOneProNum: 0,
          engTpTwoProNum: 9,
          engTpThreeProNum: 8,
        },
      },
      {
        name: "长滩镇",
        code: "500101155000",
        value: 65,
        obj: {
          regCode: "500101155000",
          regName: "长滩镇",
          proNum: 65,
          engTpOneProNum: 1,
          engTpTwoProNum: 14,
          engTpThreeProNum: 50,
        },
      },
      {
        name: "太安镇",
        code: "500101156000",
        value: 32,
        obj: {
          regCode: "500101156000",
          regName: "太安镇",
          proNum: 32,
          engTpOneProNum: 0,
          engTpTwoProNum: 10,
          engTpThreeProNum: 22,
        },
      },
      {
        name: "白土镇",
        code: "500101157000",
        value: 38,
        obj: {
          regCode: "500101157000",
          regName: "白土镇",
          proNum: 38,
          engTpOneProNum: 1,
          engTpTwoProNum: 12,
          engTpThreeProNum: 25,
        },
      },
      {
        name: "郭村镇",
        code: "500101158000",
        value: 10,
        obj: {
          regCode: "500101158000",
          regName: "郭村镇",
          proNum: 10,
          engTpOneProNum: 0,
          engTpTwoProNum: 10,
          engTpThreeProNum: 0,
        },
      },
      {
        name: "柱山乡",
        code: "500101201000",
        value: 2,
        obj: {
          regCode: "500101201000",
          regName: "柱山乡",
          proNum: 2,
          engTpOneProNum: 1,
          engTpTwoProNum: 1,
          engTpThreeProNum: 0,
        },
      },
      {
        name: "铁峰乡",
        code: "500101212000",
        value: 19,
        obj: {
          regCode: "500101212000",
          regName: "铁峰乡",
          proNum: 19,
          engTpOneProNum: 0,
          engTpTwoProNum: 7,
          engTpThreeProNum: 12,
        },
      },
      {
        name: "溪口乡",
        code: "500101225000",
        value: 31,
        obj: {
          regCode: "500101225000",
          regName: "溪口乡",
          proNum: 31,
          engTpOneProNum: 0,
          engTpTwoProNum: 6,
          engTpThreeProNum: 25,
        },
      },
      {
        name: "长坪乡",
        code: "500101226000",
        value: 4,
        obj: {
          regCode: "500101226000",
          regName: "长坪乡",
          proNum: 4,
          engTpOneProNum: 0,
          engTpTwoProNum: 3,
          engTpThreeProNum: 1,
        },
      },
      {
        name: "燕山乡",
        code: "500101227000",
        value: 7,
        obj: {
          regCode: "500101227000",
          regName: "燕山乡",
          proNum: 7,
          engTpOneProNum: 1,
          engTpTwoProNum: 0,
          engTpThreeProNum: 6,
        },
      },
      {
        name: "梨树乡",
        code: "500101234000",
        value: 22,
        obj: {
          regCode: "500101234000",
          regName: "梨树乡",
          proNum: 22,
          engTpOneProNum: 1,
          engTpTwoProNum: 1,
          engTpThreeProNum: 20,
        },
      },
      {
        name: "普子乡",
        code: "500101237000",
        value: 15,
        obj: {
          regCode: "500101237000",
          regName: "普子乡",
          proNum: 15,
          engTpOneProNum: 0,
          engTpTwoProNum: 3,
          engTpThreeProNum: 12,
        },
      },
      {
        name: "地宝土家族乡",
        code: "500101238000",
        value: 16,
        obj: {
          regCode: "500101238000",
          regName: "地宝土",
          proNum: 16,
          engTpOneProNum: 0,
          engTpTwoProNum: 4,
          engTpThreeProNum: 12,
        },
      },
      {
        name: "恒合土家族乡",
        code: "500101239000",
        value: 41,
        obj: {
          regCode: "500101239000",
          regName: "恒合土",
          proNum: 41,
          engTpOneProNum: 1,
          engTpTwoProNum: 9,
          engTpThreeProNum: 31,
        },
      },
      {
        name: "黄柏乡",
        code: "500101244000",
        value: 17,
        obj: {
          regCode: "500101244000",
          regName: "黄柏乡",
          proNum: 17,
          engTpOneProNum: 0,
          engTpTwoProNum: 7,
          engTpThreeProNum: 10,
        },
      },
      {
        name: "九池街道",
        code: "500101245000",
        value: 8,
        obj: {
          regCode: "500101245000",
          regName: "九池街",
          proNum: 8,
          engTpOneProNum: 0,
          engTpTwoProNum: 6,
          engTpThreeProNum: 2,
        },
      },
      {
        name: "茨竹乡",
        code: "500101247000",
        value: 23,
        obj: {
          regCode: "500101247000",
          regName: "茨竹乡",
          proNum: 23,
          engTpOneProNum: 0,
          engTpTwoProNum: 1,
          engTpThreeProNum: 22,
        },
      },
    ];
    this.renderMap();
  },
  methods: {
    // 地图
    // 地图
    async renderMap() {
      let that = this
      this.options2 = {}
      if (this.resdata == null) {
        this.resdata = await axios.get(
          `/xzqh.json`
        )
      }
      this.options2 = {
        tooltip: {
          trigger: 'item',
          formatter: params => {
            const value = params.value
            return params.name + ' : ' + this.unitName + ' ' + value + this.unit
          }
        },
        visualMap: {
          orient: 'horizontal',
          right: 20, //控制地图下方色卡位置
          bottom: 17,
          min: 0,
          max: 100,
          realtime: false,
          calculable: true,
          inRange: {
            color: ['rgb(186, 231, 255)', 'rgb(0, 81, 180)']
          }
        },
        series: [
          {
            name: '地图',
            type: 'map',
            mapType: 'AQ', // 自定义扩展图表类型
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: function (data) {
                  return `{a|${data.name}}`
                },
                rich: {
                  a: {
                    color: '#333333',
                    fontSize: 14,
                    lineHeight: 32
                  },
                  b: {
                    color: '#999999',
                    fontSize: 18
                  }
                }
              }
            },
            labelLayout: {
              // 标签隐藏
              hideOverlap: true
              // moveOverlap: 'shiftX',
            },
            // labelLayout: (params) => { // 标签避让
            //     console.log(params)
            //     return {
            //         x: params.rect.x,
            //         moveOverlap: 'shiftY'
            //     }
            // },
            aspectScale: 1.3, //长宽比
            data: []
          }
        ]
      }
      let newdata = cloneDeep(this.resdata.data)
      newdata.features.pop()
      newdata.features.forEach(item => {
        item.properties.name = item.properties.Name
      })
      this.geoJson = cloneDeep(newdata)
      echarts.registerMap('AQ', this.geoJson)
      this.listdata = newdata.features.map(item => {
        return {
          name: item.properties.Name,
          code: item.properties.Code
        }
      })
        console.log('this.listdata: ', this.listdata);


      this.max = 0

      console.log('this.allGSGC: ', this.allGSGC)
      if (this.showType == 1) {
        this.listdata.forEach(item => {
          if (this.allGSGC.filter(i => i.regCode == item.code).length > 0) {
            item.value = this.allGSGC.filter(
              i => i.regCode == item.code
            )[0]?.proNum
            item.obj = this.allGSGC.filter(i => i.regCode == item.code)[0]
            this.max = item.value >= this.max ? item.value : this.max
          } else {
            item.value = 0
            item.obj = {
              proNum: 0
            }
          }
        })
      } else if (this.showType == 2) {
        this.listdata.forEach(item => {
          if (this.allSZJC.filter(i => i.regCode == item.code).length > 0) {
            item.value = this.allSZJC.filter(
              i => i.regCode == item.code
            )[0]?.totalNum
            item.obj = this.allSZJC.filter(i => i.regCode == item.code)[0]
            this.max = item.value >= this.max ? item.value : this.max
          } else {
            item.value = 0
            item.obj = {
              unQuaNum: 0,
              quaNum: 0
            }
          }
        })
      } else if (this.showType == 3) {
        this.listdata.forEach(item => {
          if (this.allGSTS.filter(i => i.regCode == item.code).length > 0) {
            item.value = this.allGSTS.filter(
              i => i.regCode == item.code
            )[0]?.totalNum
            item.obj = this.allGSTS.filter(i => i.regCode == item.code)[0]
            this.max = item.value >= this.max ? item.value : this.max
          } else {
            item.value = 0
            item.obj = {}
          }
        })
      }
      this.options2.series[0].data = this.listdata
      this.options2.visualMap.max = this.max ? this.max : 100
      this.$refs.heatmap.chart.setOption(this.options2)
      console.log('this.options2: ', this.options2)
    },
    // 点击
    clickEcharts(params) {
      console.log(params);
      this.showTitle = params.data.name;
      this.regCode = params.data.code;
    },
  },
};
</script>

<style lang="less" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>