<template>
    <el-form label-position="right"  :model="mdl" label-width="100px" style="margin-right:50px">
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('USERNAME')">
            <el-input v-model="mdl.user.real_name" :placeholder="$i18n.t('PLEASE_INPUT', { value: $i18n.t('USERNAME') })" disabled></el-input>
        </el-form-item>
        <el-form-item required v-if="!(mdl.id && mdl.id > 0)"  :label="$i18n.t('TEL')">
            <el-input v-model="mdl.user.mobile" :placeholder="$i18n.t('PLEASE_INPUT', { value: $i18n.t('TEL') })" disabled></el-input>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('CONTENT')">
            <el-input type="textarea" v-model="mdl.content" :placeholder="$i18n.t('PLEASE_INPUT', { value: $i18n.t('CONTENT') })" disabled></el-input>
        </el-form-item>
        <el-form-item :required="!(mdl.id && mdl.id > 0)" :label="$i18n.t('STATUS')" :error="errors.status">
            <el-radio-group v-model="mdl.status">
                <el-radio :label="true">{{$i18n.t('HANDLED')}}</el-radio>
                <el-radio :label="false">{{$i18n.t('NO_HANDEL')}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button @click="handleCloseDrawer">{{$i18n.t('CANCEL')}}</el-button>
            <el-button type="success" @click="onSubmit">{{$i18n.t('CONFIRM')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { putAppFeedback } from '@/api/operate'

    export default {
        name: 'FeedbackForm',
        props: {
            mdl: {
                type: Object,
                default: () => {}
            },
            handleCloseDrawer: {
                type: Function,
                required: true
            },
            getAppFeedback: {
                type: Function,
                required: true
            }
        },
        data () {
            return {
                errors: {
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
                putAppFeedback(this.mdl.id, this.mdl).then((res) => {
                    console.log(res)
                    this.handleCloseDrawer()
                    this.getAppFeedback()
                    this.$message.success(this.$t('UPDATE_SUCCESS'))
                }).catch((e) => {
                    this.errors = Object.assign({}, { ...this.errors, ...e.errors }) // 后端过来的表单错误回显
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
</script>

<style scoped>
</style>
