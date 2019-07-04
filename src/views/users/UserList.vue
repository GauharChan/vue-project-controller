<template>
  <div class="userList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin: 15px 0;">
      <el-input
        v-model="params.query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 300px; margin-right:20px"
        @keyup.enter.native="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
      <!-- 自定义列模板 -->
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <!-- 通过scope.row获取对应的一行的表格数据 -->
          <el-switch
            @change="changeStatus(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button
              @click="allotrole(scope.row)"
              type="info"
              plain
              icon="el-icon-share"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              @click="deleteuser(scope.row.id,sum)"
              type="danger"
              plain
              icon="el-icon-delete"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        background
        :pager-count="5"
        @size-change="sizeChange"
        @current-change="change"
        :current-page="params.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sum"
      ></el-pagination>
    </div>
    <!-- 添加用户dialog对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-form-item label="用户名" :label-width="'80px'" prop="username">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="'80px'" prop="password">
          <el-input
            type="password"
            v-model="userForm.password"
            autocomplete="off"
            @keyup.enter.native="addNew"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'80px'" prop="email">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="'80px'" prop="mobile">
          <el-input v-model="userForm.mobile" autocomplete="off" @keyup.enter.native="addNew"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色dialog对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form :model="roleForm">
        <el-form-item label="用户名" :label-width="'120px'">
          <el-input v-model="roleForm.username" autocomplete="off" disabled="" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="'120px'">
          <el-select v-model="roleForm.rid" placeholder="请选择角色">
            <!-- v-for循环生成选项 -->
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  addNewUser,
  changeState,
  delteUserById,
  allotRole
} from '@/api/user_api.js'
import { roleList } from '@/api/role_api.js'
export default {
  data () {
    return {
      // 角色列表
      rolelist: null,
      // 分配角色dialog
      roleForm: {
        username: '',
        rid: ''

      },
      roleDialogFormVisible: false,
      // switch开关状态
      switchValue: true,
      // 用户列表数据
      userList: null,
      // 请求用户数据的参数
      params: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      // 数据总条数
      sum: 0,
      // 控制dialog窗口的显示隐藏
      dialogFormVisible: false,
      // dialog数据源
      userForm: {
        username: '',
        password: '',
        email: '24@qq.com',
        mobile: '13055555555'
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
            // eslint-disable-next-line no-useless-escape
            pattern: /\w+[@]\w+[\.]\w{2,3}/
          }
        ],
        mobile: [
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    // 加载页面的时候请求一次
    this.init()
    roleList()
      .then(res => {
        if (res.data.meta.status === 200) {
          this.rolelist = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(err1 => {
        console.log(err1)
      })
  },
  methods: {
    // 分配角色
    allotrole (row) {
      this.roleDialogFormVisible = true
      // 获取当前行的数据
      this.roleForm.rid = row.rid
      this.roleForm.username = row.username
    },
    // 删除用户
    deleteuser (id, total) {
      this.$confirm('该操作将会永久删除该用户，请三思', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delteUserById(id, total)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
                // 删除后，重新计算页数再请求，避免出现页面没数据的情况, 删除后得到的页码小于没删除前的页码的话，代表当前页面没有数据
                this.params.pagenum =
                  Math.ceil((total - 1) / this.params.pagesize) <
                  this.params.pagenum
                    ? --this.params.pagenum
                    : this.params.pagenum
                this.init()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err1 => {
              this.$message.error(err1)
            })
        })
        .catch(() => {})
    },
    // 修改用户状态
    changeStatus (uId, type) {
      changeState(uId, type)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err1 => {
          this.$message.error(err1)
        })
    },
    // 添加用户
    addNew () {
      this.$refs.userForm.validate(vali => {
        if (vali) {
          addNewUser(this.userForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.dialogFormVisible = false
                this.$message.success(res.data.meta.msg)
                this.init()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.error('请正确的填写资料再确定')
          return false
        }
      })
    },
    // 用户筛选搜索方法
    search () {
      this.params.pagenum = 1
      this.init()
    },
    //   改变当前页码数
    change (index) {
      this.params.pagenum = index
      this.init()
    },
    // 改变当前显示条数
    sizeChange (index) {
      this.params.pagesize = index
      this.init()
    },
    // 封装请求用户信息方法
    init () {
      userList(this.params)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.sum = res.data.data.total
            this.userList = res.data.data.users
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
