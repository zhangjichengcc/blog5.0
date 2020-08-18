 /*
 * 全局方法
 *
 * @date 2018-10-30
 * @author zhangjicheng
 */

// 金额按千位格式化 params: [price： 价格]，[dec: 小数位数，默认2位]
const formatPrice = (price, dec = 2) => {
	if (!price) return '0';
  const numP = parseFloat(price);
  const strP = numP.toFixed(dec);
  const int = strP.replace(/^(-?[0-9]*)\..*/, '$1');
  const float = strP.replace(/^(-?[0-9]*\.)/, '');
  return `${int.replace( /\B(?=(?:\d{3})+$)/g, ',' )}.${float}`;
}

// 百分比转换
const formatPercent = (p) => {
	if (!p) return '0%';
	return `${p * 100}%`;
}

// 根据日期生成季初和季末
const getQuarterDate = (date) => {
  const nowMonth = date.getMonth(); // 当月
  let nowYear = date.getFullYear(); // 当年
  nowYear += (nowYear < 2000) ? 1900 : 0;
  // 获取本季度开始的月份
  let quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  } else if (nowMonth > 2 && nowMonth < 6) {
    quarterStartMonth = 3;
  } else if (nowMonth > 5 && nowMonth < 9) {
    quarterStartMonth = 6;
  } else if (nowMonth > 8) {
    quarterStartMonth = 9;
  }

  // 获得某月的天数 
  function getMonthDays (month) { 
    const monthStartDate = new Date(nowYear, month, 1); 
    const monthEndDate = new Date(nowYear, month + 1, 1); 
    const days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
    return days; 
  } 

  // 获取本季度第一天
  const quarterStartDate = new Date(nowYear, quarterStartMonth, 1);
  // 得到本季度最后一天
  const quarterEndMonth = quarterStartMonth + 2;
  const quarterEndDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth)); 
  return [quarterStartDate, quarterEndDate];
}

// 日期格式化
const formatDate = (date, fmt) => {
  let format;
  function padLeftZero (str) {
    return (`00${str}`).substr(str.length)
  }
  if (/(y+)/.test(fmt)) {
    format = fmt.replace(RegExp.$1, (`${date.getFullYear()  }`).substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  Object.keys(o).map(key => {
    if (new RegExp(`(${key})`).test(format)) {
      const str = `${o[key]}`;
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
    return format;
  })
  return format;
}

// 获取当前日期所属季度的起止日期
const getQuarterQZ = (date, y) => { // params y: 是否包括年度
  const year = date.getFullYear();
  const season = Math.ceil((date.getMonth() + 1) / 3);
  switch (season) {
    case 1:
      return y ? [`${year}-01-01`, `${year}-12-31`] : [`${year}-01-01`, `${year}-03-31`];
    case 2:
      return [`${year}-04-01`, `${year}-06-30`];
    case 3:
      return [`${year}-07-01`, `${year}-09-30`];
    case 4:
      return [`${year}-10-01`, `${year}-12-31`];
    default:
      return false;
  }
}

// 方法日期 by 张吉成
const moment = (date) => {
  const now = new Date();
  const time = date ? new Date(date) : now;
  const formatRule = {
    // 年
    YYYY: time.getFullYear().toString(),
    yyyy: time.getFullYear().toString(),
    YY: time.getFullYear().toString().replace(/^[0-9]{2}([0-9]{2})$/,'$1'),
    yy: time.getFullYear().toString().replace(/^[0-9]{2}([0-9]{2})$/,'$1'),
    y: time.getFullYear().toString(),
    Y: time.getFullYear().toString(),
    // 月
    MM: (time.getMonth()+1).toString().replace(/^([0-9]{1})$/,'0$1'),
    M: (time.getMonth()+1).toString(),
    // 日
    DD: time.getDate().toString().replace(/^([0-9]{1})$/,'0$1'),
    dd: time.getDate().toString().replace(/^([0-9]{1})$/,'0$1'),
    D: time.getDate().toString(),
    d: time.getDate().toString(),
    // 时
    HH: time.getHours().toString().replace(/^([0-9]{1})$/,'0$1'),
    hh: time.getHours().toString().replace(/^([0-9]{1})$/,'0$1'),
    H: time.getHours() > 12 ? (time.getHours() % 12).toString() : (time.getHours()).toString(),
    h: time.getHours() > 12 ? (time.getHours() % 12).toString() : (time.getHours()).toString(),
    // 分
    mm: time.getMinutes().toString().replace(/^([0-9]{1})$/,'0$1'),
    m: time.getMinutes().toString(),
    // 秒
    ss: time.getSeconds().toString().replace(/^([0-9]{1})$/,'0$1'),
    s: time.getSeconds().toString(),
  };
  const defFormat = 'YYYY-MM-DD hh:mm:ss';
  class Moment{
    constructor(t){
      this.time = t;
      this.year = new Date(time).getFullYear();
      this.month = new Date(time).getMonth() + 1;
      this.date = new Date(time).getDate();
    }

    // 日期格式化
    format(format = defFormat) {
      let formatStr = format;
      const keys = Object.keys(formatRule);
      keys.forEach(key => {
        formatStr = formatStr.replace(key, formatRule[key]);
      })
      this.formatDate = formatStr;
      return formatStr;
    }

    // 日期算法
    addDay(day) {
      if(!time) return false;
      const newDate = new Date(time.getTime()+day*24*60*60*1e3);
      this.dataRes = newDate;
      return newDate;
    }

    // 日期算法
    addMonth(day) {
      if(!time) return false;
      const newDate = new Date(time.getFullYear(), time.getMonth() + day, time.getDate());
      this.dataRes = newDate;
      return newDate;
    }

    // getTime
    getTime() {
      if(!time) return false;
      const tiems = time.getTime();
      this.tiems = tiems;
      return tiems;
    }
  }
  return new Moment(time);
}

// 根据日期获取当月月初月末日期
const getMonthDate = (date) => {
  const nowMonth = date.getMonth(); // 当月
  let nowYear = date.getFullYear(); // 当年
  nowYear += (nowYear < 2000) ? 1900 : 0;
  
  // 获得某月的天数 
  function getMonthDays (month) { 
    const monthStartDate = new Date(nowYear, month, 1); 
    const monthEndDate = new Date(nowYear, month + 1, 1); 
    const days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
    return days; 
  } 

  // 获取本月第一天
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  // 获取本月最后一天
  const monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth)); 
  return [monthStartDate, monthEndDate];
}

// 判断当前是否为微信浏览器
const isWeiXin = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return (ua.indexOf('micromessenger') !== -1);
}

// 获得url参数
const getUrlParam = name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; // 返回参数值
};

// 格式化文件大小
const renderSize = (filesize) => {
  if (!filesize ) return '0Bytes';
  const unitArr = ["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"];
  let index=0;
  const srcsize = parseFloat(filesize);
  index = Math.floor(Math.log(srcsize)/Math.log(1024));
  let size = srcsize / 1024 ** index;
  size=size.toFixed(2); // 保留的小数位数
  return `${size}${unitArr[index]}`;
}

// 数字格式化
const renderNum = (num) => {
  const unitArr = ['', '万', '亿', '万亿'];
  let index = 0;
  let res = '';
  (function travel(count){
    if (count > 10000) {
      index += 1;
      travel(count/10000);
    } else {
      res = index ? count.toFixed(2) + unitArr[index] : count.toString();
    }
  })(num);
  return res;
}

// 函数节流
const throttle = (() => {
  let timer = false;
  return (fn, delay = 300) => {
    if (timer) return;
    fn();
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = false;
    }, delay)
  };
})();

// 函数防抖
const debounce = (() => {
  let timer = null;
  return (fn, delay = 300) => {
    if (timer) {
      clearTimeout(timer);
    };
    timer = setTimeout(() => {
      fn();
    }, delay)
  }
})();

const set2X = str => {
  if(!str) return '';
  return str.replace(/(\d+)px/g, (_$1, $2) => `${$2 * 2}px`);
}


export {
	formatPrice,
  formatPercent,
  getQuarterDate,
  getMonthDate,
  formatDate,
  getQuarterQZ,
  moment,
  isWeiXin,
  getUrlParam,
  renderSize,
  renderNum,
  throttle,
  debounce,
  set2X,
}
