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
      <el-button @click="$router.push('/home/goods/add')">添加商品</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      params: {
        query: ''
      }
    }
  },
  methods: {
    search () {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
