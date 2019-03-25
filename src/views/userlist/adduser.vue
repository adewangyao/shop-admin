<template>
  <el-dialog title="添加用户" :visible.sync="addFormVisible">
    <el-form
     :model="AddUserForm"
     ref="addUserRule"
     label-width="12%"
     :rules="addFormRules"
     label-position="left"
    >
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="AddUserForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="AddUserForm.password" autocomplete="off" label-position="left"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="AddUserForm.email" autocomplete="off" label-position="left"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="AddUserForm.mobile" autocomplete="off" label-position="left"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleAddUserCancel">取 消</el-button>
      <el-button type="primary" @click="handleAddUser">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addUser } from '@/api/user.js'
export default {
  data () {
    var userVaild = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var passVaild = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var mobileVaild = (rule, value, callback) => {
      if (value.length !== 13) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    return {
      addFormVisible: false,
      visible: '',
      addFormRules: {
        username: [
          {
            validator: userVaild,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: passVaild,
            triggrt: 'blur'
          }
        ],
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
      AddUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    handleAddUserCancel () {
      this.addFormVisible = false
      this.$refs.addUserRule.resetFields()
    },
    showFormVisible () {
      this.addFormVisible = true
    },
    // 添加点击确定按钮
    handleAddUser () {
      this.$refs.addUserRule.validate(async (valid) => {
        if (valid) {
          const addResult = await addUser(this.AddUserForm)
          this.addFormVisible = false
          // 判断添加状态并返回给用户
          if (addResult.meta.status === 201) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.$emit('add-success')
          } else {
            this.$message({
              type: 'failed',
              message: `添加失败${addResult.meta.msg}`
            })
          }
          this.$refs.addUserRule.resetFields()
        } else {
          this.$refs.addUserRule.resetFields()
          return false
        }
      })
    }
  }
}
</script>
