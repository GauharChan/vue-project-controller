import axios from '@/api/common.js'

export const roleList = () => {
  return axios({
    url: 'roles'
  })
}
