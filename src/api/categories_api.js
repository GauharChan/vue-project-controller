import axios from './common'

export const getCategoriesList = (type) => {
  return axios({
    url: 'categories',
    params: {
      type
    }
  })
}

export const addGoods = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
