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
