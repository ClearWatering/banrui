/**
 * 计算页面中最大的z-index
 */
export const findMaxZIndex = () => {
  let arr = [...document.all].map(el => +window.getComputedStyle(el).zIndex || 0)
  return Math.max.apply(null, arr)
}
/**
 * 判断是否为pc浏览器
 */
export const isPCBrowser = () => {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    // 'iPad',
    'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
/**
 * 判断是否为移动浏览器
 */
export const isMobileBrowser = () => {
  return !isPCBrowser()
}
/**
 * 判断是否支持css3
 */
export const supportCss3 = (() => {
  let div = document.createElement('div')
  let vendors = 'Ms O Moz Webkit'.split(' ')
  let _len = vendors.length

  return function (prop) {
    if (prop in div.style) return true

    prop = prop.replace(/^[a-z]/, function (val) {
      return val.toUpperCase()
    })
    let len = _len
    while (len--) {
      if (vendors[len] + prop in div.style) {
        return true
      }
    }
    return false
  }
})()
/**
 * 获取元素的计算属性
 * @param {*} ele dom元素
 * @param {*} attr 指定的样式
 */
export const getComputedStyle = (ele, attr) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[attr]
  }
  return ele.currentStyle[attr]
}
