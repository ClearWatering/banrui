/*
 * @Author: yinht
 * @FilePath: /banrui/src/page/mirror/main.js
 * @Date: 2020-02-24 21:06:11
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 16:50:47
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由管理
import router from './router/index'
// 引入axios，ajax工具
import HttpUtil from './httpUtil'
// index.html浏览器版本提示蒙版，针对PC端
import '@/assets/css/index.cover.css'
// 引入运行平台能力
Vue.prototype.$http = new HttpUtil()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
