<template>
  <el-dialog title="添加用户" :visible.sync="editFormVisible">
    <el-form
     :model="EditUserForm"
     ref="EditUserRuler"
     label-width="12%"
     :rules="EditUserRulers"
     label-position="left"
    >
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="EditUserForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="EditUserForm.email" autocomplete="off" label-position="left"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="EditUserForm.mobile" autocomplete="off" label-position="left"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleEditUserCancel">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEditUser">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getUserById, editUserById } from '@/api/user.js'
export default {
  data () {
    var mobileVaild = (rule, value, callback) => {
      if (value.length !== 13) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    return {
      editFormVisible: false,
      visible: '',
      EditUserRulers: {
        email: [
          {
            message: '请输入正确的邮箱格式',
            type: 'email'
          }
        ],
        mobile: [
          {
            validator: mobileVaild,
            type: 'number',
            message: '请输入正确的电话',
            len: 13
          }
        ]
      },
      EditUserForm: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    handleEditUserCancel () {
      this.editFormVisible = false
      // this.$refs.EditUserRuler.resetFields()
      this.$message({
        type: 'failed',
        message: `取消编辑`
      })
    },
    async showEditFormVisible (item) {
      const { data } = await getUserById(item.id)
      this.EditUserForm = data
      console.log(this.EditUserForm)
      this.editFormVisible = true
    },
    // 添加点击确定按钮
    handleEditUser () {
      this.$refs.EditUserRuler.validate(async (valid) => {
        if (valid) {
          const editResult = await editUserById(this.EditUserForm)
          this.editFormVisible = false
          // 判断添加状态并返回给用户
          if (editResult.status === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$emit('edit-success')
          } else {
            this.$message({
              type: 'failed',
              message: `编辑失败${editResult.meta.msg}`
            })
          }
          // this.$refs.EditUserRuler.resetFields()
        } else {
          // this.$refs.EditUserRuler.resetFields()
          return false
        }
      })
    }
  }
}
</script>
