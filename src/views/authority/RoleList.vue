<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" plain @click="roleFormVisible = true">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="roleList" style="width: 100%; margin-top:15px" border>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 应该一个权限占一行 -->
          <!-- 第一层权限 -->
          <el-row v-for="first in scope.row.children" :key="first.id">
            <el-col :span="4">
              <el-tag
                @close="delTag(scope.row,first.id)"
                style="margin:10px 20px 10px 0"
                closable
                type="success"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 第二层权限 -->
              <el-row
                v-for="second in first.children"
                :key="second.id"
                style="border-bottom: .5px dashed #ccc"
              >
                <el-col :span="4">
                  <el-tag
                    @close="delTag(scope.row,second.id)"
                    style="margin:10px 20px 10px 0"
                    closable
                    type="warning"
                  >{{second.authName}}</el-tag>
                </el-col>
                <!-- 第三层权限 -->
                <el-col :span="20">
                  <el-tag
                    @close="delTag(scope.row,third.id)"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin:10px 10px 10px 0"
                    closable
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 没数据的时候显示 -->
          <el-row v-show="scope.row.children.length === 0">
            <el-col style="font-weight:600">你还没有数据，快去添加吧</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
            <el-button @click="getTreeData(scope.row)" type="info" plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 授权角色dialog -->
    <el-dialog title="授权角色" :visible.sync="dialogFormVisible">
      <!-- default-expanded-keys => 默认展开的id -->
      <!-- default-checked-keys => 默认选中的id -->
      <el-tree
        ref="mytree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="hasChecked"
        :props="defaultProps"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeImpower">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户dialog对话框 -->
    <el-dialog title="添加用户" :visible.sync="roleFormVisible">
      <el-form :model="roleForm" :rules="rules" ref="roleForm">
        <el-form-item label="角色名称" :label-width="'80px'" prop="roleName">
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="'80px'">
          <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { roleList, deleteRight, impower, addNewRole } from '@/api/role_api.js'
import { authList } from '@/api/authority_api.js'
export default {
  data () {
    return {
      // 角色列表数据
      roleList: null,
      // 控制授权角色dialog显示隐藏
      dialogFormVisible: false,
      treeData: null,
      // 树形组件的配置
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      hasChecked: [],
      // 执行分配权限的当前角色的id
      tempId: '',
      // 控制添加用户dialog显示隐藏
      roleFormVisible: false,
      roleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 验证非空
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 添加角色
    addNew () {
      // roleForm
      this.$refs.roleForm.validate((vali) => {
        if (vali) {
          addNewRole(this.roleForm)
            .then((res) => {
              if (res.data.meta.status === 201) {
                this.init()
                this.roleFormVisible = false
                this.$message.success(res.data.meta.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$message.error('您的输入有误')
          return false
        }
      })
    },
    // 修改权限
    changeImpower () {
      let nodes = this.$refs.mytree.getCheckedNodes()
      let roleId = this.tempId
      // 临时数组
      let temp = []
      // 遍历获取选中的节点的id和父节点id
      nodes.forEach(e => {
        temp.push(e.id + ',' + e.pid)
      })
      // 以逗号分割为字符串，把数组里的值变成类似'1,2,3'
      let arr = temp.join(',')
      // 再把字符串转换为数组:['1','2','3']
      let arr1 = arr.split(',')
      // 利用Set对象去重，去重后转换为数组，最终目的转换为字符串
      let rids = [...new Set([...arr1])].join(',')
      // 传入接口需要的参数
      impower(roleId, rids)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            // 刷新数据
            this.init()
            this.dialogFormVisible = false
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取树形结构
    getTreeData (row) {
      this.tempId = row.id
      authList('tree')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.treeData = res.data.data
            // 每次遍历权限前，先清空存放权限id的数组
            this.hasChecked.length = 0
            // 默认选中
            // 第一级
            row.children.forEach(first => {
              // 第二级
              if (first.children && first.children.length > 0) {
                first.children.forEach(second => {
                  if (second.children && second.children.length > 0) {
                    // 第三级
                    second.children.forEach(third => {
                      // default-checked-keys 需要的是一个id数组
                      this.hasChecked.push(third.id)
                    })
                  }
                })
              }
            })
            this.dialogFormVisible = true
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err1 => {
          this.$message.error(err1)
        })
    },
    // 删除权限Tag标签
    delTag (row, rightId) {
      deleteRight(row.id, rightId)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            row.children = res.data.data
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取角色列表
    init () {
      roleList()
        .then(res => {
          if (res.data.meta.status === 200) {
            this.roleList = res.data.data
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
<style>
</style>
