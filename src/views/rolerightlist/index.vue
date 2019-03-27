<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="$refs.handeleRoleEl.formVisible()" >添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      :data="tableData"
      class="addbtn"
      height="480"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
              <el-row v-for="first in props.row.children" :key="first.id" class="borederone">
                <el-col :span="3">
                  <el-tag
                    closable
                    type="">
                    {{first.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="21">
                  <el-row  v-for="second in first.children" :key="second.id" class="boredertwo">
                    <el-col :span="3">
                      <el-tag
                      closable
                      type="success">
                      {{second.authName}}
                      </el-tag>
                    </el-col>
                    <el-col :span="21">
                      <el-tag
                        v-for="third in second.children"
                        :key="third.id"
                        closable
                        class="borederthree"
                        type="warning">
                        {{third.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc">
      </el-table-column>
      <el-table-column
        label="操作"
        prop="desc">
          <el-button size="mini" type="primary" plain>编辑</el-button>
          <el-button size="mini" type="danger" plain>删除</el-button>
          <el-button size="mini" type="warning" plain>分配权限</el-button>
      </el-table-column>
    </el-table>
    <!-- 添加框 -->
    <handeleRole ref="handeleRoleEl" v-on:addRole-success="roleload"></handeleRole>
  </el-card>
</template>
<script>
import { getRoleList } from '@/api/role'
import handeleRole from './addrole'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async roleload () {
      const { data } = await getRoleList()
      this.tableData = data
      console.log(this.tableData)
    }
  },
  components: {
    handeleRole
  },
  created () {
    this.roleload()
  }
}
</script>
<style>
.addbtn {
  margin-top: 8px;
}
.borederone {
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgb(228, 222, 222);
}
.boredertwo {
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgb(228, 222, 222);
}
.borederthree {
  margin: 2px;
}
</style>
