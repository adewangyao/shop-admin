<template>
  <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="addRoleRule" ref="addRoleRRR">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handelAddRole">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addRole } from '@/api/rolelist'
export default {
  data () {
    return {
      form: {
        roleDesc: '',
        roleName: ''
      },
      dialogFormVisible: false,
      addRoleRule: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    formVisible () {
      this.dialogFormVisible = true
    },
    async handelAddRole () {
      this.$refs.addRoleRRR.validate(async (valid) => {
        if (valid) {
          const { data } = await addRole(this.form)
          console.log(data.meta)
          if (data.meta.status === 201) {
            this.dialogFormVisible = false
            this.$emit('addRole-success')
            this.$message({
              type: 'success',
              message: `${data.meta.msg}`
            })
          } else {
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: `${data.meta.msg}`
            })
          }
        }
        this.$refs.addRoleRRR.resetFields()
      })
    }
  }
}
</script>
