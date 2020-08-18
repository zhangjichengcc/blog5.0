
// 获取一个给定长度的随机字符串，默认长度是 30
export function getRandomString(len = 30) {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /* ***默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  const maxPosition = chars.length;
  let targetStr = '';
  for (let i = 0; i < len; i += 1) {
    targetStr += chars.charAt(Math.floor(Math.random() * maxPosition));
  }
  return targetStr;
}

// 获取当前时间戳，以秒为单位
export function getCurrentTime() {
  return Math.floor((new Date().getTime() / 1000));
}

// 格式化时间
export function formatTime(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// 格式化电话号码
export function formatPhone(tel) {
  if (!tel) return '';
  if (tel === 'null') return '';
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return `${tel}`.replace(reg, '$1****$2');
}

// 移除字符串空格
export function trim(str) {
  if (!str) return;
  const strVal = str.replace(/\s+/g, "");
  // eslint-disable-next-line
  return strVal;
}

export function compress(img) {
  let { width, height} = img;
  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  // let ratio = width * height / 4000000;
  // if (ratio > 1) {
  //   ratio = Math.sqrt(ratio);
  //   width /= ratio;
  //   height /= ratio;
  // } else {
  //   ratio = 1;
  // }
  let ratio = 1;
  const w = width / 640;
  const h = height / 640;
  if (w < 1 && height < 1) {
    ratio = 1;
  } else if (w > h) {
    ratio = w;
    width = 640;
    height /= ratio;
  } else if (h > w) {
    ratio = h;
    width /= ratio;
    height = 640;
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx;
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }
  // canvas的toDataURL只能转jpg的
  if (ctx) {
    // 铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 如果图片像素大于100万则使用瓦片绘制
  let count = width * height / 1000000;
  if (count > 1) {
    count = parseInt((Math.sqrt(count) + 1), 10); // 计算要分成多少块瓦片

    // 计算每块瓦片的宽和高
    const nw = parseInt((width / count), 10);
    const nh = parseInt((height / count), 10);
    const tCanvas = document.createElement('canvas');
    tCanvas.width = nw;
    tCanvas.height = nh;
    let tctx;
    if (tCanvas.getContext) {
      tctx = tCanvas.getContext('2d');
      for (let i = 0; i < count; i+=1) {
        for (let j = 0; j < count; j+=1) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
  
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  const ndata = canvas.toDataURL('image/jpeg', 0.6);

  return ndata;
}

// 格式化身份证
export function formatData(str) {
  if (!str) return;
  const len = str.length;
  const firstWord = str.substr(0, 1);
  const lastWord = str.substr(len - 1);
  let s = '';
  for (let i = 0; i < len - 2; i += 1) {
    s += '*'
  }
  return `${firstWord}${s}${lastWord}`; // eslint-disable-line
}

// 函数节流
export const throttle = (() => {
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
  export const debounce = (() => {
  let timer = null;
  return (fn, delay = 3000) => {
    // debugger
    if (timer) {
      clearTimeout(timer);
    };
    timer = setTimeout(() => {
      fn();
    }, delay)
  }
  })();

  export const formatNum = num => {
    if (!num) return '0';
    const numP = parseInt(num, 10).toString();
    return `${numP.replace( /\B(?=(?:\d{3})+$)/g, ',' )}`;
  }
  
  // 控制小数位数
  export const controlDecimalNum = val => {
    let value = val;
    if (!value) return '0';
    value = value.replace(/[^\d.]/g, "");
    value = value.replace(/\.{2,}/g, ".");
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    if (value.indexOf(".") < 0 && value !== "") {
      value = parseFloat(value);
    }
    return value;
  }
