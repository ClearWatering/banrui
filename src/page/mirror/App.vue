<template>
  <transition :enter-active-class="rollIn"
              :leave-active-class="rollOut"
              mode="out-in">
    <!-- enter-active-class="bounceInRight"
                mode="out-in" -->
    <!-- leave-active-class="bounceOutLeft" -->
    <router-view></router-view>
  </transition>
</template>

<script>
// 引入过渡动画样式
// import '../../assets/css/vue2-animate.min.css'
// import 'animate.css'
import 'vue2-animate/dist/vue2-animate.min.css'

export default {
  name: 'App',
  data () {
    return { rollIn: 'slideInRight', rollOut: '' }
  },
  watch: {
    $route (to, from) {
      let fromDepth = from.path.split('/').length
      let toDepth = to.path.split('/').length
      if (toDepth === fromDepth) {
        this.rollIn = ''
        this.rollOut = ''
      } else if (toDepth > fromDepth) {
        this.rollIn = 'bounceInRight'
        // this.rollOut = 'bounceOutLeft'
        // this.rollIn = 'slideInRight'
        this.rollOut = ''
        // this.rollOut = 'slideOutLeft'
      } else {
        // this.rollIn = 'bounceInLeft'
        // this.rollOut = 'bounceOutRight'
        this.rollOut = 'slideOutRight'
        // this.rollIn = 'slideInLeft'
        this.rollIn = ''
        // this.rollOut = 'slideOutRight'
      }
    }
  }
}
</script>

<style scoped>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
/**
 * 缩短进入时间
 */
.bounceInRight {
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
/**
 * 缩短退出时间
 */
.slideOutRight {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
