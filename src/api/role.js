import axios from '@/untils/request.js'

export const getRoleList = () => axios({
  method: 'GET',
  url: '/roles'
}).then(res => res.data)

//  角色授权
export const giveRoleRight = (roleId, rids) => axios({
  method: 'post',
  url: `roles/${roleId}/rights`,
  data: {
    rids
  }
})
