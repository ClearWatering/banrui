
// 读取cookies
export function getCookie (name) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')

  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}

// 删除cookies
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}

/**
 * 设置cookie
 * @export
 * @param {*} name key
 * @param {*} value value
 * @param {*} time 过期时间，单位可选（d/h/s），其他则为毫秒
 * @param {*} path 路径
 */
export function setCookie (name, value, time, path) {
  var strsec = getsec(time)
  var exp = new Date()
  exp.setTime(exp.getTime() + strsec * 1)
  var cs = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  if (path) cs += ';path=' + path

  document.cookie = cs
}

export function getsec (str) {
  var str1 = str.substring(0, str.length - 1) * 1
  var str2 = str.substring(str.length - 1, str.length)
  if (str2 === 's') {
    return str1 * 1000
  } else if (str2 === 'h') {
    return str1 * 60 * 60 * 1000
  } else if (str2 === 'd') {
    return str1 * 24 * 60 * 60 * 1000
  } else {
    return parseInt(str)
  }
}
