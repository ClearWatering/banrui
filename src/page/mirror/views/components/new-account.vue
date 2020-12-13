<!--
 * @Author: yinht
 * @FilePath: /my-project/src/views/components/new-account.vue
 * @Date: 2020-12-06 00:31:58
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 14:36:21
-->
<template>
  <div class="transition-fly-in mask"
       :class="{show: visible}"
       ref="mask"
       @click="handleMaskClick">
    <div class="popup fly-in"
         :style="`width:${this.width};`">
      <div class="header">
        <p class="title">{{title}}</p>
        <div class="close"
             @click="beforeClose">
          <el-icon class="el-icon-close"></el-icon>
        </div>
      </div>
      <div class="content"
           :class="{visible: visible}"
           v-loading="loading">
        <slot v-if="visible"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup-window',
  props: {
    beforeClose: {
      type: Function,
      default () {
        return function () {
          console.log('close')
        }
      }
    },
    title: {
      type: String,
      default: '弹出窗口'
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleMaskClick (e) {
      if (e.srcElement === this.$refs.mask && this.closeOnClickModal) {
        this.beforeClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.transition-fly-in.mask {
  transition: 0.3s ease-out;
  opacity: 0;
  z-index: -1;
  perspective: 1000px;
}
.transition-fly-in .fly-in {
  transition: 0.3s ease-in-out, 0s z-index;
  z-index: -1;
  transform: scale(0.5, 0);
}
.transition-fly-in.show.mask {
  opacity: 1;
  z-index: 2000;
}
.transition-fly-in.show .fly-in {
  transform: scale(1);
  z-index: 2001;
}
.mask {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #00000055;
  overflow: scroll;
}
.mask .popup {
  width: 50%;
  min-height: 100px;
  min-width: fit-content;
  margin-top: 10vh;
  margin-right: auto;
  margin-bottom: 50px;
  margin-left: auto;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
.mask .popup .header {
  position: relative;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #2f3b88;
}
.mask .popup .header .title {
  position: absolute;
  top: 10px;
  left: 25px;
  transform: translate(0, -50%);
  font-size: 16px;
}
.mask .popup .header .close {
  position: absolute;
  top: 25px;
  right: 25px;
  transform: translate(50%, -50%) scale(1.5);
  cursor: pointer;
}
.mask .popup .content {
  height: auto;
  min-height: 200px;
  transition: inherit;
}
</style>