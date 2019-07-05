<template>
  <div class="authorityList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="tableData"  border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="80">
          <template slot-scope="scope">
              {{scope.row.level | rightLevel}}
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { authList } from '@/api/authority_api.js'
export default {
  data () {
    return {
      tableData: null
    }
  },
  mounted () {
    authList('list')
      .then((res) => {
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  filters: {
    rightLevel (old) {
      old = parseInt(old)
      if (old === 0) {
        return '一级'
      } else if (old === 1) {
        return '二级'
      } else if (old === 2) {
        return '三级'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
