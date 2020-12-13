<template>
  <transition enter-active-class="et-fade-in"
              leave-active-class="et-fade-out">
    <div v-show="isOn"
         class="et-signature">
      <mask-layer :ZIndex="zIndex"></mask-layer>
      <div ref="board"
           class="board"
           :style="boardStyle">
        <canvas ref="canvs"
                class="canvs"></canvas>
        <div class="close"
             @click="confirmFn('close')">
          <i class="et-rotate45"></i><i class="et-rotate135"></i>
        </div>
        <div class="btns">
          <button @click="resetFn">重置</button>
          <button @click="confirmFn('confirm')">确认</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import '../animate.css'
import '../style.css'
import maskLayer from '../mask-layer/mask-layer'
import {findMaxZIndex} from '../utils'

export default {
  name: 'signature-track',
  components: {maskLayer},
  props: {
    // 宽高比
    W2HRatio: {type: Number, required: true},
    close: Function,
    reset: Function,
    confirm: {type: Function, required: true}
  },
  data () {
    return {
      isOn: false,
      zIndex: '998',
      boardStyle: 'z-index:999;',
      signatureTrack: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    confirmFn (action = 'confirm') {
      if (this.confirm) {
        let base64 = this.$refs.canvs.toDataURL()
        let result = {
          action,
          signatureTrack: this.signatureTrack,
          base64,
          resolutionX: this.canvsWidth,
          resolutionY: this.canvsHeight
        }
        // 如果confirm 返回false，则阻止退出
        if (this.confirm(result) === false) return
      }
      this.isOn = false
      // this.signatureTrack = []
    },
    resetFn () {
      // 如果reset返回false，则阻止
      if (this.reset && this.reset(this.signatureTrack) === false) {
        return
      }
      let canvs = this.$refs.canvs
      let h = canvs.height = canvs.height
      let ctx = canvs.getContext('2d')
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvs.width, h)

      this.signatureTrack = []
    },
    init () {
      // zindex
      this.zIndex = findMaxZIndex() + 1
      this.boardStyle = 'z-index:' + (this.zIndex + 1) + ';'

      // 定位
      let canW, canH, topY, leftX
      let winW = window.innerWidth
      let winH = window.innerHeight

      let ratio = winW / winH
      if (ratio > this.W2HRatio) {
        canH = winH * 0.8
        topY = winH * 0.1
        canW = canH * this.W2HRatio
        leftX = (winW - canW) / 2
      } else {
        canW = winW * 0.8
        leftX = winW * 0.1
        canH = canW / this.W2HRatio
        topY = (winH - canH) / 2
      }

      let canvs = this.$refs.canvs
      let board = this.$refs.board
      this.canvsWidth = canvs.width = canW
      this.canvsHeight = canvs.height = canH
      board.style.width = canvs.style.width = canW + 'px'
      board.style.height = canvs.style.height = canH + 'px'
      board.style.top = topY + 'px'
      board.style.left = leftX + 'px'

      // 绑定触动事件  canvas绘制
      let ctx = this.canvsCtx = canvs.getContext('2d')
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canW, canH)

      let pointXList, pointYList, pointZList
      canvs.addEventListener('touchstart', e => {
        e.stopPropagation()
        e.preventDefault()
        pointXList = []
        pointYList = []
        pointZList = []
        ctx.moveTo(
          e.changedTouches[0].clientX - leftX,
          e.changedTouches[0].clientY - topY
        )
      })
      canvs.addEventListener('touchmove', e => {
        e.stopPropagation()
        e.preventDefault()
        pointXList.push(e.changedTouches[0].clientX - leftX)
        pointYList.push(e.changedTouches[0].clientY - topY)
        pointZList.push(0)

        ctx.lineTo(
          e.changedTouches[0].clientX - leftX,
          e.changedTouches[0].clientY - topY
        )
        ctx.stroke()
      })
      canvs.addEventListener('touchend', e => {
        e.stopPropagation()
        e.preventDefault()
        this.signatureTrack.push({
          x: pointXList,
          y: pointYList,
          z: pointZList
        })
      })
    }
  }
}
</script>
<style scoped>
.et-signature .close i {
  position: absolute;
  top: 0.32rem;
  left: 0.1rem;
  height: 0.06rem;
  width: 0.5rem;
  background: black;
}
.et-signature .close {
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  top: 0;
  right: 0;
  border: 0;
  border-radius: 0.35rem;
  background: #e8e8e8;
  overflow: hidden;
  transform: translate(50%, -50%);
  -ms-transform: translate(50%, -50%); /* IE 9 */
  -webkit-transform: translate(50%, -50%); /* Safari and Chrome */
  -o-transform: translate(50%, -50%); /* Opera */
  -moz-transform: translate(50%, -50%); /* Firefox */
}
.et-signature .btns button:first-child {
  color: #7e7e7e;
  background: #e8e8e8;
}
.et-signature .btns button {
  width: 1.7rem;
  height: 0.8rem;
  color: #fff;
  background: #008ae7;
  border: 0;
  border-radius: 0.2rem;
  margin: 0 0.1rem;
}
.et-signature .btns {
  position: absolute;
  bottom: -1rem;
  right: 0;
}
.et-signature .board {
  position: absolute;
}
.et-signature {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
