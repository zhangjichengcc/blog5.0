/**
 * 调用腾讯云人脸识别 api 的 request 方法
 *
 * @date 2018-11-7
 * @author qinhui
 */

import fetch from 'dva/fetch';
import { stringify } from 'qs';
import config from '../config';

// 检验状态码， 200 表示请求成功
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.name = response.status;
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {object} [option] The option we want to pass to "fetch"
 * {
 *   url: '',
 *   method: 'get',
 *   params: params,
 *   headers: {}
 * }
 * {
 *   method: 'POST',
 *   mode: 'cors',
 *   body: JSON.stringify(tubState),
 *   headers: myHeaders
 *}
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(option) {
  let { url } = option;
  url = `${config.qywxPrefix}${url}`;

  // Authorization 需要改成登录后获取
  const defaultOptions = {};
  const newOptions = {
    ...defaultOptions,
    ...option,
  };

  // 设置 Content-Type
  if (!(newOptions.body instanceof FormData)) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    // newOptions.body is FormData
    newOptions.headers = {
      Accept: 'application/json',
      ...newOptions.headers,
    };
  }

  // 转换 params 的参数
  if (newOptions.params) {
    url = `${url}?${stringify(newOptions.params)}`;
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => response)
    .catch(e => {
      const status = e.name;
      if (status === 40014) {
        //
      }
      return e;
    });
}
