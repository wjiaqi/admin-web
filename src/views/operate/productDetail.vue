<template>
    <div>
<!--        标题-->
         <span class="title">{{$i18n.t('UPDATE_PRODUCT_METHOD')}}</span>
        <Collapse v-model="value1">
<!--            面板头部-->
            <Panel name="1">
                    <el-form label-width="110px">
                        <el-form-item required :label="$i18n.t('OVERDUE_DAY')" class="loanCount" :error="errors.loan_num_end">
                            <el-row :gutter="2">
                                <el-col :span="10">
                                    <el-input v-model="ruleForm.loan_num_start" ></el-input>
                                </el-col>
                                <el-col class="line" :span="1.5">-</el-col>
                                <el-col :span="10">
                                    <el-input v-model="ruleForm.loan_num_end" ></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <el-tooltip class="item" effect="dark" :content="$i18n.t('NOTE_N_EXPRESS_UNLIMITED')" placement="top">
                                        <i class="el-icon-warning"></i>
                                    </el-tooltip>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>
<!--                面板内容-->
                <p slot="content">
                    <el-form :model="ruleForm" ref="ruleForm" label-width="140px">
                        <el-form-item required :label="$i18n.t('APPLY_DEADLINE')" prop="term" class="deadline" :error="errors.term">
                            <el-row :gutter="3">
                                <el-col :span="19">
                                    <el-input v-model="ruleForm.term"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>{{$i18n.t('DAY')}}</span>
                                </el-col>
                                <el-col :span="2">
                                    <el-tooltip class="item" effect="dark" :content="$i18n.t('FILL_IN_MULTIPLE_ENGLISH_COMMA_SEPARATE')" placement="top">
                                        <i class="el-icon-warning"></i>
                                    </el-tooltip>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('MAX_AMOUNT')" :error="errors.max_amount">
                            <el-input-number v-model="ruleForm.max_amount"  style="width: 215px"></el-input-number>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('MIN_AMOUNT')" :error="errors.min_amount">
                            <el-input-number v-model="ruleForm.min_amount" style="width: 215px"></el-input-number>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('INCREASING_AMOUNT')" :error="errors.inc_amount">
                            <el-input-number v-model="ruleForm.inc_amount" style="width: 215px"></el-input-number>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('DAILY_INTEREST_RATE')" :error="errors.daily_interest">
                            <el-row :gutter="3">
                                <el-col :span="20">
                                    <el-input-number v-model="ruleForm.daily_interest" style="width: 215px"></el-input-number>
                                </el-col>
                                <el-col :span="1">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('SERVICE_FEE')" :error="errors.service_fee">
                            <el-row :gutter="3">
                                <el-col :span="20">
                                    <el-input v-model="ruleForm.service_fee" style="width: 215px"></el-input>
                                </el-col>
                                <el-col :span="1">
                                    <el-tooltip class="item" effect="dark" :content="$i18n.t('FILL_IN_INTEGER_OR_DECIMAL_INTEGER_REPRESENTS_FIXED_VALUE')" placement="top">
                                        <i class="el-icon-warning"></i>
                                    </el-tooltip>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('EXTENSION_SERVICE_FEE_RATE')" :error="errors.renew_rate">
                            <el-row :gutter="3">
                                <el-col :span="20">
                                    <el-input-number v-model="ruleForm.renew_rate" style="width: 215px"></el-input-number>
                                </el-col>
                                <el-col :span="1">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('MAXIMUM_RENEWAL_NUMBER')" :error="errors.renew_num_limit">
                            <el-input-number v-model="ruleForm.renew_num_limit" style="width: 215px"></el-input-number>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('RENEWAL_DATE')" class="loanCount" :error="errors.renew_start_day">
                            <el-row :gutter="2">
                                <el-col :span="10">
                                    <el-input v-model="ruleForm.renew_start_day" ></el-input>
                                </el-col>
                                <el-col class="line" :span="1.5">-</el-col>
                                <el-col :span="10">
                                    <el-input v-model="ruleForm.renew_end_day" ></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <el-tooltip class="item" effect="dark" :content="$i18n.t('NOTE_N_EXPRESS_UNLIMITED')" placement="top">
                                        <i class="el-icon-warning"></i>
                                    </el-tooltip>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('WHETHER_OR_NO_BEFORE_REPAYMENT')" :error="errors.early_complete">
                            <el-select v-model="ruleForm.early_complete">
                                <el-option  v-for="item in earlyComplete" :key="item.key" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item required :label="$i18n.t('ALLOW_EXTENSION_METHOD')" :error="errors.allow_renew">
                            <el-select v-model="ruleForm.allow_renew">
                                <el-option v-for="item in allowRenew" :key="item.key" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
<!--                    逾期费面板内容-->
                    <template>
                        <span class="subhead">{{$i18n.t('OVERDUE_FEE_CONFIGURE')}}</span>
                        <div class="delayContent" v-for="(item, index) in overdue" :key="index">
                            <div class="delaySubhead">
                                <div><span>{{$i18n.t('RULES')}}{{index+1}}</span></div>
                                <div class="textLink">
                                    <el-link type="primary" :underline="false" @click="addRule" v-if="index === overdue.length-1"><i class="el-icon-circle-plus" ></i>{{$i18n.t('ADD_RULE')}}</el-link>
                                        <el-popconfirm :title="$i18n.t('CONFIRM_DELETE')" @onConfirm="deleteRule(item.index)">
                                            <el-link slot="reference" type="danger" :underline="false" v-if="overdue.length-1 === 0 ? false:true"><i class="el-icon-delete"></i>{{$i18n.t('DELETE_RULE')}}</el-link>
                                        </el-popconfirm>
                                </div>
                            </div>
                            <el-card shadow="never" class="card">
                                <el-form label-width="160px">
                                    <el-form-item required :label="$i18n.t('OVERDUE_DAY')">
                                        <el-row :gutter="2">
                                            <el-col :span="10">
                                                <el-input v-model="item.start_day"></el-input>
                                            </el-col>
                                            <el-col class="line" :span="1.5">-</el-col>
                                            <el-col :span="10">
                                                <el-input v-model="item.end_day"></el-input>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item required :label="$i18n.t('OVERDUE_FEE_DAY')" :error="errors.rate">
                                        <el-row :gutter="3">
                                            <el-col :span="20">
                                                <el-input v-model="item.rate" style="width: 200px"></el-input>
                                            </el-col>
                                            <el-col :span="1">
                                                <span>%</span>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </div>
                    </template>
                </p>
            </Panel>
        </Collapse>
<!--        按钮-->
        <div class="button">
            <el-button size="medium">{{$i18n.t('CANCEL')}}</el-button>
            <el-button type="success" size="medium" @click="Update()">{{$i18n.t('CONFIRM')}}</el-button>
        </div>
    </div>
</template>

<script>
    import { getProductDetail, updateProductDetail } from '@/api/operate'

    export default {
        name: 'productDetail',
        data () {
            return {
                detail: {},
                rule: {},
                start_day: '',
                end_day: '',
                rate: '',
                value1: '1',
                product: {
                    id: this.$route.query.id
                },
                ruleForm: {},
                overdue: [
                    {
                        rate: '',
                        index: '',
                        value: ''
                    }
                ],
                earlyComplete: [
                    { label: this.$t('YES'), value: 1 },
                    { label: this.$t('NO'), value: 0 }
                ],
                allowRenew: [
                    { label: this.$t('NO_LIMIT'), value: 0 },
                    { label: this.$t('RENEWABLE_BEFORE_ALLOT'), value: 1 },
                    { label: this.$t('RENEWABLE_AFTER_ALLOT'), value: 2 },
                    { label: this.$t('BAN_EXTENSION'), value: 3 }
                ],
                errors: {
                    loan_num_end: '',
                    loan_num_start: '',
                    term: '',
                    max_amount: '',
                    min_amount: '',
                    inc_amount: '',
                    renew_start_day: '',
                    daily_interest: '',
                    service_fee: '',
                    renew_rate: '',
                    early_complete: '',
                    allow_renew: '',
                    renew_num_limit: '',
                    rate: ''
                },
                errorMessage: ''
            }
        },
        mounted () {
        },
        methods: {
            // 添加规则
            addRule () {
                this.overdue.push({
                    index: this.overdue.length,
                    value: ''
                })
            },
            // 删除规则
            deleteRule (index) {
                this.overdue.splice(index, 1)
                this.detail = Object.assign({}, this.product, this.ruleForm, this.overdue)
                updateProductDetail(this.product.id, this.detail).then(() => {
                }).catch((e) => {
                })
            },
            // 修改
            Update () {
                this.errors = {}
                this.errorMessage = ''
                this.$confirm(this.$t('REMIND_STATEMENT'), this.$t('REMIND'), {
                    confirmButtonText: this.$t('CONFIRM'),
                    cancelButtonText: this.$t('CANCEL'),
                    type: 'warning'
                }).then(() => {
                    // const { overdue } = JSON.parse(this.overdue)
                    this.detail = Object.assign({}, this.product, this.ruleForm, this.overdue)
                    updateProductDetail(this.product.id, this.detail).then((res) => {
                        this.$message({
                            type: 'success',
                            message: this.$t('UPDATE_SUCCESS')
                        })
                    }).catch((e) => {
                        // this.$Message.warning(e.message)
                        // 后端过来的表单错误回显
                        this.errors = Object.assign({}, { ...this.errors, ...e.errors })
                        // 手动处理错误
                        if (!e.errors) {
                            this.errorMessage = e.message
                        }
                        this.$message({
                            message: this.$t('UPDATE_FAIL'),
                            type: 'warning'
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('CANCEL_UPDATE')
                    })
                })
            }
        },
        created () {
            // 产品详情
            getProductDetail(this.product.id)
                .then((res) => {
                    this.ruleForm = res.result
                    this.overdue = res.result.overdue_rate
                })
                .catch((e) => {
                })
        }
    }
</script>

<style scoped>
    /deep/ .title{
        font-size: 18px;
        font-weight: bold;
        color: #404750;
    }
    /deep/ .loanCount{
        margin-top: 15px;
    }
    /deep/ .ivu-collapse-header{
        height: 80px !important;
        display: flex;
        align-items:center;
    }
    /deep/ .el-form-item{
        width:400px !important;
    }
    /deep/ .ivu-collapse{
        margin-top: 20px;
    }
    /deep/ .card{
        min-width:auto;
        padding: 10px 0;
    }
    /deep/ .subhead{
        font-size: 16px;
        color: #404750;
        margin-top: 10px;
    }
    /deep/ .delayContent{
        margin-top:20px;
        max-width:1200px;
        width:auto;
        min-width:auto;
    }
    /deep/ .delaySubhead{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    /deep/ .button{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
</style>
