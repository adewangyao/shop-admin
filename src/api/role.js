import axios from '@/untils/request.js'

export const getRoleList = () => axios({
  method: 'GET',
  url: '/roles'
}).then(res => res.data)
