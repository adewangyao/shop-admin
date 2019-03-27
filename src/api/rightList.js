import axios from '@/untils/request.js'
// 请求所有权限列表
export const getRightList = type => axios({
  method: 'get',
  url: `rights/${type}`
}).then(res => res.data)
