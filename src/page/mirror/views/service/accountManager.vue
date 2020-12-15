<!--
 * @Author: yinht
 * @FilePath: /my-project/src/views/service/accountManager.vue
 * @Date: 2020-12-04 11:11:40
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 14:36:29
-->
<template>
  <div>
    <leftSider></leftSider>
    <div class="lookPage">
      <p class="header">
        <!-- <span>新建账号</span> -->
      </p>
      <!-- 列表 -->
      <div class="content-page">
        <div class="ctx">
          <div class="function">
            <button class="button search create" @click="handleCreate">
              <i class="el-icon-plus"></i>新增
            </button>
          </div>
          <el-table
            :header-cell-style="{background:'#eef1f6',color:'#606266',padding:'0px'}"
            :header-row-style="{height:'30px'}"
            :row-style="{height:'36px'}"
            :cell-style="{padding:'0px'}"
            :data="tableData"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
            <el-table-column prop="password" label="密码" align="center"></el-table-column>
            <el-table-column prop="name" label="账号类型" align="center"></el-table-column>
            <!-- <el-table-column prop="platformName" label="用户名称" align="center"></el-table-column> -->
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="+queryData.page"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="+queryData.limit"
              :pager-count="5"
              background
              :total="+totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- 新增/修改账户 -->
      <newAccount
        :visible="openNew"
        :title="`账号维护-${this.editIndex===-1?'新增':'修改'}`"
        width="40%"
        :loading="loadingPopup"
        :beforeClose="handleClose"
      >
        <el-form
          ref="userForm"
          :model="submitParam"
          label-width="110"
          label-position="right"
          class="popup-form"
        >
          <el-form-item
            label="新建名称"
            :rules="[{ required: true, message: '请输入名称' }]"
            prop="userName"
            class="col-item"
          >
            <el-input
              style="width:193px;"
              placeholder="请输入内容"
              v-model="submitParam.userName"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新建密码"
            :rules="[{ required: true, message: '请输入账户密码' }]"
            prop="password"
            class="col-item"
          >
            <el-input
              style="width:193px;"
              placeholder="请输入内容"
              v-model="submitParam.password"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户类型"
            :rules="[{ required: true, message: '请选择用户类型' }]"
            prop="userType"
            class="col-item"
          >
            <!--  -->
            <el-select @change="selectUserType" v-model="submitParam.userType" placeholder="请选择">
              <el-option
                v-for="item in userTypeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="this.showMenu"
            :rules="[{ required: true, message: '请选择菜单权限' }]"
            label="菜单权限"
            prop="funcId"
            class="col-item"
          >
            <el-select v-model="submitParam.funcId" multiple placeholder="请选择">
              <el-option
                v-for="item in menuList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--   -->
          <el-form-item
            v-if="this.showPlatform"
            label="一级用户"
            :rules="[{ required: true, message: '一级用户' }]"
            prop="platform"
            class="col-item"
          >
            <el-select v-model="submitParam.parentId" placeholder="请选择">
              <el-option
                v-for="item in platformList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label=" 备注信息"
                        prop="descInfo"
                        class="col-item">
            <el-input style="width:193px;"
                      placeholder="请输入内容"
                      v-model="input"
                      clearable>
            </el-input>
          </el-form-item>-->
        </el-form>
        <div class="fun-wrap">
          <button class="button reset" @click="handleClose">取消</button>
          <button class="button search" @click="submitLink('userForm')">提交</button>
        </div>
      </newAccount>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import newAccount from '../components/new-account'
import leftSider from '../components/left-sider'
export default {
  name: 'accountManager',
  components: { newAccount, leftSider },
  data() {
    return {
      openNew: false,
      userTypeList: [
        {
          value: '子管理员',
          lebel: '1'
        },
        {
          value: '一级用户',
          lebel: '2'
        },
        {
          value: '二级用户',
          lebel: '4'
        }
      ],
      platformList: [],
      userType: '',
      funcId: '',
      menuList: [
        {
          value: '侵权详情',
          lebel: '1'
        },
        {
          value: '非网站侵权及举报',
          lebel: '2'
        },
        {
          value: '诉讼进度',
          lebel: '3'
        },
        {
          value: '版权登记',
          lebel: '4'
        }
      ],
      userName: '',
      password: '',
      showPlatform: false,
      showMenu: false,
      input: '',
      loadingPopup: false,
      editIndex: -1,
      totalCount: 0,
      queryData: {
        linkCode: '',
        linkName: '',
        descInfo: '',
        page: '1',
        limit: '10'
      },
      submitParam: {
        userName: '',
        password: '',
        funcId: '',
        userType: '',
        parentId: '',
        sys:''
      },
      stateOptions: [
        {
          value: '1',
          label: '有效'
        },
        {
          value: '0',
          label: '失效'
        }
      ],
      tableData: []
    }
  },
  mounted() {
    this.loadList()
    this.loadPlatform()
  },
  created: function() {},
  methods: {
    selectUserType() {
      if (this.submitParam.userType === '二级用户') {
        this.showMenu = false
        this.showPlatform = true
        this.submitParam.sys = '0'
        this.submitParam.funcId = ''
      } else if (this.submitParam.userType === '一级用户') {
        this.showMenu = false
        this.showPlatform = false
        this.submitParam.sys = '0'
        this.submitParam.parentId = sessionStorage.getItem('parentId')
        this.submitParam.funcId = ''
      } else {
        this.showMenu = true
        this.submitParam.sys = '1'
        this.showPlatform = false
        this.submitParam.parentId = sessionStorage.getItem('parentId')
      }
    },
    async loadPlatform() {
      try {
        let resp = await this.$http.qryFUser({})
        let { IS_SUCCESS, msg: msg, data: data } = resp.respBody
        if (IS_SUCCESS) {
          this.platformList = data.platformList.map(_ => {
            return {
              lebel: _.platformId,
              value: _.platformName
            }
          })
        } else {
          MessageBox.close()
          MessageBox.alert(msg)
        }
      } catch (e) {
        MessageBox(e.message)
      }
    },
    async loadList() {
      // sessionStorage.getItem('parentId')
      let params = {
        id: sessionStorage.getItem('id'),
        limit: '10',
        page: '1',
        userType: sessionStorage.getItem('userType')
      }
      try {
        let resp = await this.$http.qryUser(params)
        let { IS_SUCCESS, msg: msg, data: data } = resp.respBody
        if (IS_SUCCESS) {
          this.tableData = data.userList.map(_ => {
            return {
              name: _.name,
              password: _.password,
              userName: _.userName,
              createTime: (_.createTime || '').split('T')[0]
            }
          })
          this.totalCount = data.total
        } else {
          MessageBox.close()
          MessageBox.alert(msg)
        }
      } catch (e) {
        MessageBox(e.message)
      }
    },
    handleCreate() {
      this.openNew = true
      this.editIndex = -1
    },
    handleSizeChange(val) {
      this.queryData.limit = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.queryData.page = val
      this.loadData()
    },
    handleClose() {
      this.$confirm('是否要退出编辑', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.closePopup()
        })
        .catch(() => {})
    },
    handleEdit(index) {
      this.editIndex = index
      this.loadDetail()
      this.openNew = true
    },
    loadDetail() {},
    async handleDelete(item) {
      let params = {
        id: item.id
      }
      try {
        let resp = await this.$http.delUser(params)
        let { IS_SUCCESS, msg: msg, data: data } = resp.respBody
        if (IS_SUCCESS) {
          MessageBox.alert('删除账号成功！').then(_ => {
            this.loadList()
          })
        } else {
          MessageBox.close()
          MessageBox.alert(msg)
        }
      } catch (e) {
        MessageBox(e.message)
      }
    },
    closePopup() {
      this.openNew = false
      this.showMenu = false
      this.showPlatform = false
      this.editIndex = -1
      this.submitParam = {
        userName: '',
        password: '',
        funcId: '',
        userType: '',
        parentId: '',
        sys : ''
      }
    },
    submitLink(userForm) {
      console.log(this.submitParam.funcId)
      this.$refs[userForm].validate(valid => {
        if (valid) {
          let params = this.submitParam
          params.updateStaffId = this.staffId
          this.submitData(params)
        } else {
          return false
        }
      })
    },
    async submitData(params) {
      if (this.editIndex === -1) { // 新增：
        try {
        let resp = await this.$http.addUser(params)
        let { IS_SUCCESS, msg: msg, data: data } = resp.respBody
        if (IS_SUCCESS) {
          MessageBox.alert('新增账号成功！').then(_ => {
            this.loadList()
          })
        } else {
          MessageBox.close()
          MessageBox.alert(msg)
        }
      } catch (e) {
        MessageBox(e.message)
      }
        console.log('新增：' + JSON.stringify(params))
      } else { // 修改：
        console.log('修改：' + JSON.stringify(params))
      }

    }
  }
}
</script>

<style lang="scss">
.lookPage {
  position: absolute;
  top: 0;
  left: 240px;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 0, 0.15);
}
.header {
  margin: 0;
}
.popup .popup-form {
  border-bottom: 1px dashed #efefef;
}
.popup .popup-form .col-item {
  margin: 20px auto;
  max-width: 300px;
}
.popup .fun-wrap {
  width: fit-content;
  margin: 20px auto;
}
.popup .fun-wrap .button {
  margin: 0 10px;
}
.content-page {
  margin: 50px;
}
.function button {
  float: right;
  margin-right: 30px;
  margin-bottom: 20px;
}
</style>
