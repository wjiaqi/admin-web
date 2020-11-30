<template>
    <el-form label-position="right"  :model="mdl" label-width="120px" style="margin-right:50px;">
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('TITLE')" :error="errors.title">
            <el-input v-model="mdl.title" :placeholder="$i18n.t('PLEASE_INPUT', { value: $i18n.t('TITLE') })"></el-input>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)"  :label="$i18n.t('CONTENT')" :error="errors.content">
            <wang-editor v-model="mdl.content" :isClear="isClear" @change="change"></wang-editor>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('SORT')" :error="errors.sort">
            <el-input-number v-model="mdl.sort"  :min="0"></el-input-number>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('IS_START')" :error="errors.status">
            <el-radio-group v-model="mdl.status">
                <el-radio :label="true">{{$i18n.t('START')}}</el-radio>
                <el-radio :label="false">{{$i18n.t('FORBIDDEN')}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('PICTURE')" :error="errors.pic"  style="display: block">
<!--            <el-input v-model="mdl.pic" :placeholder="$i18n.t('PLEASE_SELECT', { value: $i18n.t('PICTURE') })"></el-input>-->
<!--            <el-button @click="getFile" style="margin-top: 10px"><i class="el-icon-upload"></i>&nbsp;{{$i18n.t('CLICK_UPLOAD')}}</el-button>-->
<!--            <div class="suggest-style">{{$i18n.t('SUGGEST_IMAGE_SIZE')}}</div>-->
<!--            <input type="file" id="fileId" ref="file" style="display: none;" v-on:change="handleFileUpload($event)">-->
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :http-request="onUpload"
                :show-file-list="false">
                <img v-if="showImageUrl" :src="imageUrl" class="avatar" width="100%"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button @click="handleCloseDrawer">{{$i18n.t('CANCEL')}}</el-button>
            <el-button type="success" @click="onSubmit">{{$i18n.t('CONFIRM')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { putAppBanner, postAppBanner } from '@/api/operate'
    import { postUpload } from '@/api/upload'
    import WangEditor from './WangEditor'

    export default {
        name: 'BannerForm',
        props: {
            mdl: {
                type: Object,
                default: () => {}
            },
            handleCloseDrawer: {
                type: Function,
                required: true
            },
            getAppBanner: {
                type: Function,
                required: true
            }
        },
        data () {
            return {
                isClear: false,
                showImageUrl: false,
                imageUrl: '',
                errors: {
                    title: '',
                    content: '',
                    sort: '',
                    pic: '',
                    status: ''
                },
                errorMessage: ''
            }
        },
        components: {
            WangEditor
        },
        methods: {
            // 富文本内容上传
            change (value) {
                this.mdl.content = value
            },
            // elementui的上传文件
            // 上传文件
            onUpload (file) {
                const formData = new FormData()
                formData.append('file', file.file)
                postUpload(formData).then((res) => {
                    this.mdl.pic = res.result.uri
                    this.showImageUrl = true
                    this.imageUrl = res.result.full_uri
                    this.$message.success(this.$t('UPLOAD_SUCCESS'))
                }).catch((e) => {
                    this.$message.error(e.message)
                })
            },
            // 打开文件
            // getFile () {
            //     this.$refs.file.click()
            // },
            // 获取文件
            handleFileUpload (event) {
                // 阻止发生默认行为
                event.preventDefault()
                const formData = new FormData()
                const file = this.$refs.file.files[0]
                formData.append('file', file)
                // console.log(formData.get('file'))
                this.onUpload(formData)
            },
            // 上传文件
            // onUpload (formData) {
            //     postUpload(formData).then((res) => {
            //         this.mdl.pic = res.result.uri
            //         this.$message.success(this.$t('UPLOAD_SUCCESS'))
            //     }).catch((e) => {
            //         this.$message.error(e.message)
            //     })
            // },
            onSubmit () {
                // 先清空表单错误提示
                this.errors = {}
                // 设置手动接管message提示
                this.$store.dispatch('MessageTake', true)
                this.errorMessage = ''
                if (this.mdl.id === 0) {
                    // 新增
                    postAppBanner(this.mdl).then((res) => {
                        console.log(res)
                        this.handleCloseDrawer()
                        this.getAppBanner()
                        this.$message.success(this.$t('ADD_SUCCESS'))
                    }).catch((e) => {
                        // 后端过来的表单错误回显
                        this.errors = Object.assign({}, { ...this.errors, ...e.errors })
                        // 手动处理错误
                        if (!e.errors) {
                            this.errorMessage = e.message
                            this.$message.error(this.errorMessage)
                        } else {
                            this.$message.error(this.$t('ADD_FAIL'))
                        }
                    }).finally(() => {
                        this.submitLogin = false
                    })
                } else {
                    // 修改
                    putAppBanner(this.mdl.id, this.mdl).then((res) => {
                        console.log(res)
                        this.handleCloseDrawer()
                        this.getAppBanner()
                        this.$message.success(this.$t('UPDATE_SUCCESS'))
                    }).catch((e) => {
                        // 后端过来的表单错误回显
                        this.errors = Object.assign({}, { ...this.errors, ...e.errors })
                        // 手动处理错误
                        if (!e.errors) {
                            this.errorMessage = e.message
                            this.$message.error(this.errorMessage)
                        } else {
                            this.$message.error(this.$t('UPDATE_FAIL'))
                        }
                    }).finally(() => {
                        this.submitLogin = false
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .suggest-style{
        font-size: 12px;
        color: #E6A23C;
    }
    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
</style>
