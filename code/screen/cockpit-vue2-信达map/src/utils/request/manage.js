import { axios as axiosService } from "./request";
import signMd5Utils from "../md5";
import axios from "axios";
const tokenSourceMap = Object.create({});
function createSourceToken() {
  return axios.CancelToken.source();
}

function getCancelToken(value) {
  if (value) {
    return {
      cancelToken: value.token,
    };
  }
  return {};
}

// post
export function postAction(url,body, parameter) {
  let sign = signMd5Utils.getSign(url, body);
  // 将签名和时间戳，添加在请求接口 Header
  let signHeader = {
    "X-Sign": sign,
    "X-TIMESTAMP": signMd5Utils.getDateTimeToString(),
  };

  return axiosService({
    url: url,
    method: "post",
    data: body,
    headers: signHeader,
    params: parameter
  });
}

// post method= {post | put}
export function httpAction(url, parameter, method) {
  let sign = signMd5Utils.getSign(url, parameter);
  // 将签名和时间戳，添加在请求接口 Header
  let signHeader = {
    "X-Sign": sign,
    "X-TIMESTAMP": signMd5Utils.getDateTimeToString(),
  };

  return axiosService({
    url: url,
    method: method,
    data: parameter,
    headers: signHeader,
  });
}

// put
export function putAction(url, parameter, fullOptions = {}) {
  // 取消请求
  const useToken = fullOptions.useToken;
  if (useToken) {
    const tokenSource = tokenSourceMap[useToken];
    if (tokenSource) {
      tokenSourceMap[useToken].cancel();
    }
    tokenSourceMap[useToken] = createSourceToken();
  }
  return axiosService({
    url: url,
    method: "put",
    data: parameter,
  });
}

// get
export function getAction(url, parameter, fullOptions = {}) {
  let sign = signMd5Utils.getSign(url, parameter);
  // 将签名和时间戳，添加在请求接口 Header
  let signHeader = {
    "X-Sign": sign,
    "X-TIMESTAMP": signMd5Utils.getDateTimeToString(),
  };
  // 取消请求
  const useToken = fullOptions.useToken;
  if (useToken) {
    const tokenSource = tokenSourceMap[useToken];
    if (tokenSource) {
      tokenSourceMap[useToken].cancel();
    }
    tokenSourceMap[useToken] = createSourceToken();
  }

  return axiosService({
    url: url,
    method: "get",
    params: parameter,
    headers: signHeader,
    ...getCancelToken(tokenSourceMap[useToken]),
  });
}

// deleteAction
export function deleteAction(url, parameter) {
  return axiosService({
    url: url,
    method: "delete",
    params: parameter,
  });
}
