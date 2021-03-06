import axios from '@/untils/request.js'
export const getUserList = ({ query, pagenum = 1, pagesize = 1000 }) => axios({ // const { pagenum = 1, pagesize = 5 } = 你传递的那个对象
  method: 'GET',
  url: '/users',
  params: { // 传递 GET 参数
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)

// 添加用户
export const addUser = ({ username, password, email, mobile }) => axios({
  method: 'POST',
  url: '/users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => res.data)
// 删除用户
export const delUser = (id) => axios({
  method: 'delete',
  url: `/users/${id}`
}).then(res => res.data)
// 根据用户id查询信息
export const getUserById = (id) => axios({
  method: 'get',
  url: `/users/${id}`
}).then(res => res.data)
// 编辑用户信息
export const editUserById = ({ id, email, mobile }) => axios({
  method: 'put',
  url: `users/${id}`,
  data: {
    email,
    mobile
  }
})
// 改变用户状态
export const changeState = (id, state) => axios({
  method: 'PUT',
  url: `/users/${id}/state/${state}`
}).then(res => res.data)
// 分配角色
export const userRole = ({ id, rid }) => axios({
  method: 'put',
  url: `users/${id}/role`,
  data: {
    rid
  }
})
