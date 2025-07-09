import { getItem, setItem, getUrlParams } from "../value";
import { getAction } from "@/utils";
import { getDictData } from "../dict/index";
class UserItemTag {
  /**
   * token
   */
  static token = "ACCESS_TOKEN";
  /**
   * dict
   */
  static dict = "DICT_DATA";
}

/**
 * 获取token
 */
function getToken() {
  return getItem(UserItemTag.token);
}

/**
 * 设置token
 */
function setToken(token) {
  setItem(UserItemTag.token, token);
}

let refreshToken = null;
function setRefreshToken(token) {
  refreshToken = token;
}

function getRefreshToken() {
  return refreshToken;
}

/**
 * 获取用户信息
 */
function getUserInfo() {
  return getAction(`/system/user/getInfo`, {}).then((res) => {
    return getDictData().then((dict) => {
      setItem(UserItemTag.dict, dict);
      return res;
    });
  });
}

export {
  UserItemTag,
  getToken,
  setToken,
  getUserInfo,
  setRefreshToken,
  getRefreshToken,
};
