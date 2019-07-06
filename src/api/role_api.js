import axios from '@/api/common.js'

// 获取角色列表
export const roleList = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色指定权限
export const deleteRight = (roleId, rightId) => {
  return axios({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

// 为角色授权
export const impower = (roleId, rids) => {
  return axios({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}

// 添加角色
export const addNewRole = (data) => {
  return axios({
    method: 'post',
    url: 'roles',
    data
  })
}

// 删除角色
export const deleteRole = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}
