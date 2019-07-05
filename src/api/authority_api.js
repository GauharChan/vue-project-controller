import axios from '@/api/common.js'

export const authList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
