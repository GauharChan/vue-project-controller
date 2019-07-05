// 引入封装配置好的axios
import axios from '@/api/common.js'

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

// 添加用户
export const addNewUser = (data) => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}

// 修改用户状态
export const changeState = (uId, type) => {
  return axios({
    method: 'put',
    url: `users/${uId}/state/${type}`
  })
}

// 删除用户
export const delteUserById = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}

// 分配角色
export const allotRole = (id, rid) => {
  return axios({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  })
}

// 编辑用户
export const editUser = (id, email, mobile) => {
  return axios({
    url: `users/${id}`,
    method: 'put',
    data: {
      email,
      mobile
    }
  })
}
