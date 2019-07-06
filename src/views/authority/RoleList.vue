<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary">主要按钮</el-button>
    <!-- 表格 -->
    <el-table :data="roleList" style="width: 100%" border>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 应该一个权限占一行 -->
          <!-- 第一层权限 -->
          <el-row v-for="first in scope.row.children" :key="first.id" >
            <el-col :span="4">
              <el-tag @close="delTag(scope.row,first.id)" style="margin:10px 20px 10px 0" closable type="success">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
                <!-- 第二层权限 -->
              <el-row v-for="second in first.children" :key="second.id" style="border-bottom: .5px dashed #ccc">
                <el-col :span="4">
                    <el-tag @close="delTag(scope.row,second.id)" style="margin:10px 20px 10px 0" closable type="warning">{{second.authName}}</el-tag>
                </el-col>
                <!-- 第三层权限 -->
                <el-col :span="20">
                    <el-tag @close="delTag(scope.row,third.id)" v-for="third in second.children" :key="third.id" style="margin:10px 10px 10px 0" closable >{{third.authName}}</el-tag>
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
            <el-button type="info" plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { roleList, deleteRight } from '@/api/role_api.js'
export default {
  data () {
    return {
      roleList: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 删除权限Tag标签
    delTag (row, rightId) {
      deleteRight(row.id, rightId)
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            row.children = res.data.data
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch((err) => {
          console.log(err)
      })
    },
    // 获取角色列表
    init () {
      roleList()
        .then(res => {
          console.log(res)
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
