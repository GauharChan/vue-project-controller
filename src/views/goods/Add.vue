<template>
  <div class="add">
    <el-container>
      <el-header>添加商品信息</el-header>
      <el-main>
        <!-- 步骤条 -->
        <!-- tabIndex-0 隐式装换把tabIndex变成数字 -->
        <el-steps :active="tabIndex-0" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
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
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="goodsForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model.number="goodsForm.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model.number="goodsForm.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model.number="goodsForm.goods_number"></el-input>
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
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1"></el-tab-pane>
          <el-tab-pane label="商品属性" name="2"></el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
              :file-list="fileList"
              list-type="picture"
              :headers="getToken"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本框插件 -->
            <quillEditor
            style="height:300px; border-bottom:1px solid #ccc;"
            ref="contents"
            v-model="goodsForm.goods_introduce"
            ></quillEditor>
          </el-tab-pane>
        </el-tabs>
        <div style="text-align:center">
          <el-button>取消</el-button>
          <el-button style="margin-top:15px" type="primary" @click="addNewGoods">确定</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getCategoriesList, addGoods } from '@/api/categories_api.js'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      fileList: [],
      // tab栏 和 步骤条关联的关键变量
      tabIndex: 0,
      //   表单的输入绑定
      goodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        pics: [],
        goods_introduce: '',
        goods_state: 1
      },
      //   验证规则
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        goods_number: [
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
  components: {
    quillEditor
  },
  computed: {
    // 上传图片是设置请求头，token
    getToken () {
      let token = localStorage.getItem('userLogin')
      return { 'Authorization': token }
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
    // 添加新的商品，确定按钮
    addNewGoods () {
      // 再次验证表单
      this.$refs.goodsForm.validate((vali) => {
        if (vali) {
          console.log(this.goodsForm)
          addGoods(this.goodsForm)
            .then((res) => {
              if (res.data.meta.status === 201) {
                this.$router.push({ name: 'Goods' })
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$message.warning('商品的基本信息填写有误，请重新输入')
        }
      })
    },
    //   选择级联选择器中的选项的id值
    handleChange (val) {
      this.goodsForm.goods_cat = val.join()
    },
    // 删除上传的图片
    handleRemove (file, fileList) {
      if (file.response) {
        // 删除的图片的路径
        let delPath = file.response.data.tmp_path
        // 遍历goodsForm.pics数组，删除对应的数据
        this.goodsForm.pics.map((e, i) => {
          if (e.pic.indexOf(delPath) !== -1) {
            this.goodsForm.pics.splice(i, 1)
          }
        })
      } else {

      }
    },
    // 图片上传成功的钩子
    uploadSuccess (response, file, fileList) {
      let path = { 'pic': response.data.tmp_path }
      this.goodsForm.pics.push(path)
    },
    // 上传图片之前，限定只能上传图片，不能上传其他文件
    beforeUpload (file) {
      if (file.type.indexOf('image/') === -1) {
        this.$message.warning('只能上传图片哦！')
        return false
      }
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
