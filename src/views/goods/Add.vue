<template>
  <div class="add">
    <el-container>
      <el-header>添加商品信息</el-header>
      <el-main>
        <!-- 步骤条 -->
        <!-- tabIndex-0 隐式装换把tabIndex变成数字 -->
        <el-steps :active="tabIndex-0" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
          <el-step title="步骤 4"></el-step>
          <el-step title="步骤 5"></el-step>
        </el-steps>
        <!-- tab栏 -->
        <el-tabs tab-position="left" v-model="tabIndex">
          <el-tab-pane label="基本信息" name="0">
            <!-- form表单 -->
            <el-form
              :model="goodsForm"
              :rules="rules"
              ref="goodsForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!-- 这里的prop的值是绑定验证规则的，prop值必须和v-model绑定的属性值相同，否则验证规则会拿不到值 -->
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="goodsForm.name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model.number="goodsForm.price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="weight">
                <el-input v-model.number="goodsForm.weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="numbers">
                <el-input v-model.number="goodsForm.numbers"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <!-- 级联选择器 -->
                <el-cascader
                  clearable
                  v-model="selectList"
                  :options="cateList"
                  :props="prop"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item style="text-align: center;margin-left:-100px">
                <el-button>取消</el-button>
                <el-button type="primary">确定</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1"></el-tab-pane>
          <el-tab-pane label="商品属性" name="2"></el-tab-pane>
          <el-tab-pane label="商品图片" name="3"></el-tab-pane>
          <el-tab-pane label="商品内容" name="4"></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getCategoriesList } from '@/api/categories_api.js'
export default {
  data () {
    return {
      // tab栏 和 步骤条关联的关键变量
      tabIndex: 0,
      //   表单的输入绑定
      goodsForm: {
        name: '',
        price: '',
        weight: '',
        numbers: ''
      },
      //   验证规则
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        numbers: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ]
      },
      //   分类数据
      cateList: [],
      //   用户选择的数据
      selectList: [],
      //   级联选择器的props属性
      prop: {
        //   任意一级选项
        checkStrictly: true,
        label: 'cat_name', // 展示给用户看的id对应的名字
        value: 'cat_id', // 真实的id值
        children: 'children' // 子级数据
      }
    }
  },
  mounted () {
    //   获取级联选择器的数据
    getCategoriesList(3)
      .then(res => {
        if (res.data.meta.status === 200) {
          this.cateList = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    //   选择级联选择器中的选项的id值
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #d7e2ef;
  color: #333;
  line-height: 40px;
  height: 40px !important;
  margin-top: -15px;
}
</style>
