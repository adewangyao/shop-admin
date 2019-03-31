import axios from '@/untils/request'
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 20 } = {}) => axios({
  method: 'GET',
  url: '/goods',
  params: {
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)
// 商品分类
export const goodsCategories = (type) => axios({
  method: 'GET',
  url: '/categories',
  params: {
    type
  }
}).then(res => res.data)
