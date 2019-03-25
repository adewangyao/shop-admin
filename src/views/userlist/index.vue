<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix userNameH">
      <!-- 列表头部 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="searchText">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="$refs.userAddEl.showFormVisible()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="users" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
    </el-table>
    <!-- 用户添加 -->
    <UserAdd ref="userAddEl" v-on:add-success="onload"></UserAdd>
  </el-card>
</template>
<script>
import { getUserList } from '@/api/user.js'
import UserAdd from './adduser.vue'
export default {
  name: 'userlist',
  created () {
    console.log(UserAdd)
    this.onload()
  },
  data () {
    return {
      users: [],
      searchText: ''
    }
  },
  methods: {
    async  onload () {
      const { data } = await getUserList({ pagenum: 1, pagesize: 100 })
      console.log(data)
      this.users = data.users
    }
  },
  components: {
    UserAdd
  }
}
</script>
<style>
.box-card {
  width: 100%;
  height: 100%;
}
.searchUser {
  width: 40px;
}
.userNameH {
  height: 16px;
}
.userListName {
  float: left;
}
</style>
