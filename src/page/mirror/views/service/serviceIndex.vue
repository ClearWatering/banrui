<!--
 * @Author: yinht
 * @FilePath: /my-project/src/views/service/serviceIndex.vue
 * @Date: 2020-11-29 22:04:32
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 14:37:16
-->
<template>
  <div>
    <div class="left-sider">
      <div class="account-manager">账号管理</div>
      <p class="newAccount">
        <span @click="goSearchAccount">
          账户查看
        </span>
      </p>
    </div>
    <div class="right-sider">
      <!-- <p class="account-title">
        <span class="changepwd"
              title="修改密码">修改密码</span>
        <span class="logout"
              title="退出登录">退出</span>
        <span class="usrname"
              :title='usrname'>{{usrname}}</span>
        <img :src="userImg"
             alt="">
      </p> -->
      <div style="margin-top:160px;">
        <div class="item-list">
          <span>
            侵权详情
          </span>
        </div>
        <div class="item-list">
          <span>
            诉讼进度
          </span>
        </div>
        <div class="item-list">
          <span>
            费网站侵权与举报
          </span>
        </div>
        <div class="item-list">
          <span>
            版权登记
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userImg: require('../../assets/images/service/usrer.png'),
      usrname: '易烊千玺'
    }
  },
  mounted () {
    // this.$router.push('demo');
  },
  methods: {
    goSearchAccount () {
      this.$router.push('accountManager')
    }
  },
}
</script>

<style lang="scss" scoped>
.left-sider {
  color: #eee;
  position: absolute;
  width: 240px;
  top: 0;
  left: 0;
  bottom: 0;
  background-image: url("../../assets/images/service/left-sider.png");
  background-size: cover;
}
.account-manager {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 50px;
  cursor: default;
}
.right-sider {
  position: absolute;
  top: 0;
  left: 240px;
  right: 0;
  bottom: 0;
  background: rgba(255,255,0,.15);
}
.right-sider .item-list {
  color: #eee;
  cursor: pointer;
  display: inline-block;
  width: 50%;
  height: 100px;
  line-height: 100px;
  margin-top: 160px;
}
.right-sider .item-list:nth-child(odd) {
  text-align: center;
}
.right-sider .item-list:nth-child(even) {
  text-align: center;
}
.account-title {
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 1px solid #eee;
}
.account-title img {
  float: right;
  padding-right: 10px;
  padding-top: 16px;
  width: 30px;
  opacity: 0.4;
}
.account-title .usrname {
  color: #64e3a2;
  float: right;
  padding-right: 40px;
  cursor: pointer;
}
.logout {
  float: right;
  color: #666;
  cursor: pointer;
  padding-right: 10px;
}
.changepwd {
  float: right;
  color: #666;
  cursor: pointer;
  padding-right: 10px;
}
.logout:hover,
.changepwd:hover {
  color: blue;
}
.item-list span {
  user-select: none;
  display: inline-block;
  width: 200px;
  background: url("../../assets/images/service/item-card.png") 100% 100%;
  background-size: cover;
}
.newAccount {
  color: #ddd;
  text-align: center;
  cursor: pointer;
}
.newAccount span {
  border: 1px solid #999;
  padding: 2px 16px;
  border-radius: 14px;
  user-select: none;
}
</style>