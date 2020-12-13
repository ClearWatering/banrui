/**
 * 对象深度合并工具
 * deepAssign({a: {b: 0}}, {a: {b: 1, c: 2}}, {a: {c: 3}});
 * //=> {a: {b: 1, c: 3}}
 */
export const deepAssign = (() => {
  function isObj (x) {
    var type = typeof x
    return x !== null && (type === 'object' || type === 'function')
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty
  var propIsEnumerable = Object.prototype.propertyIsEnumerable

  function toObject (val) {
    if (val === null || val === undefined) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    return Object(val)
  }

  function assignKey (to, from, key) {
    var val = from[key]

    if (val === undefined || val === null) {
      return
    }

    if (hasOwnProperty.call(to, key)) {
      if (to[key] === undefined || to[key] === null) {
        throw new TypeError(
          'Cannot convert undefined or null to object (' + key + ')'
        )
      }
    }

    if (!hasOwnProperty.call(to, key) || !isObj(val)) {
      to[key] = val
    } else {
      to[key] = assign(Object(to[key]), from[key])
    }
  }

  function assign (to, from) {
    if (to === from) {
      return to
    }

    from = Object(from)

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        assignKey(to, from, key)
      }
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(from)

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          assignKey(to, from, symbols[i])
        }
      }
    }

    return to
  }

  function deepAssign (target) {
    target = toObject(target)

    for (var s = 1; s < arguments.length; s++) {
      assign(target, deepClone(arguments[s]))
    }

    return target
  }
  return deepAssign
})()

/**
 * 深度复制
 * @param {Object} obj
 */
export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 判断是否为空
 * @param obj
 * @returns {boolean}
 */
export const checkIsEmptyOrNull = obj => {
  let nullParamFlag = false
  if (
    obj === null ||
    undefined === obj ||
    obj === 'undefined' ||
    obj === 'null'
  ) {
    nullParamFlag = true
  } else if (obj === '' && obj.toString() !== '0') {
    nullParamFlag = true
  }
  return nullParamFlag
}
/**
 * 对字符串进行简单的混乱加密
 * @param {String} orgStr
 */
export const confuse = orgStr => {
  let c = String.fromCharCode(orgStr.charCodeAt(0) + orgStr.length)
  for (let i = 1; i < orgStr.length; i++) {
    c += String.fromCharCode(orgStr.charCodeAt(i) + orgStr.charCodeAt(i - 1))
  }
  return c // encodeURIComponent(c.replace(/%/g, '%25'))
}
/**
 * 对confuse混淆后的字符串进行还原
 * @param {String} conStr
 */
export const unconfuse = conStr => {
  // conStr = decodeURIComponent(conStr)
  let c = String.fromCharCode(conStr.charCodeAt(0) - conStr.length)
  for (let i = 1; i < conStr.length; i++) {
    c += String.fromCharCode(conStr.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
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
 * 将file（input[type=file]）转成对应的base64
 * 使用FileReader，最低支持ie10
 * @param {input[type=file]} file dom对象
 */
export const img2Base64 = file => {
  return new Promise((resolve, reject) => {
    let pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/
    if (!file) {
      return reject(new Error('file不能为空'))
    }
    if (!pattern.test(file.value)) {
      return reject(new Error('请使用jpg/jpeg/png/gif/bmp格式的照片！'))
    }
    try {
      if (typeof FileReader === 'undefined') { // 兼容ie不支持FileReader的版本（ie9及以下） // document.all) { // 兼容ie
        let realPath, xmlHttp, tmpNode
        realPath = file.value// 获取文件的真实本地路径.
        console.log('ie realpath: ' + realPath)
        // eslint-disable-next-line no-undef
        xmlHttp = new ActiveXObject('MSXML2.XMLHTTP')
        xmlHttp.open('POST', realPath, false)
        xmlHttp.send('')
        // eslint-disable-next-line no-undef
        let xmlDom = new ActiveXObject('MSXML2.DOMDocument')
        tmpNode = xmlDom.createElement('tmpNode')
        tmpNode.dataType = 'bin.base64'
        tmpNode.nodeTypedValue = xmlHttp.responseBody
        let base64 = 'data:image/bmp;base64,' + tmpNode.text.replace(/\n/g, '')
        resolve(base64)
      } else { // 主流浏览器
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file.files[0])
        // console.log('main file: ' + file.files[0])
        fileReader.onload = function (e) {
          resolve(e.target.result)
        }
      }
    } catch (error) {
      if (error.message === '没有权限') {
        error.message += '；如果使用IE，请升级到高版本使用（建议IE10及以上）'
      }
      reject(error)
    }
  })
}
/**
 * 图片压缩
 * @param {String} base64Str base64
 * @param {Number} width 宽
 * @param {Number} height 高
 */
export const compressImg = (base64Str, width = 100, height = 100) => {
  return new Promise((resolve, reject) => {
    try {
      let c = document.createElement('canvas')
      let ctx = c.getContext('2d')
      let img = document.createElement('img')
      img.src = base64Str
      c.width = width
      c.height = height
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
        resolve(c.toDataURL())
      }
    } catch (e) {
      reject(e)
    }
  })
}
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

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行，默认false
 */
export const debounce = (func, wait, immediate) => {
  let timeout

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版, 默认为2
 */
export const throttle = (func, wait, type = 2) => {
  let previous = 0
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (type === 1) {
      let now = Date.now()

      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}
export const elderElement = function (el, selector) {
  if (!el) return el
  if (!selector) return el
  try {
    if (selector.startsWith('#') && el.id === selector) {
      return el
    }
    if (
      selector.startsWith('.') &&
      el.classList.contains(selector.substr(1))
    ) {
      return el
    }
  } catch (error) {
    return el
  }
  // eslint-disable-next-line no-caller
  return elderElement(el.parentElement, selector)
}
