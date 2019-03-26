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
        <el-input placeholder="请输入内容" v-model="searchText" @keyup.enter.native="onload()">
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
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="handleChangeState(scope.row)"
            active-text="开启"
            inactive-text="关闭">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.userEditEl.showEditFormVisible(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleUserDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作分类">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$refs.userRoleEl.showRoleFormVisible(scope.row)">分类角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
    <!-- 用户添加 -->
    <UserAdd ref="userAddEl" v-on:add-success="onload"></UserAdd>
    <!-- 用户编辑 -->
    <EditUser ref="userEditEl" v-on:edit-success="onload"></EditUser>
    <!-- 用户状态改变 -->
    <EditUserRole ref="userRoleEl"></EditUserRole>
  </el-card>
</template>

<script>
import { getUserList, delUser, changeState } from '@/api/user.js'
import UserAdd from './adduser.vue'
import EditUser from './edituser.vue'
import EditUserRole from './edituserrole.vue'
export default {
  name: 'userlist',
  created () {
    this.onload()
  },
  data () {
    return {
      currentPage4: 4,
      users: [],
      searchText: '',
      pagenNum: '1',
      pageSize: '5',
      totalNum: ' '
    }
  },
  methods: {
    async  onload () {
      const { data } = await getUserList({ query: this.searchText, pagenum: this.pagenNum, pagesize: this.pageSize })
      this.users = data.users
      this.totalNum = data.total
    },
    handleUserDelete (row) {
      this.$confirm('确认删除该用户么', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 确认
        const { meta } = await delUser(row.id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.onload()
        }
      }).catch((err) => { // 取消
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleChangeState (item) {
      const { meta, data } = await changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`
        })
      }
    },
    // 分页方法
    handleSizeChange (val) {
      this.pageSize = val
      this.onload()
    },
    handleCurrentChange (val) {
      this.pagenNum = val
      this.onload()
    }
  },
  components: {
    UserAdd,
    EditUser,
    EditUserRole
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
.block {
  margin-top: 20px;
}
</style>
