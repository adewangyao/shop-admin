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
              <el-submenu :index="item.path" v-for="item in menus" :key="item.id" >
                <template slot="title" class="titleSide">
                  <i class="el-icon-location"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group >
                  <el-menu-item :index="`/${first.path}`" v-for="first in item.children" :key="first.id">
                  {{first.authName}}</el-menu-item>
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
import { menuRight } from '@/api/menu'
export default {
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadRightsMenu()
  },
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
    },
    async loadRightsMenu () {
      const { data } = await menuRight()
      this.menus = data.data
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
  max-height: 522px;
  overflow: auto;
  background-color: #fff;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
