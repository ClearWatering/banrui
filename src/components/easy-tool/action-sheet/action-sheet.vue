<template>
  <div>
    <mask-layer :maskClick="maskClick" :zIndex="maskZIndex"></mask-layer>
    <section :style="actionSheetStyle" class="et-act-sht et-slide-up">
      <div v-for="(op,ind) in options" :key="ind" class="et-act-sht-item">{{op.text}}</div>
    </section>
  </div>
</template>
<script>
import maskLayer from '../mask-layer/mask-layer'
import {findMaxZIndex, isMobileBrowser} from '../utils'
export default {
  name: 'action-sheet',
  components: {'mask-layer': maskLayer},
  props: {
    options: {type: Array, required: true}
  },
  data () {
    return {
      maskZIndex: '998',
      actionSheetStyle: 'z-index:999;'
    }
  },
  created () {
    let maxZIndex = findMaxZIndex()
    this.maskZIndex = maxZIndex + 1
    this.actionSheetStyle = 'z-index:' + (maxZIndex + 2) + ';'
    this.isMobile = isMobileBrowser()
    window.addEventListener('resize', () => {
      this.isMobile = isMobileBrowser()
    })
  },
  methods: {
    maskClick () {}
  }
}
</script>
<style scoped>
.et-act-sht-item {
  width: 100%;
  background: #fff;
}
.et-act-sht {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.et-slide-up {
  animation: et-slide-in-up .5s;
}
@keyframes et-slide-in-up {
}
</style>
