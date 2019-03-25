<template>
  <el-container class="el-con">
    <el-header class="header" height="100px">
      <el-row class="el-Header" padding="0">
        <el-col :span="6">
            <img src="./logo.jpg" alt="" class="logo">
        </el-col>
        <el-col :span="17" class="logoFont">
          小时光后台管理
        </el-col>
        <el-col :span="1">
          <el-button @click="outLogin" type="primary" plain>退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- el-row为分栏布局 -->
    <el-container>
      <el-row class="tag" height="100%">
        <!-- 侧边栏 -->
        <el-col :span="4" class="height">
          <el-aside width="100%" class="aside">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :router="true"
            >
              <el-submenu index="1">
                <template slot="title" class="titleSide">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group >
                  <el-menu-item index="/users">用户列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="fa fa-address-book" style="margin-right:4px"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">角色列表</el-menu-item>
                  <el-menu-item index="2-2">权限列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">商品列表</el-menu-item>
                  <el-menu-item index="3-2">分类参数</el-menu-item>
                  <el-menu-item index="3-3">商品分类</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">订单列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">统计列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
        </el-col>
        <!-- 主要内容区域 -->
        <el-col :span="20" class="height">
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from '@/untils/auth.js'
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    outLogin () {
      this.$confirm('确认退出么', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        this.$router.replace('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
.titleSide {
  padding-left: 0px;
}
.height {
  height: 100%;
}
.el-con {
  height: 100%;
}
.header {
  height: 400px;
  background: rgba(155, 221, 155);
}
.el-Header {
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.logoFont {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
}
.logo {
  margin: 0 auto;
  height: 100px;
  display: block;
}
.aside {
  padding-top: 40px;
  width: 100%;
  height: 100%;
  background: #fff;
}
.tag {
  width: 100%;
}
.main {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
