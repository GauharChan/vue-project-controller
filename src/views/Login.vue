<template>
  <div class="login">
    <div class="container">
      <!-- 头像 -->
      <img class="avatar" src="@/assets/avatar.jpg" alt />
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="myicon myicon-user"
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="loginTo"
            prefix-icon="myicon myicon-key"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click.native="loginTo" class="login-btn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user_api.js'
import store from '@/store/store.js'
export default {
  store,
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    loginTo () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          login(this.ruleForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                // 存储token
                localStorage.setItem('userLogin', res.data.data.token)
                // 存用户名到store中
                this.$store.dispatch('setUserName', res.data.data.username)
                // 跳转
                this.$router.push({ name: 'Home' })
              } else {
                // 登录失败提示
                this.$notify.error({
                  duration: '2000',
                  position: 'top-left',
                  message: res.data.meta.msg,
                  showClose: false
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          // 输入出错提示
          this.$notify.error({
            duration: '2000',
            position: 'top-left',
            message: '数据输入错误，请重新输入',
            showClose: false
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
