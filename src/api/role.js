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
// 删除q权限
export const tagDeleRight = (roleId, rightId) => axios({
  method: 'delete',
  url: `roles/${roleId}/rights/${rightId}`
})
// 删除角色
export const delRole = (id) => axios({
  method: 'delete',
  url: `roles/${id}`
})
// 编辑角色
export const editRole = ({ roleName, roleDesc }, id) => axios({
  method: 'put',
  url: `roles/${id}`,
  data: {
    roleName,
    roleDesc
  }
})
