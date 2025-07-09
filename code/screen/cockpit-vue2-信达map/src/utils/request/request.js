import axios from "axios";
import { VueAxios } from "./axios";
import { Modal, notification, Icon } from "ant-design-vue";
import qs from "qs";
import { getToken } from "../user";

export const GT = "f6817f48arrsfb3af11b9e8bffhd11218b";

let apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

// TODO
// 创建 axios 实例
const service = axios.create({
  // baseURL: apiBaseUrl,
  baseURL:
    process.env.NODE_ENV == "development"
      ? apiBaseUrl
      : `${window.location.origin}${apiBaseUrl}`, // api base_url
  timeout: 30000, // 请求超时时间
});
const notificationKey = "error";
const errorIcon = (h) => {
  return h(Icon, {
    props: { type: "close-circle" },
    style: { color: "red" },
  });
};

const err = (error) => {
  if (error.response) {
    let data = error.response.data;
    const token = getToken();
    switch (error.response.status) {
      case 401: {
        notification.open({
          key: notificationKey,
          message: "系统提示",
          description: "未授权，请重新登录",
          icon: errorIcon,
          duration: 4,
        });
        if (token) {
          // TODO 退出登录
        }
        break;
      }
      case 403: {
        notification.open({
          key: notificationKey,
          message: "系统提示",
          description: "拒绝访问",
          icon: errorIcon,
          duration: 4,
        });
        break;
      }
      case 404: {
        notification.open({
          key: notificationKey,
          message: "系统提示",
          description: "很抱歉，资源未找到!",
          icon: errorIcon,
          duration: 4,
        });
        break;
      }
      case 500: {
        const type = error.response.request.responseType;
        if (type === "blob") {
          blobToJson(data);
          break;
        }
        let errMsg = data.message || data || "";
        errMsg = errMsg.toLowerCase();
        if (
          errMsg.includes("token无效") ||
          errMsg.includes("token失效") ||
          errMsg.includes("token非法无效") ||
          errMsg.includes("token不能为空") ||
          errMsg.includes("token为空")
        ) {
          // TODO 退出登录
        }
        break;
      }
      case 502: {
        notification.open({
          key: notificationKey,
          message: "系统提示",
          description: "网关错误",
          duration: 4,
          icon: errorIcon,
        });
        break;
      }
      case 504: {
        notification.open({
          key: notificationKey,
          message: "系统提示",
          description: "网络超时",
          icon: errorIcon,
          duration: 4,
        });
        break;
      }
      default: {
        notification.open({
          key: notificationKey,
          message: "系统提示",
          description: "网络异常",
          icon: errorIcon,
          duration: 4,
        });
        break;
      }
    }
  } else if (error.message) {
    if (error.message.includes("timeout")) {
      notification.open({
        key: notificationKey,
        message: "系统提示",
        description: "网络超时",
        icon: errorIcon,
        duration: 4,
      });
    } else {
      notification.open({
        key: notificationKey,
        message: "系统提示",
        description: "网络异常",
        icon: errorIcon,
        duration: 4,
      });
    }
  }
  return Promise.reject(error);
};

service.interceptors.request.use(
  (config) => {
    if (GT) {
      config.headers["gt"] = GT;
    }
    if (config.method === "get") {
      //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }

    //url检查，不允许api用相对路径，如果最前面不是/，添加一个/
    if (config.url.indexOf("http") != 0) {
      if (config.url.indexOf("/") != 0) {
        config.url = "/" + config.url;
      }
    }

    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }

    if (config.url == "/auth/login") {
      config.headers["Authorization"] = "Basic cGNtX3dlYg==";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  let type = response.request.responseType;
  if (type === "blob") {
    return response.data;
  }

  if (response.data && !response.data.success) {
    notification.destroy();
    notification.error({
      message: "系统提示",
      description: response.data.message || response.data,
      duration: 4,
    });
  } else {
    return response.data;
  }
}, err);

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service);
  },
};
/**
 * Blob解析
 * @param data
 */
function blobToJson(data) {
  let fileReader = new FileReader();
  let token = getToken();
  fileReader.onload = function () {
    try {
      let jsonData = JSON.parse(this.result); // 说明是普通对象数据，后台转换失败
      console.log("jsonData", jsonData);
      if (jsonData.status === 500) {
        console.log("token----------》", token);
        if (token && jsonData.message.includes("Token失效")) {
          Modal.error({
            title: "登录已过期",
            content: "很抱歉，登录已过期，请重新登录",
            okText: "重新登录",
            mask: false,
            onOk: () => {
              // TODO 退出登录
            },
          });
        }
      }
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      console.log("blob解析fileReader返回err", err);
    }
  };
  fileReader.readAsText(data);
}

export { installer as VueAxios, service as axios };
