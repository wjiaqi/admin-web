<template>
    <el-form label-position="right"  :model="mdl" label-width="100px" style="margin-right:50px">
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('TITLE')" :error="errors.title">
            <el-input v-model="mdl.title" :placeholder="$i18n.t('PLEASE_INPUT', { value: $i18n.t('TITLE') })" ></el-input>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)"  :label="$i18n.t('CONTENT')" :error="errors.content">
            <el-input type="textarea" v-model="mdl.content" :placeholder="$i18n.t('PLEASE_INPUT', { value: $i18n.t('CONTENT') })" ></el-input>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('SORT')" :error="errors.sort">
            <el-input-number v-model="mdl.sort"  :min="0"></el-input-number>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('STATUS')" :error="errors.status">
            <el-radio-group v-model="mdl.status">
                <el-radio :label="1">{{$i18n.t('START')}}</el-radio>
                <el-radio :label="0">{{$i18n.t('FORBIDDEN')}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button @click="handleCloseDrawer">{{$i18n.t('CANCEL')}}</el-button>
            <el-button type="success" @click="onSubmit">{{$i18n.t('CONFIRM')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { putAppHelp, postAppHelp } from '@/api/operate'

    export default {
        name: 'HelpForm',
        props: {
            mdl: {
                type: Object,
                default: () => {}
            },
            handleCloseDrawer: {
                type: Function,
                required: true
            },
            getAppHelp: {
                type: Function,
                required: true
            }
        },
        data () {
            return {
                errors: {
                    title: '',
                    content: '',
                    sort: '',
                    status: ''
                },
                errorMessage: ''
            }
        },
        methods: {
            onSubmit () {
                // 先清空表单错误提示
                this.errors = {}
                // 设置手动接管message提示
                this.$store.dispatch('MessageTake', true)
                this.errorMessage = ''
                if (this.mdl.id === 0) {
                    // 新增
                    postAppHelp(this.mdl).then((res) => {
                        console.log(res)
                        this.handleCloseDrawer()
                        this.getAppHelp()
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
                    putAppHelp(this.mdl.id, this.mdl).then((res) => {
                        console.log(res)
                        this.handleCloseDrawer()
                        this.getAppHelp()
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

</style>
