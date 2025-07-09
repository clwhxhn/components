import axios from "axios";

function getTianAerial() {
  return `https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`;
  // return `${process.env.VUE_APP_TILE_SERVICE_URL}imagery/TianAerial/{z}/{x}/{y}`;
}

export { getTianAerial };
