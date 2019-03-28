import axios from '@/untils/request'
export const menuRight = () => axios({
  method: 'get',
  url: 'menus'
})
