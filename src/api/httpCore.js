/*
 * @Date: 2019-09-04 11:24:15
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 17:07:49
 */
import axios from 'axios'
import Es6Promise from 'es6-promise'

Es6Promise.polyfill()

//  add request interceptors
axios.interceptors.request.use(
  function (config) {
    // 处理post请求格式，适配后台框架
    console.log(config)
    return config
  },
  function (error) {
    console.log('error', error)
    // request error do something
    return Promise.reject(error)
  }
)

// add response interceptors
axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      response.respBody = response.data
      let {
        RETURN_CODE: code
      } = response.data.code
      if (code === '0000') {
        response.respBody.IS_SUCCESS = true
      } else {
        response.respBody.IS_SUCCESS = false
      }
    } else {
      /* 系统异常时无法返回正常节点 */
      console.error(response.data)
      response.respBody = response.data
    }
    // console.log('response', response)
    return response
  },
  function (error) {
    // error do something
    return Promise.reject(error)
  }
)

export default axios
