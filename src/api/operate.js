import { axios } from '@/utils/request'

// 渠道管理
export function getChannel () {
    return axios({
        url: 'client/channel',
        method: 'get'
    })
}

// 渠道管理修改
export function updateChannel (id, data) {
    return axios({
        url: `client/channel/${id}`,
        method: 'put',
        data
    })
}

// 产品管理
export function getProductList () {
    return axios({
        url: 'client/product',
        method: 'get'
    })
}

// 产品详情
export function getProductDetail (id) {
    return axios({
        url: `client/product/${id}`,
        method: 'get'
    })
}

// 产品详情修改
export function updateProductDetail (id, data) {
    return axios({
        url: `client/product/${id}`,
        method: 'put',
        data
    })
}

// 产品新增
export function postAddProduct (data) {
    return axios({
        url: 'client/product',
        method: 'post',
        data
    })
}

// 产品删除
export function deleteProduct (id) {
    return axios({
        url: `client/product/${id}`,
        method: 'delete'
    })
}

// APP管理-Banner管理
export function getAppBanner () {
    return axios({
        url: 'client/app/banner',
        method: 'get'
    })
}

// APP管理-Banner编辑
export function putAppBanner (id, data) {
    return axios({
        url: `client/app/banner/${id}`,
        method: 'put',
        data
    })
}

// APP管理-Banner新增
export function postAppBanner (data) {
    return axios({
        url: 'client/app/banner',
        method: 'post',
        data
    })
}

// APP管理-帮助管理
export function getAppHelp () {
    return axios({
        url: 'client/app/help',
        method: 'get'
    })
}

// APP管理-帮助编辑
export function putAppHelp (id, data) {
    return axios({
        url: `client/app/help/${id}`,
        method: 'put',
        data
    })
}

// APP管理-帮助新增
export function postAppHelp (data) {
    return axios({
        url: 'client/app/help',
        method: 'post',
        data
    })
}

// APP管理-反馈管理
export function getAppFeedback () {
    return axios({
        url: 'client/app/feedback',
        method: 'get'
    })
}

// APP管理-反馈编辑
export function putAppFeedback (id, data) {
    return axios({
        url: `client/app/feedback/${id}`,
        method: 'put',
        data
    })
}
