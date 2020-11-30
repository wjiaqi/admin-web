import { axios } from '@/utils/request'

// 文件上传
export function postUpload (file) {
    return axios({
        url: 'upload',
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
