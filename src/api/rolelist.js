import axios from '@/untils/request.js'

export const addRole = ({ roleName, roleDesc }) => axios({
  method: 'post',
  url: '/roles',
  data: {
    roleName,
    roleDesc
  }
})
