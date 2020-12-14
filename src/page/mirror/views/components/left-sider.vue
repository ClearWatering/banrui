<template>
  <div>
    <div class="left-sider">
      <span>{{chooseNav}}</span>
      <div class="account-manager">账号管理</div>
      <p class="newAccount">
        <span :class="[beAtv === 'serviceIndex'? 'active' : '' ]" @click="goPage('serviceIndex')">首页</span>
      </p>
      <p class="newAccount">
        <span
          :class="[beAtv === 'accountManager'? 'active' : '' ]"
          @click="goPage('accountManager')"
        >账户查看</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beAtv: '',
      chooseNav: ''
    }
  },
  watch: {
    chooseNav: {
      handler(newNav, oldNav) {
        this.beAtv = newNav
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.beAtv = 'serviceIndex'
  },
  methods: {
    goPage(id) {
      debugger
      this.chooseNav = id
      if (id === 'serviceIndex') {
        this.$router.push('serviceIndex')
      } else if (id === 'accountManager') {
        this.$router.push('accountManager')
      }
      // switch (id) {
      //   case 'serviceIndex':
      //     this.$router.push('serviceIndex')
      //     break
      //   case 'accountManager':
      //     this.$router.push('accountManager')
      //     break
      // }
    }
  }
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
  background-image: url('../../assets/images/service/left-sider.png');
  background-size: cover;
}
.left-sider .active {
  background: #eee;
  color: #999;
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
.newAccount {
  color: #ddd;
  margin-top: 25px;
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