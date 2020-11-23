import { axios } from '@/utils/request'

// 用户信息管理
export function getUser (params) {
    return axios({
        url: 'client/user',
        method: 'get',
        params
    })
}

// 导出用户信息数据
export function exportUserXLS (params) {
    return axios({
        url: 'client/user/exportXLS',
        method: 'get',
        params
    })
}
