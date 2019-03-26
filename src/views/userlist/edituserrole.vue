<template>
  <el-dialog title="添加用户" :visible.sync="editFormVisible" width="40%">
    <el-form
    :model="EditForm"
     ref="EditUserRuler"
     label-width="20%"
     label-position="left"
    >
      <el-form-item label="用户名称">
        <el-input v-model="EditForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select placeholder="请选择" v-model="EditForm.rid">
          <el-option :value="-1" label="请选择"></el-option>
          <el-option
            v-for="(item,index) in roles"
            :label="item.roleName"
            :value="item.id" :key="index">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleEditUserCancel">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEditUser">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getUserById, userRole } from '@/api/user.js'
import { getRoleList } from '@/api/role.js'
export default {
  data () {
    return {
      editFormVisible: false,
      visible: '',
      roles: [],
      EditForm: {
        username: '',
        rid: ''
      }
    }
  },
  methods: {
    handleEditUserCancel () {
      this.editFormVisible = false
      // this.$refs.EditUserRuler.resetFields()
      this.$message({
        type: 'failed',
        message: `取消更改`
      })
    },
    async showRoleFormVisible (item) {
      const { data } = await getUserById(item.id)
      this.EditForm = data
      const { data: roleData } = await getRoleList()
      this.roles = roleData
      this.editFormVisible = true
    },
    // 添加点击确定按钮
    async handleEditUser () {
      const editResult = await userRole(this.EditForm)
      console.log(editResult)
      this.editFormVisible = false
      // 判断添加状态并返回给用户
      if (editResult.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else {
        this.$message({
          type: 'failed',
          message: `编辑失败${editResult.meta.msg}`
        })
      }
    }
  }
}
</script>
