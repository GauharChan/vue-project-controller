<template>
  <div class="lists">
    <!-- 搜索框 -->
    <div style="margin: 15px 0;">
      <el-input
        v-model="params.query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 300px; margin-right:15px"
        @keyup.enter.native="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button @click="$router.push('/home/goods/add')" type="primary">添加商品</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="480"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180"></el-table-column>
      <!-- 自定义列模板 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button  type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button  type="info" plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods_api.js'
export default {
  data () {
    return {
      // 接口参数
      params: {
        query: '',
        pagenum: 1,
        pagesize: 20
      },
      //   商品数据源
      goodsList: null,
      // 总数
      sum: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    search () {
      // 搜索框
      this.init()
    },
    // 获取商品数据方法
    init () {
      getGoodsList(this.params)
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.goodsList = res.data.data.goods
            this.sum = res.data.data.total
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    sizeChange (size) {
      // 每页条数发生改变时
      this.params.pagesize = size
      this.init()
    },
    change (num) {
      // 页码数改变时
      this.params.pagenum = num
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
