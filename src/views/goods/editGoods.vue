<template>
  <el-card class="box-card">
      <el-steps class="step" :active="0" finish-status="success">
        <el-step  title="基本信息"></el-step>
        <el-step  title="商品参数"></el-step>
        <el-step  title="商品属性"></el-step>
        <el-step  title="商品图片"></el-step>
        <el-step  title="商品内容"></el-step>
      </el-steps>
      <el-tabs tab-position="left">
        <el-tab-pane class="step" label="基本信息">
          <!-- 表单内容 -->
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-cascader
                  expand-trigger="hover"
                  :props="{
                            value: 'cat_id',
                            label: 'cat_name'
                          }"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="是否促销">
              <el-radio-group v-model="form.resource">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :headers="uploadHeaders"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :on-error='handleAvatarError'
            :on-progress='handleUpload'
            :on-change='handleChange'
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
  </el-card>
</template>
<script>
import { goodsCategories } from '@/api/goods'
export default {
  name: 'goodsEdit',
  data() {
    return {
      uploadHeaders: {
        Authorization: window.localStorage.getItem('token')
      },
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        is_promote: ''
      },
      fileList: [],
      options: [],
      selectedOptions: []
    }
  },
  created () {
    this.onLoadGoods()
  },
  methods: {
    async onLoadGoods (item) {
      const goodsData = JSON.parse(window.localStorage.getItem('goodsedit'))
      this.form = goodsData
      if (goodsData.is_promote === true) {
        this.form.resource = '是'
      } else {
        this.form.resource = '否'
      }
      const data = await goodsCategories(3)
      this.options = data.data
      // 绑定默认分类
      // console.log(goodsData)
      this.selectedOptions.push(goodsData.cat_one_id)
      this.selectedOptions.push(goodsData.cat_two_id)
      this.selectedOptions.push(goodsData.cat_three_id)
    },
    onSubmit () {
      // console.log(this.form.resource === '是')
    },
    // 分类选择返回id值组成的数组
    handleChange (value) {
      console.log(value)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(1);
    },
    handleAvatarSuccess (res, file) {
      console.log(1)
      console.log(file)
    },
    handleAvatarError (err, file, fileList) {
      console.log(err)
      console.log(file)
      console.log(fileList)
    },
    handleUpload (event,  file,  fileList) {
      console.log(event)
      console.log(file)
      console.log(fileList)
    },
    handleChange (file, fileList) {
      console.log(this.fileList,1)
      console.log(file)
      console.log(fileList)
    }
  }
}
</script>
<style scope>
.step {
  margin-bottom: 40px;
}
</style>
