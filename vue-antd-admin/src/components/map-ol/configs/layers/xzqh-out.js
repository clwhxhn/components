import axios from "axios";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import { Fill, Stroke, Style } from "ol/style";
import { GeoJSON } from "ol/format";
// 矢量图层样式
const vectorImageryStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: "#666666",
      width: 9,
    }),
    fill: new Fill({
      color: "rgba(255, 255, 255,1)",
    }),
  });
};

// 卫星图层样式
const satelliteImageryStyle = () => {
  //   return new Style({
  //     stroke: new Stroke({
  //       color: "#C1F5FF",
  //       width: 3,
  //     }),
  //     fill: new Fill({
  //       color: "rgba(0,0,0,0.5)", // 设置面颜色
  //     }),
  //   });
  return [
    // 底层阴影效果
    new Style({
      stroke: new Stroke({
        color: "#000000", // 阴影颜色
        width: 10, // 阴影宽度
        lineCap: "butt", // 线帽样式
        lineJoin: "round", // 线条连接样式
      }),
    }),
    // 顶层实际边界
    new Style({
      stroke: new Stroke({
        color: "#C1F5FF",
        width: 3,
      }),
      fill: new Fill({
        color: "rgba(0,0,0,0.5)", // 设置面颜色
      }),
    }),
  ];
};

// 地形图层样式
const terrainImageryStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: "#40852a",
      width: 10,
    }),
  });
};

const style = (feature) => {
  return [
    // 底层阴影效果
    new Style({
      stroke: new Stroke({
        color: "#000000", // 阴影颜色
        width: 10, // 阴影宽度
      }),
    }),
    // 顶层实际边界
    new Style({
      stroke: new Stroke({
        color: "#C1F5FF", // 实际边界颜色
        width: 6, // 实际边界宽度
      }),
    }),
  ];
};

const layerName = "xzqhout";

export const config = {
  name: "行政区划蒙版",
  layerName,
  type: "Vector",
  styles: {
    vectorImageryStyle,
    satelliteImageryStyle,
    terrainImageryStyle,
  },
  layerHandle: new Promise((resolve, reject) => {
    axios
      .get(`/data/outxzqh.geojson`)
      .then((response) => {
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(response.data),
        });
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          renderMode: "image",
          style: style,
          layerName,
          zIndex: 2,
          visible: true,
        });
        resolve(vectorLayer);
      })
      .catch((error) => {
        reject(error);
      });
  }),
};
