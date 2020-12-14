<!--
 * @Author: yinht
 * @FilePath: /my-project/src/views/service/login.vue
 * @Date: 2020-11-26 15:29:12
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 14:36:37
-->
<template>
  <div class="web_wrap">
    <div class="web_bg">
      <img :src="web_bg" width="100%" height="100%" alt>
    </div>
    <div class="login_pop">
      <input class="usrName" type="text" v-model="userName" placeholder="请输入用户名" autocomplete="off">
      <input class="pwd" type="password" v-model="password" placeholder="请输入密码" autocomplete="off">
      <input class="securityCode" v-model="wCode" placeholder="请输入验证码" type="text" autocomplete="off">
      <span ref="securityCode" @click="chageCode">{{ securityCode }}</span>
      <!-- <div class="identify">
            <el-radio v-model="radio"
                      label="总管理员">总管理员</el-radio>
            <el-radio v-model="radio"
                      label="子管理员">子管理员</el-radio>
        </div>-->
      <span class="login_btn" @click="beLogin">登录</span>
    </div>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'element-ui'
  export default {
    data() {
      return {
        securityCode: '',
        wCode: '',
        userName: '',
        password: '',
        radio: '总管理员',
        login_bg: require('../../assets/images/service/service-login.png'),
        web_bg: require('../../assets/images/service/service-bg.png')
      }
    },
    mounted() {
      this.chageCode()
    },
    methods: {
      // 取验证码
      chageCode() {
        this.securityCode = this.wCode = ''
        let code = ''
        // eslint-disable-next-line
        let codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z') //验证码要随机挑选的字符
        for (var i = 0; i < 4; i++) {
          let charIndex = Math.floor(Math.random() * 52) //随机产生0-52之间的整数
          code += codeChars[charIndex] //将随机指向我们规定的字符添加到code容器里
        }
        this.securityCode = code
        this.$refs.securityCode.style.background = this.getColor()
      },
      // 生成颜色
      getColor() {
        return (
          'rgb(' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 255) +
          ')'
        )
      },
      // 登录
      async beLogin() {
        if (!this.userName) {
          MessageBox.alert('请输入账号！')
          return false
        }
        if (!this.password) {
          MessageBox.alert('请输入密码！')
          return false
        }
        if (!this.wCode) {
          MessageBox.alert('验证码不能为空！')
          return false
        }
        if (this.wCode.toLowerCase() != this.securityCode.toLowerCase()) {
          MessageBox.alert('验证码有误，请重新输入！')
          this.chageCode()
          return false
        }

        let params = {
          password: this.password,
          userName: this.userName,
          sys: '1'
        }
        try {
          let resp = await this.$http.loginInfo(params)
          let { IS_SUCCESS, msg: msg, data: data } = resp.respBody
          if (IS_SUCCESS) {
            sessionStorage.setItem('funcId',data.userInfo.funcId)
            sessionStorage.setItem('name',data.userInfo.name)
            sessionStorage.setItem('parentId',data.userInfo.parentId)
            sessionStorage.setItem('userName',data.userInfo.userName)
            sessionStorage.setItem('userType',data.userInfo.userType)
            sessionStorage.setItem('id',data.userInfo.id)
            this.$router.push('serviceIndex')
          } else {
            MessageBox.close()
            MessageBox.alert(msg)
          }
        } catch (e) {
          MessageBox(e.message)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .web_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }

  .login_pop {
    float: right;
    position: relative;
    margin-right: 300px;
    margin-top: 180px;
    width: 400px;
    height: 600px;
    background-image: url('../../assets/images/service/service-login.png');
    background-size: 80% 80%;
    background-size: 400px 500px;
    /*这个是按数值缩放*/
    background-repeat: no-repeat;
    /*还有repeat-x,y等*/
  }

  input {
    color: #feffff;
    font-size: 18px;
    background: none;
    outline: none;
    border: none;
    margin-left: 10px;
    width: 200px;
    height: 30px;
    line-height: 30px;
  }

  .line input:focus {
    border: none;
  }

  input {
    transition: background-color 5000s ease-in-out;
  }

  .login_pop .login_btn {
    position: absolute;
    top: 420px;
    left: 160px;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: #44a1f8;
    text-align: center;
  }

  .securityCode {
    width: 120px;
    position: absolute;
    top: 338px;
    left: 100px;
  }

  .login_pop span {
    position: absolute;
    text-align: center;
    letter-spacing: 2px;
    right: 70px;
    top: 338px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
    background-color: rgb(240, 159, 159);
  }

  input::-webkit-input-placeholder {
    /* 修改字体颜色 */
    color: #feffff;
    /* 修改字号，默认继承input */
    /* font-size: 12px; */
    /* 设置背景色 */
    /* background: #8ac6d1; */
  }

  .usrName {
    position: absolute;
    top: 200px;
    left: 100px;
  }

  .identify {
    position: absolute;
    top: 394px;
    left: 110px;
  }

  .pwd {
    position: absolute;
    top: 270px;
    left: 100px;
  }
</style>