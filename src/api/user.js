import axios from '@/untils/request.js'
export const getUserList = ({ pagenum = 1, pagesize = 1000 }) => axios({ // const { pagenum = 1, pagesize = 5 } = 你传递的那个对象
  method: 'GET',
  url: '/users',
  params: { // 传递 GET 参数
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
