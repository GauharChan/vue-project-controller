import axios from '@/api/common.js'

// 权限列表
export const authList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 获取左边菜单栏
export const getMenu = () => {
  return axios({
    url: 'menus'
  })
}
