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
  loginInfo (params) {
    return instance.post('banrui/user/login', params)
  }
}

export default httpUtil
