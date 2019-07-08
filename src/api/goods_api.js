import axios from './common'

export const getGoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}
