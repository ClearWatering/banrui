<!--
 * @Author: yinht
 * @FilePath: /my-project/src/views/service/accountManager.vue
 * @Date: 2020-12-04 11:11:40
 * @LastEditors: yinht
 * @LastEditTime: 2020-12-12 14:36:29
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
    <div class="lookPage">
      <p class="header">
        <!-- <span>新建账号</span> -->
      </p>
      <!-- 列表 -->
      <div class="content-page">
        <div class="ctx">
          <div class="function">
            <button class="button search create"
                    @click="handleCreate">
              <i class="el-icon-plus"></i>新增
            </button>
          </div>
          <el-table :header-cell-style="{background:'#eef1f6',color:'#606266',padding:'0px'}"
                    :header-row-style="{height:'30px'}"
                    :row-style="{height:'36px'}"
                    :cell-style="{padding:'0px'}"
                    :data="tableData"
                    v-loading="loading"
                    stripe
                    style="width: 100%">
            <el-table-column prop="userName"
                             label="账号名称"
                             align="center">
            </el-table-column>
            <el-table-column prop="password"
                             label="密码"
                             align="center">
            </el-table-column>
            <el-table-column prop="name"
                             label="账号类型"
                             align="center">
            </el-table-column>
            <el-table-column prop="platformName"
                             label="平台名称"
                             align="center">
            </el-table-column>
            <el-table-column prop="createTime"
                             label="创建时间"
                             align="center">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             width="100"
                             align="center">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index)"
                           type="text"
                           size="small">修改</el-button>
                <el-button @click="handleDelete(scope.$index)"
                           type="text"
                           size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="+queryData.page"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="+queryData.limit"
                           :pager-count="5"
                           background
                           :total="+totalCount">
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 新增/修改账户 -->
      <newAccount :visible="openNew"
                  :title="`账号维护-${this.editIndex===-1?'新增':'修改'}`"
                  width="40%"
                  :loading="loadingPopup"
                  :beforeClose="handleClose">
        <el-form ref="stateForm"
                 :model="submitParam"
                 :rules="rules"
                 label-width="110"
                 label-position="right"
                 class="popup-form">
          <el-form-item label="新建名称"
                        prop="userName"
                        class="col-item">
            <el-input style="width:193px;"
                      placeholder="请输入内容"
                      v-model="submitParam.userName"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="新建密码"
                        prop="password"
                        class="col-item">
            <el-input style="width:193px;"
                      placeholder="请输入内容"
                      v-model="submitParam.password"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="菜单权限"
                        prop="funcList"
                        class="col-item">
            <el-select v-model="submitParam.menuChoose"
                       multiple
                       placeholder="请选择">
              <el-option v-for="item in menuList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户类型"
                        prop="userType"
                        class="col-item">
            <el-select v-model="submitParam.userType"
                       @change="selectUserType"
                       placeholder="请选择">
              <el-option v-for="item in userTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属平台"
                        prop="platform"
                        v-show="this.showPlatform"
                        class="col-item">
            <el-select v-model="submitParam.platform"
                       placeholder="请选择">
              <el-option v-for="item in platformList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
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
          </el-form-item> -->
        </el-form>
        <div class="fun-wrap">
          <button class="button reset"
                  @click="handleClose">取消</button>
          <button class="button search"
                  @click="submitLink">提交</button>
        </div>
      </newAccount>
    </div>
  </div>
</template>

<script>
import newAccount from '../components/new-account'
export default {
  name: 'accountManager',
  components: {newAccount},
  data () {
    return {
      openNew: false,
      userTypeList: [
        {
          value: '子管理员',
          lebel: '1'
        },
        {
          value: '一级平台',
          lebel: '2'
        },
        {
          value: '二级平台',
          lebel: '4'
        }
      ],
      platformList: [],
      userType: '',
      platform: '',
      menuChoose: '',
      menuList: [],
      userName: '',
      password: '',
      showPlatform: false,
      input: '',
      loading: false,
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
        menuChoose: '',
        userType: '',
        platform: '',
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入名称'
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '账户名称不合法'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入账户密码'
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: '密码必须包含数字加英文字母'
          }
        ],
        funcList: [
          {
            required: true,
            message: '请选择菜单权限'
          }
        ],
        userType: [
          {
            required: true,
            message: '请选择用户类型'
          }
        ],
        platform: [
          {
            required: () => {
              return this.submitParam.userType === '一级平台' || this.submitParam.userType === '二级平台'
            },
            message: '请选择所属平台'
          }
        ]
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
  mounted () {
    this.loadList()
  },
  created: function () {

  },
  methods: {
    selectUserType () {
      if (this.submitParam.userType === '一级平台' || this.submitParam.userType === '二级平台') {
        this.showPlatform = true
      }
    },
    loadList () {
      let params = {
        parentId: '3'
      }
      this.post(this.$url.qryUser, params, true, '', (result) => {
        this.tableData = result.userList
      });
    },
    handleCreate () {
      this.openNew = true
      this.editIndex = -1
    },
    handleSizeChange (val) {
      this.queryData.limit = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.queryData.page = val
      this.loadData()
    },
    handleClose () {
      this.$confirm('是否要退出编辑', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.closePopup()
      }).catch(() => { })
    },
    handleEdit (index) {
      this.editIndex = index
      this.loadDetail()
      this.openNew = true
    },
    loadDetail () {

    },
    handleDelete () {

    },
    closePopup () {
      this.openNew = false
      this.editIndex = -1
      this.submitParam = {
        userName: '',
        password: '',
        menuChoose: '',
        userType: '',
        platform: '',
      }
    },
    submitLink () {
      this.$refs['stateForm'].validate((valid) => {
        if (valid) {
          let params = this.submitParam
          params.updateStaffId = this.staffId
          this.submitData(params)
        } else {
          return false
        }
      })
    },
    goSearchAccount () {
      this.$router.push('accountManager');
    }
  }
}
</script>

<style lang="scss">
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
