<template>
  <div :class="{'mobile-cls':isMobile}"
       v-show="msgBoxShow">
    <mask-layer :maskClick="maskClick"
                :zIndex="zIndex"></mask-layer>
    <transition enter-active-class="et-fade-in">
      <div class="et-msg-box-area"
           ref="msgBox"
           v-show="msgBoxShow"
           :style="msgBoxStyle">
        <div class="et-msg-box-title">{{title}}</div>
        <div class="et-msg-box-content">
          <span class="et-msg-box-message">{{content}}</span>
        </div>
        <div class="et-msg-box-operate">
          <button class="et-msg-box-confirm"
                  v-show="showConfirmButton"
                  @click="btnClick('confirm')">确认</button>
          <button class="et-msg-box-cancel"
                  v-show="showCancelButton"
                  @click="btnClick('cancel')">取消</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import maskLayer from '../mask-layer/mask-layer'
import '../animate.css'
import {findMaxZIndex, isMobileBrowser, getComputedStyle, supportCss3} from '../utils'

export default {
  name: 'message-box',
  components: {maskLayer},
  props: {
    title: {type: String, default: '提示'},
    content: {type: String, default: ''},
    callback: {type: Function},
    showConfirmButton: {type: Boolean, default: true},
    showCancelButton: {type: Boolean, default: false},
    shadowClose: {type: Boolean, default: true}
  },
  data () {
    return {
      zIndex: '998',
      msgBoxStyle: 'z-index:999;',
      isMobile: false,
      msgBoxShow: false,
      supportCss3: supportCss3('transform')
    }
  },
  created () {
    this.zIndex = findMaxZIndex() + 1
    this.msgBoxStyle = 'z-index:' + (this.zIndex + 1) + ';'
    this.isMobile = isMobileBrowser()
    window.addEventListener('resize', () => {
      this.isMobile = isMobileBrowser()
    })
    if (!this.msgBoxShow) {
      setTimeout(() => {
        this.msgBoxShow = true
      }, 40)
    }
  },
  watch: {
    // 不支持css3情况下，手动定位
    msgBoxShow (newV) {
      if (newV && !this.supportCss3) {
        let lf = (window.innerWidth - parseInt(getComputedStyle(this.$refs.msgBox, 'width'))) / 2
        let stl = 'z-index:' + (this.zIndex + 1) + ';' + 'position:absolute;top:35%;left:' + lf + 'px'
        this.msgBoxStyle = stl
      }
    }
  },
  methods: {
    maskClick () {
      if (this.msgBoxShow && this.shadowClose) {
        this.msgBoxShow = false
      }
    },
    btnClick (type) {
      this.msgBoxShow = false
      this['callback'] && this['callback'](type)
    }
  }
}
</script>
<style scoped>
.mobile-cls .et-msg-box-operate button {
  font-size: 0.8rem;
  width: 5.5rem;
  height: 1.6rem;
  margin: 0 0.4rem;
}
.mobile-cls .et-msg-box-operate {
  margin: 1rem 0 0.3rem 0;
}
.mobile-cls .et-msg-box-content {
  margin: 0.8rem 0;
  max-height: 8rem;
}
.mobile-cls .et-msg-box-area {
  width: 75%;
  font-size: 0.9rem;
  padding: 0.6rem 1.4rem;
}
.et-msg-box-confirm {
  background: #5ba9f8;
  color: white;
}
.et-msg-box-operate button {
  font-size: 0.25rem;
  width: 1.6rem;
  height: 0.45rem;
  margin: 0 0.2rem;
  overflow: hidden;
  border: 0;
  box-shadow: none;
  cursor: pointer;
}
.et-msg-box-operate {
  text-align: center;
  margin: 0.2rem 0 0.1rem 0;
}
.et-msg-box-message {
  color: #999;
}
.et-msg-box-content {
  overflow-y: auto;
  margin: 0.3rem 0;
  max-height: 4rem;
  text-align: center;
}
.et-msg-box-title {
  width: 100%;
  text-align: center;
  font-weight: bolder;
}
.et-msg-box-area {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 4.5rem;
  padding: 0.2rem 0.35rem;
  /* height: 3rem; */
  font-size: 0.25rem;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 3px;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
</style>
