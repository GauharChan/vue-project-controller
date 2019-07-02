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
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 300px; margin-right:20px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>成功按钮</el-button>
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
          <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="sizeChange"
        @current-change="change"
        :current-page="currentPage1"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { userList } from '@/api/api.js'
export default {
  data () {
    return {
      currentPage1: 1,
      switchValue: true,
      userList: null,
      params: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      sum: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
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
    init () {
      userList(this.params)
        .then(res => {
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
