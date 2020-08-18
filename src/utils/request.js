import fetch from 'dva/fetch';
import { stringify } from 'qs';
// import router from 'umi/router';
// import { Toast } from 'antd-mobile';
// import { realnameLogin } from 'services/login';
import router from 'umi/router';
import config from '../config';
import { getAuthorization, removeAuthorization, getIgnoreLogin, authKeyStore } from './authorization';

const {
  qywx: { host },
} = authKeyStore;

// 是否展示错误码标识
const errorCodeShow = false;

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

// 防止同时调用多个接口时，多次调用登录
const debounceMeth = (method, context) => {
  // token失效-清除缓存token及企业信息
  removeAuthorization();
  const methods = method;
  clearTimeout(methods.tId);
  methods.tId = setTimeout(() => {
    methods.call(context);
  }, 2000);
};

// token失效，重新登录
const autoLogin = () => {
  const token = getAuthorization();
  const ignoreLogin = getIgnoreLogin();
  if(ignoreLogin) return;
  // 校验global是否已异步登录成功
  if (!token) {
    router.push({
      pathname: '/error',
      query: {
        title: '系统异常',
        text: '登录信息失效，请检查网络链接，并退出系统尝试重新登录.',
      }
    })
  }
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
  url = `${config.apiPrefix}${url}`;
  // Authorization 需要改成登录后获取
  const defaultOptions = {
    credentials: 'include',
    headers: {
      Authorization: getAuthorization() || '',
    },
  };
  const newOptions = {
    ...defaultOptions,
    ...option,
  };
  // 设置 Content-Type
  if (!(newOptions.body instanceof FormData)) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Host: host,
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    // newOptions.body is FormData
    newOptions.headers = {
      Accept: 'application/json',
      Host: host,
      ...newOptions.headers,
    };
  }

  // 转换 params 的参数
  if (newOptions.params) {
    url = `${url}?${stringify(newOptions.params)}`;
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.responseType) return response.blob(); // 仅用于附件下载--bei
      return response.json();
    })
    .then(response => {
      if (newOptions.responseType === 'blob') return response;
      const { code, msg } = response;
      // code 为 0 并且 data 存在的时候才返回数据，其他的均抛出异常，该异常属于业务异常
      if (code === 0) {
        return response;
      }
      if (code === 2) {
        return response;
      }
      if (code === -102 || code === -103) {
        const error = new Error(msg);
        error.response = response;
        error.code = code;
        error.name = code;
        throw error;
      } else {
        const error = new Error(msg);
        error.response = response;
        error.code = code;
        error.name = 'serviceError';
        throw error;
      }
    })
    .catch(ev => {
      const status = ev.name;
      if (status === -102 || status === -103) {
        // token失效
        debounceMeth(autoLogin, this);
      }
      if (status === 401) {
        // token失效
        debounceMeth(autoLogin, this);
      }
      // environment should not be used
      if (status === 403) {
        // 这里要写403的处理逻辑
        return ev.toString();
      }
      if (status <= 504 && status >= 500) {
        // 这里要写500的处理逻辑
        // Toast.fail('请求服务器接口异常', 1);
        return ev.toString();
      }
      if (status >= 404 && status < 422) {
        // 这里要写400的处理逻辑
        return ev.toString();
      }
      // 业务异常，需要将异常抛出，在业务代码里面进行异常处理
      if (status === 'serviceError') {
        const { response } = ev;
        const { code } = response;
        let { msg } = response;
        msg = errorCodeShow ? `${msg} (code:${code})` : msg;
        const error = new Error(msg);
        error.response = response;
        error.code = code;
        error.name = 'serviceError';
        throw error;
      }
      return ev.toString();
    });
}
