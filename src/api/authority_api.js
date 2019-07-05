import axios from '@/api/common.js'

// 权限列表
export const authList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
