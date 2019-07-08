import axios from './common'

export const getCategoriesList = (type) => {
  return axios({
    url: 'categories',
    params: {
      type
    }
  })
}
