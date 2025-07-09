// 部分接口实在太慢，所以在一进入系统的时候就提前发起请求，并缓存请求值

import { getAction, postAction } from "../request/manage";

// 有url、body参数、query参数、方法名共同组成缓存的key
const createCacheKey = (url, body = {}, params = {}, method = "GET") => {
  return `${url}-${JSON.stringify(body)}-${JSON.stringify(
    params
  )}-${method.toUpperCase()}`;
};

/**
 * @type {import('./pre-request.d.ts').CacheMap}
 */
const cacheMap = {};

export const requestWithCache = (options) => {
  let { url, body = {}, params = {}, method = "GET" } = options;
  method = method.toUpperCase();
  const key = createCacheKey(url, body, params, method);
  let cacheItem = cacheMap[key];
  if (cacheItem) {
    // 如果已经请求过了并且拿到了返回值时，直接返回缓存的结果
    if (cacheItem.status === "fulfilled") {
      return Promise.resolve(cacheItem.result);
    }
    // 如果正在请求中时，将回调函数加入队列，等待有返回值时调用
    if (cacheItem.status === "pending") {
      return new Promise((resolve, reject) => {
        cacheItem.callbacks.push({ resolve, reject });
      });
    }
  } else {
    cacheItem = cacheMap[key] = {
      status: "pending",
      callbacks: [],
      result: null,
    };
  }

  const onResolve = (res) => {
    cacheItem.callbacks.forEach((it) => {
      it.resolve(res);
    });
    cacheItem.result = res;
    cacheItem.callbacks = [];
    cacheItem.status = "fulfilled";
  };

  const onReject = (res) => {
    cacheItem.callbacks.forEach((it) => {
      it.reject(res);
    });
    cacheItem.callbacks = [];
    cacheItem.status = "rejected";
  };

  return new Promise((resolve, reject) => {
    cacheItem.callbacks.push({ resolve, reject });
    if (method === "GET") {
      getAction(url, params)
        .then((res) => {
          if (res.success) {
            onResolve(res);
          } else {
            onReject(res);
          }
        })
        .catch(onReject);
    } else {
      postAction(url, body, params)
        .then((res) => {
          if (res.success) {
            onResolve(res);
          } else {
            onReject(res);
          }
        })
        .catch(onReject);
    }
  });
};
