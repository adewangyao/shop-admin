<template>
  <el-dialog title="分配权限" :visible="dialogFormVisible">
    <el-tree
      :data="treedatas"
      show-checkbox
      node-key="id"
      ref="tree"
      default-expand-all
      :default-checked-keys="checked"
       :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="giveRoleSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
import { getRightList } from '@/api/rightList'
import { giveRoleRight } from '@/api/role'
export default {
  data () {
    return {
      roleId: '',
      dialogFormVisible: false,
      treedatas: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checked: []
    }
  },

  methods: {
    showAssignRight (checkedMes) {
      this.roleId = checkedMes.id
      this.dialogFormVisible = true
      this.loadTree()
      this.checked = []
      // 遍历获取被选中
      checkedMes.children.forEach(element => {
        element.children.forEach(second => {
          second.children.forEach(third => {
            this.checked.push(third.id)
          })
        })
      })
    },
    async loadTree () {
      const { data, meta } = await getRightList('tree')
      if (meta.status === 200) {
        this.treedatas = data
      }
    },

    async giveRoleSubmit () {
      const checkedKey = this.$refs.tree.getCheckedKeys()
      const checkedKeyS = this.$refs.tree.getHalfCheckedKeys()
      const rids = [...checkedKey, ...checkedKeyS].join(',')
      console.log(rids)
      const { data } = await giveRoleRight(this.roleId, rids)
      if (data.meta.status === 200) {
        this.dialogFormVisible = false
        this.$emit('assign-success')
        this.$message({
          type: 'success',
          message: '分配权限成功'
        })
      }
    }
  },

  created () {
  }
}
</script>
