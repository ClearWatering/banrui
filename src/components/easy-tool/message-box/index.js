import messageBox from './message-box'
import Vue from 'vue'
let MessageBox = Vue.extend(messageBox)

let instance
let messageBoxUtil = function (arg = '') {
  if (typeof arg === 'string') {
    arg = {content: arg}
  } else {
    arg = arg || {}
  }
  if (instance) {
    arg.msgBoxShow = true
    for (let key in arg) {
      if (arg.hasOwnProperty(key)) {
        instance[key] = arg[key]
      }
    }
  } else {
    instance = new MessageBox({
      el: document.createElement('div'),
      propsData: arg
    })
    document.body.appendChild(instance.$el)
  }
}
messageBoxUtil.close = function () {
  if (instance) {
    instance.msgBoxShow = false
  }
}
messageBoxUtil.alert = function (arg, callback) {
  if (typeof arg === 'string') {
    arg = {content: arg, callback}
  } else {
    arg = arg || {}
  }
  arg.shadowClose = false
  messageBoxUtil(arg)
}
messageBoxUtil.confirm = function (arg, callback) {
  if (typeof arg === 'string') {
    arg = {content: arg, callback}
  } else {
    arg = arg || {}
  }
  arg.showCancelButton = true
  messageBoxUtil(arg)
}

export default messageBoxUtil
