/*
 * @Author: yinht
 * @FilePath: /banrui/src/page/mirror/httpUtil.js
 * @Date: 2020-02-24 21:06:11
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 17:13:40
 */
import axios from '../../api/httpCore'
// 创建实例，可在实例中配置单页应用中给的公共配置
// let instance = axios.create()
let instance = axios

class httpUtil {
  // 登录
  loginInfo (params) {
    return instance.post('/banrui/user/login', params)
  }
  // 查询当前用户
  qryUser (params) {
    return instance.post('/banrui/user/qryUser', params)
  }
  // 删除用户
  delUser (params) {
    return instance.post('/banrui/user/delUser', params)
  }
  // 查询一级用户
  qryFUser (params) {
    return instance.post('/banrui/user/qryFUser', params)
  }
  // 查询所属平台
  qryPlatform (params) {
    return instance.post('/banrui/platform/qryPlatform', params)
  }
  // 新增用户
  addUser (params) {
    return instance.post('/banrui/user/addUser', params)
  }
}

export default httpUtil
