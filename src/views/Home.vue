<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <!-- logo图标 -->
        <div class="logo"></div>
        <!-- 导航菜单 -->
        <el-row class="tac">
          <!-- 用户管理菜单 -->
          <el-col :span="24">
            <el-menu
              :router="true"
              :unique-opened="true"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户列表</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <!-- 权限管理菜单 -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="2-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>角色列表</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限列表</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>

