import crypto from 'crypto';

const storage = window.localStorage;
// 预生产配置
const yscEvn = {
  href: 'testtax.7easytax.com',
  loginUrl: true,
  corpid: 'wwd9f2daef41d58e5d',
  suiteid: 'ww4aec422707507006',
  scope: 'snsapi_privateinfo',
  vconsole: true,
  isProEvn: false,
};
// 生产配置
const scEvn = {
  href: 'etax.chongqing.chinatax.gov.cn:9901',
  loginUrl: true,
  corpid: 'ww32027afa6664a65a',
  suiteid: 'wwb025d1a906d925bc',
  scope: 'snsapi_privateinfo',
  vconsole: false,
  isProEvn: true,
}
// 本地配置
const loEvn = {
  href: 'localhost:8000',
  loginUrl: false,
  corpid: 'wwd9f2daef41d58e5d',
  suiteid: 'wwa44b591567bffa61',
  scope: 'snsapi_privateinfo',
  vconsole: true,
  isProEvn: false,
}

const config = {
  // 预生产环境
  'testtax.7easytax.com': yscEvn,
  // 本地
  'localhost:8000': loEvn,
  // 生产环境
  'etax.chongqing.chinatax.gov.cn:9901': scEvn,
};

const qywx = (() => {
  const { host } = window.location;
  return config[host] || scEvn;
})();

// 跟鉴权相关的一些常量
export const authKeyStore = {
  qywx,
  // 腾讯云
  qCloud: {
    appid: '1251483553',
    secretId: 'AKID43rV0KZSL4h9PWvN6f8RZVn02tY3qbfY',
    secretKey: 'y65uY6WnsqeIoESUXmw5HJ9tU3YxBF8p',
    secretId2: 'AKIDJTQ8csThIelimeKlz1qSr20lJemlv0FE',
    secretKey2: 'rUt41kGXaPzMUN4WieKkuCMHxObZHjxw',
  },
};

/*
 * 获取腾讯云人脸识别相关接口的签名
 * 详见 https://cloud.tencent.com/document/product/868/17697 的 Node JS 签名示例
 * */
export function createFaceSignature() {
  const { secretId, secretKey, appid } = authKeyStore.qCloud;
  const pexpired = 24 * 3600;
  const userid = 0;

  const now = parseInt(Date.now() / 1000, 10);
  const rdm = parseInt(Math.random() * 2 ** 32, 10);
  const plainText = `a=${appid}&k=${secretId}&e=${now + pexpired}&t=${now}&r=${rdm}${userid}&f=`;
  const data = Buffer.from(plainText, 'utf8');

  const res = crypto
    .createHmac('sha1', secretKey)
    .update(data)
    .digest();
  const bin = Buffer.concat([res, data]);
  return bin.toString('base64');
}
// authorization methods
export function getAuthorization() {
  return storage.getItem('Authorization');
}

export function setAuthorization(token) {
  return localStorage.setItem('Authorization', token);
}

export function removeAuthorization() {
  return localStorage.removeItem('Authorization');
}

export function setCorpId(code = '') {
  return storage.setItem('CorpId', code);
}

export function removeCorpId() {
  return storage.removeItem('CorpId');
}

export function getCorpId() {
  return storage.getItem('CorpId') || null;
}

export function getUserId() {
  return storage.getItem('UserId') || null;
}

export function setUserId(code = '') {
  return storage.setItem('UserId', code);
}

export function removeUserId() {
  return storage.removeItem('UserId');
}

// localStorage写入用户信息
export function setUserInfo(obj = {}) {
  const keys = Object.keys(obj) || [];
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const item = obj[key] || '';
    storage.setItem(key, item);
  }
}

export function setLoginToken(token = '') {
  return storage.setItem('loginToken', token);
}

export function getLoginToken() {
  return storage.getItem('loginToken');
}

export function removeLoginToken() {
  return storage.removeItem('loginToken');
}

export function setRealName(obj) {
  return storage.setItem('realName', JSON.stringify(obj));
}

export function removeRealName() {
  return storage.removeItem('realName');
}

export function getRealName() {
  return JSON.parse(storage.getItem('realName') || '{}');
}

export function getIgnoreLogin() {
  return JSON.parse(storage.getItem('ignoreLogin'));
}

export function getEnterpriseDetail(){
  const corpId = localStorage.getItem('CorpId');
  return JSON.parse(localStorage.getItem(`enterpriseDetail_${corpId}`) || '{}'); 
}

export function removeUserInfo() {
  removeCorpId();
  removeUserId();
  storage.removeItem('avatar');
  storage.removeItem('mobile');
}

// export function removeAuthorization() {
//   const corpId = storage.getItem('CorpId');
//   storage.removeItem('Authorization');
//   storage.removeItem(`enterpriseDetail_${corpId}`);
// }
