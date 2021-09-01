is_neizhi(){
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "weixin";
    } else if (ua.match(/QQ/i) == "qq") {
        return "QQ";
    } else if (/AlipayClient/.test(window.navigator.userAgent)){
        return "Alipay"
    }
    return false;
  }