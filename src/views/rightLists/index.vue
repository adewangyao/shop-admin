<template>
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="权限路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="权限层级">
      <template slot-scope="scope">
        {{ ['一级', '二级', '三级'][scope.row.level] }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getRightList } from '@/api/rightList'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadrights () {
      const { data, meta } = await getRightList('list')
      if (meta.status === 200) {
        this.tableData = data
        console.log(data)
      }
    }
  },
  created () {
    this.loadrights()
  }
}
</script>
