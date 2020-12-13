/*
 * @Author: yinht
 * @FilePath: /my-project/src/router/index.js
 * @Date: 2020-06-03 12:12:26
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 14:08:20
 */
import Vue from 'vue';
import Router from 'vue-router';


import webLogin from '../views/web/login.vue'
import webIndex from '../views/web/webIndex.vue'
import login from '../views/service/login.vue'
import serviceIndex from '../views/service/serviceIndex.vue'
import accountManager from '../views/service/accountManager.vue'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'webLogin',
    component: webLogin
  }, {
    path: '/webIndex',
    name: 'webIndex',
    component: webIndex
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/accountManager',
    name: 'accountManager',
    component: accountManager
  }, {
    path: '/serviceIndex',
    name: 'serviceIndex',
    component: serviceIndex
  }]
})