/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length);
  let i = -1;
  let res = [];
  while (++i < len) {
    const item = arr2[i];
    if (arr1.indexOf(item) > -1) res.push(item);
  }
  return res;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some((_) => arr.indexOf(_) > -1);
};

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = (timeStamp) => {
  const timeStr = String(timeStamp);
  return timeStr.length > 10;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime;
};

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = (num) => {
  return num < 10 ? "0" + num : num;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000);
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const date = getHandledValue(d.getDate());
  const hours = getHandledValue(d.getHours());
  const minutes = getHandledValue(d.getMinutes());
  const second = getHandledValue(d.getSeconds());
  let resStr = "";
  if (startType === "year")
    resStr =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      second;
  else resStr = month + "-" + date + " " + hours + ":" + minutes;
  return resStr;
};

export const countDownFormat = (time) => {
  const d = Math.floor(time / 1000 / 3600 / 24);
  const h = Math.floor((time % (1000 * 3600 * 24)) / 1000 / 3600);
  const m = Math.floor((time % (1000 * 60 * 60)) / 1000 / 60);
  const s = Math.floor((time % (1000 * 60)) / 1000);
  return `${d.toString().padStart(2, 0)}天${h
    .toString()
    .padStart(2, 0)}时${m.toString().padStart(2, 0)}分${s
    .toString()
    .padStart(2, 0)}秒`;
};

export function formatTimeDuring(time) {
  var day = parseInt(time / (1000 * 60 * 60 * 24)) + "";
  var hour = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + "";
  var min = parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) + "";
  var sec = parseInt((time % (1000 * 60)) / 1000) + "";
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  if (min.length == 1) {
    min = "0" + min;
  }
  if (sec.length == 1) {
    sec = "0" + sec;
  }
  return { day, hour, min, sec };
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = (timeStamp) => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp);
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor((timeStamp /= 1000));
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp);
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000);
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime);
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp;
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff;
  let resStr = "";
  const dirStr = IS_EARLY ? "前" : "后";
  // 少于等于59秒
  if (diff <= 59) resStr = diff + "秒" + dirStr;
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599)
    resStr = Math.floor(diff / 60) + "分钟" + dirStr;
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399)
    resStr = Math.floor(diff / 3600) + "小时" + dirStr;
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859)
    resStr = Math.floor(diff / 86400) + "天" + dirStr;
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY)
    resStr = getDate(timeStamp);
  else resStr = getDate(timeStamp, "year");
  return resStr;
};

const padLeftZero = (str) => {
  return ("00" + str).substring(str.length);
};

/**
 * 格式化时间
 */
export function formatTime(timestamp, fmt) {
  if (!fmt) {
    fmt = "yyyy/MM/dd hh:mm:ss";
  }
  if ((timestamp + "").length <= 10) {
    timestamp *= 1000;
  }
  const date = new Date(timestamp);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substring(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1;
  };
  if (isExplorer("MSIE")) return "IE";
  else if (isExplorer("Firefox")) return "Firefox";
  else if (isExplorer("Chrome")) return "Chrome";
  else if (isExplorer("Opera")) return "Opera";
  else if (isExplorer("Safari")) return "Safari";
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj;
  else {
    let keysArr = Object.keys(obj);
    return keysArr.length;
  }
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) return false;
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
  /* eslint-disable-next-line */ else
    return !keysArr1.some((key) => obj1[key] != obj2[key]);
};

/**
 * 从文件url中获取文件名称
 */
export const getNameFromUrl = (url) => {
  let matches = url.match(/\/([^\/?#]+)[^\/]*$/);
  if (matches && matches.length >= 2) {
    return matches[1];
  }
  return "";
};

export const genUUID = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join("");
};

/**
 * 深度拷贝
 */
export function deepCopy(oldObj) {
  let typeString = (obj) => {
    var cons = Object.prototype.toString.call(obj).slice(8, -1);
    return cons === "Array" || cons === "Object";
  };

  if (typeString(oldObj)) {
    var newObj = oldObj.constructor();
    for (let i in oldObj) {
      if (oldObj.hasOwnProperty(i)) {
        newObj[i] = typeString(oldObj[i]) ? deepCopy(oldObj[i]) : oldObj[i];
      }
    }
    return newObj;
  } else {
    return oldObj;
  }
}

export function throttle(func, timeout) {
  let id = null;
  return function() {
    if (id) {
      return;
    }
    const _this = this;
    const arg = arguments;
    id = setTimeout(() => {
      func.call(_this, ...arg);
      clearTimeout(id);
      id = null;
    }, timeout);
  };
}

export function debounce(func, timeout = 500) {
  let id = null;
  return function() {
    id && clearTimeout(id);
    const _this = this;
    const arg = arguments;
    id = setTimeout(() => {
      func.call(_this, ...arg);
    }, timeout);
  };
}

/**
 * @description 压缩图片
 * @export
 * @param {*} file
 * @param {*} options
 * @param {*} callback
 */
export function photoCompress(file, options = {}, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (ev) => {
    const base64 = ev.target.result;
    canvasDataUrl(base64, options, callback);
  };
}

/**
 * @description dataurl压缩
 * @param {*} dataUrl
 * @param {*} options
 * @param {*} callback
 */
function canvasDataUrl(dataUrl, options, callback) {
  const fileType = dataUrl.match(/data:(.*?);/)[1]; // 获取图片类型
  const oImg = new Image();
  oImg.src = dataUrl;
  oImg.onload = (ev) => {
    const defalutQuality = 1;
    const oCanvas = document.createElement("canvas");
    let { width, height, quality = defalutQuality } = options;
    if (quality > 1 && quality < 0) {
      quality = defalutQuality;
    }
    const scale = oImg.height / oImg.width; // 原图片高宽比
    width = width || oImg.width;
    height = height || width * scale; // 如果未设置高度，等比例缩放
    oCanvas.setAttribute("width", width);
    oCanvas.setAttribute("height", height);
    const ctx = oCanvas.getContext("2d");
    ctx.drawImage(oImg, 0, 0, width, height);
    const base64 = oCanvas.toDataURL(fileType, quality);
    callback(base64);
  };
}

/**
 * @description base64转成blob
 * @export
 * @param {*} base64
 * @returns
 */
export function convertBase64UrlToBlob(base64) {
  const array = base64.split(",");
  const mime = array[0].match(/:(.*?);/)[1]; // 获取文件类型
  const data = atob(array[1]); // 解码数据
  const uint8 = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    uint8[i] = data.charCodeAt(i); // 赋值必须用无符号数字赋值
  }
  return new Blob([uint8], { type: mime });
}

/**
 * 根据userAgent 辨别客户端
 * 这个并不是最完美的答案
 * @export
 * @returns
 */
export function isMobile() {
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  );
}

export function getSysInfoFromUserAgent(ua) {
  if (!ua) {
    ua = window.navigator.userAgent;
  }
  let platform = "others";
  let isWechat = false;
  let isIos = false;
  let isAndroid = false;
  let brand = "";
  let type = isMobile() ? "mobile" : "pc";
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;

  if (/ios/gi.test(ua)) {
    platform = "ios";
  } else if (/android/gi.test(ua)) {
    platform = "android";
  }

  isWechat = /micromessenger/gi.test(ua);
  isIos = platform === "ios";
  isAndroid = platform === "android";

  if (isAndroid) {
    // 针对国内机型
    brand = [
      { name: "HuaWei", e: /HUAWEI/g },
      { name: "vivo", e: /vivo/g },
      { name: "OPPO", e: /OPPO/g },
      { name: "XiaoMi", e: /MI/g },
    ].find((item) => item.e.test(ua));
    if (brand) {
      brand = brand.name;
    }
  }

  return {
    platform,
    isWechat,
    isIos,
    isAndroid,
    brand,
    type,
    clientWidth,
    clientHeight,
  };
}

export const sysInfo = getSysInfoFromUserAgent();

export function getBrowserPlatform() {
  let u = navigator.userAgent;
  return {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
    qq: u.toLowerCase().indexOf("qq") > -1, //是否QQ
  };
}

export function getAppPlatform() {
  let ua = window.navigator.userAgent;
  if (/FZM-3SYXIN/.test(ua)) {
    return "mall-tanxin";
  } else if (/mall-SLG/.test(ua)) {
    return "mall-app";
  } else {
    return "mall-h5";
  }
}
