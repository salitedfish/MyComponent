//判断是否是移动端环境
let IsMobile = function () {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  let width = document.documentElement.clientWidth;
  return !!(flag || width <= 500)
}