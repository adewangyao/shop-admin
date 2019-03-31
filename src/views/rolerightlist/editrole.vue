<template>
  <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisible">
    <el-form :model="formdata" :rules="rules" ref="formdata">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formdata.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" >
        <el-input v-model="formdata.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { editRole } from '@/api/role'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formdata: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [{ required: true, triger: 'blur', message: '不能为空' }]
      },
      id: '',
      formLabelWidth: '120px'
    }
  },
  methods: {
    showEditRole (item) {
      this.dialogFormVisible = true
      this.formdata.roleName = item.roleName
      this.formdata.roleDesc = item.roleDesc
      this.id = item.id
    },
    handleEdit () {
      console.log(1)
      this.$refs.formdata.validate(async (valid) => {
        if (valid) {
          console.log(this.formdata)
          const { data } = await editRole(this.formdata, this.id)
          if (data.meta.status === 200) {
            this.dialogFormVisible = false
            this.$emit('editrole-success')
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
          } else {
            this.$message({
              type: '',
              message: '编辑失败'
            })
          }
        }
      })
    }
  }
}
</script>
