<template>
  <div>
    <div @click="maskClick" :style="style" class="et-mask-layer">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.et-mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
}
</style>
<script>
import {findMaxZIndex} from '../utils'
export default {
  name: 'mask-layer',
  props: {
    opacity: {default: '0.2'},
    zIndex: {default: '999'},
    maskClick: {type: Function, default: function () {}}
  },
  computed: {
    style () {
      let z = this.zIndex
      if (!z) {
        z = findMaxZIndex() + 1
      }
      return 'background:rgba(0,0,0,' + this.opacity + ');z-index:' + z + ';'
    }
  }
}
</script>
