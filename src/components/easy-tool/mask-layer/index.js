import maskLayer from './mask-layer'
import Vue from 'vue'
let Mask = Vue.extend(maskLayer)

let mask
const maskUtil = {
  createMask (options = {props: {}}) {
    if (!mask) {
      mask = new Mask({
        el: document.createElement('div'),
        props: options.props
      })
      document.body.append(mask.$el)
    } else {
      mask.props = options.props
    }
  }
}

export default maskUtil
