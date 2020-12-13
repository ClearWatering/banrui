/**
 * 用于同步加载js，加载非vue组件化的js文件
 * @param {String} url
 */
export default function JsLoader (url) {
  return new Promise((resolve, reject) => {
    if (typeof url !== 'string') {
      reject(new Error('url must be a string url'))
    } else {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
      resolve()
    }
  })
}
