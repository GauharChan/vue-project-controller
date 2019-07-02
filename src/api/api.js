import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let userLogin = localStorage.getItem('userLogin')
  config.headers.Authorization = userLogin
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 登录接口请求
export const login = (data) => {
  return axios({
    method: 'post',
    data,
    url: 'login'
  })
}

// 获取用户列表数据
export const userList = (params) => {
  return axios({
    url: 'users',
    params
  })
}
