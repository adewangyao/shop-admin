<template>
<el-card class="box-card">
  <el-col :span="8">
  <el-input v-model="searchText" placeholder="请输入内容" class="searchText"></el-input>
  </el-col>
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      type="index"  >
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      width="80"
      label="商品价格">
    </el-table-column>
    <el-table-column
      prop="goods_state"
      width="80"
      label="商品状态">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      width="80"
      label="商品重量">
    </el-table-column>
    <el-table-column
      prop="upd_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      label="编辑" width="220">
      <template slot-scope="scope">
        <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
        <el-button size="mini" type="warning">O</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  @current-change="handleCurrentChange"
  layout="prev, pager, next"
  :jumper="1"
  :total="num">
  </el-pagination>
</el-card>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  data () {
    return {
      searchText: '',
      total: '',
      jumper: '',
      tableData: [],
      page: {
        pagesize: 8,
        pagenum: 1
      },
      num: ''
    }
  },
  created () {
    this.onLoadGoods()
  },
  methods: {
    async onLoadGoods () {
      const { data } = await getGoodsList(this.page)
      this.tableData = data.goods
      this.num = data.total
    },
    // 页面改变
    handleCurrentChange (val) {
      this.page.pagenum = val
      this.onLoadGoods()
    },
    // 信息编辑
    handleEdit (item) {
      window.localStorage.setItem('goodsedit', JSON.stringify(item))
      this.$router.push('/editgoods')
    }
  }
}
</script>
<style scoped>
.searchText {
  margin-bottom: 10px;
}
.editGoods {
  display: none;
}
</style>
