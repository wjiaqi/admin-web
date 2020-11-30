<template>
    <div>
    <el-form label-position="right" :model="mdl" label-width="130px" style="margin-right:50px; height: 750px; overflow-y: auto; overflow-x: hidden">
        <el-form-item required :label="$i18n.t('CHANNEL_ID')" :error="errors.channel_id">
            <el-input v-model="mdl.channel_id" class="input"></el-input>
        </el-form-item>
        <el-form-item required :label="$i18n.t('PRODUCT_NAME')" :error="errors.product_name">
            <el-input v-model="mdl.product_name" class="input"></el-input>
        </el-form-item>
        <el-form-item required :label="$i18n.t('OVERDUE_DAY')" class="loanCount" :error="errors.loan_num_end">
            <el-row :gutter="2">
                <el-col :span="10">
                    <el-input v-model="mdl.loan_num_start" ></el-input>
                </el-col>
                <el-col class="line" :span="1.5">-</el-col>
                <el-col :span="10">
                    <el-input v-model="mdl.loan_num_end" ></el-input>
                </el-col>
                <el-col :span="2">
                    <el-tooltip class="item" effect="dark" :content="$i18n.t('NOTE_N_EXPRESS_UNLIMITED')" placement="top">
                        <i class="el-icon-warning"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item required :label="$i18n.t('APPLY_DEADLINE')" prop="term" class="deadline" :error="errors.term">
            <el-row :gutter="3">
                <el-col :span="19">
                    <el-input v-model="mdl.term"></el-input>
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
            <el-input-number v-model="mdl.max_amount" class="input" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item required :label="$i18n.t('MIN_AMOUNT')" :error="errors.min_amount">
            <el-input-number v-model="mdl.min_amount" class="input" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item required :label="$i18n.t('INCREASING_AMOUNT')" :error="errors.inc_amount">
            <el-input-number v-model="mdl.inc_amount" class="input" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item required :label="$i18n.t('DAILY_INTEREST_RATE')" :error="errors.daily_interest">
            <el-row :gutter="3">
                <el-col :span="20">
                    <el-input-number v-model="mdl.daily_interest" class="input" controls-position="right"></el-input-number>
                </el-col>
                <el-col :span="1">
                    <span>%</span>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item required :label="$i18n.t('SERVICE_FEE')" :error="errors.service_fee">
            <el-row :gutter="3">
                <el-col :span="20">
                    <el-input v-model="mdl.service_fee" class="input"></el-input>
                </el-col>
                <el-col :span="1">
                    <el-tooltip class="item" effect="dark" :content="$i18n.t('FILL_IN_INTEGER_OR_DECIMAL_INTEGER_REPRESENTS_FIXED_VALUE')" placement="top">
                        <i class="el-icon-warning"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item required :label="$i18n.t('RENEWAL_DATE')" class="loanCount" :error="errors.renew_start_day">
            <el-row :gutter="2">
                <el-col :span="10">
                    <el-input v-model="mdl.renew_start_day" ></el-input>
                </el-col>
                <el-col class="line" :span="1.5">-</el-col>
                <el-col :span="10">
                    <el-input v-model="mdl.renew_end_day" ></el-input>
                </el-col>
                <el-col :span="2">
                    <el-tooltip class="item" effect="dark" :content="$i18n.t('NOTE_N_EXPRESS_UNLIMITED')" placement="top">
                        <i class="el-icon-warning"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item required :label="$i18n.t('EXTENSION_SERVICE_FEE_RATE')" :error="errors.renew_rate">
            <el-row :gutter="3">
                <el-col :span="20">
                    <el-input-number v-model="mdl.renew_rate" class="input" controls-position="right"></el-input-number>
                </el-col>
                <el-col :span="1">
                    <span>%</span>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item required :label="$i18n.t('MAXIMUM_RENEWAL_NUMBER')" :error="errors.renew_num_limit">
            <el-input-number v-model="mdl.renew_num_limit" class="input" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item required :label="$i18n.t('WHETHER_OR_NO_BEFORE_REPAYMENT')" :error="errors.early_complete">
            <el-select v-model="mdl.early_complete" class="input">
                <el-option  v-for="item in earlyComplete" :key="item.key" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item required :label="$i18n.t('ALLOW_EXTENSION_METHOD')" :error="errors.allow_renew">
            <el-select v-model="mdl.allow_renew" class="input">
                <el-option v-for="item in allowRenew" :key="item.key" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <H4 style="color:#606266;">{{$i18n.t('OVERDUE_FEE_CONFIGURE')}}{{$i18n.t('RULES')}}:</H4>
        </el-form-item>
        <el-form-item required :label="$i18n.t('OVERDUE_DAY')" :error="errors.overdue_rate">
            <el-row :gutter="2">
                <el-col :span="10">
                    <el-input v-model="start_day" ></el-input>
                </el-col>
                <el-col class="line" :span="1.5">-</el-col>
                <el-col :span="10">
                    <el-input v-model="end_day" ></el-input>
                </el-col>
                <el-col :span="2">
                    <el-tooltip class="item" effect="dark" :content="$i18n.t('NOTE_N_EXPRESS_UNLIMITED')" placement="top">
                        <i class="el-icon-warning"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item required :label="$i18n.t('OVERDUE_FEE_DAY')" :error="errors.renew_rate">
            <el-row :gutter="3">
                <el-col :span="20">
                    <el-input v-model="rate"></el-input>
                </el-col>
                <el-col :span="1">
                    <span>%</span>
                </el-col>
            </el-row>
        </el-form-item>
    </el-form>
        <el-form label-width="130px">
            <el-form-item>
                <el-button @click="handleCloseDrawer">{{$i18n.t('CANCEL')}}</el-button>
                <el-button type="success" @click="onSubmit">{{$i18n.t('CONFIRM')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { postAddProduct } from '@/api/operate'

    export default {
        name: 'ProductForm',
        props: {
            handleCloseDrawer: {
                type: Function,
                required: true
            }
        },
        data () {
            return {
                start_day: '',
                end_day: '',
                rate: '',
                mdl: {
                    overdue_rate: []
                },
                errors: {
                    channel_id: '',
                    product_name: '',
                    loan_num_end: '',
                    loan_num_start: '',
                    term: '',
                    max_amount: '',
                    min_amount: '',
                    inc_amount: '',
                    daily_interest: '',
                    service_fee: '',
                    renew_num_limit: '',
                    early_complete: '',
                    allow_renew: '',
                    renew_start_day: '',
                    renew_end_day: '',
                    renew_rate: ''
                },
                errorMessage: '',
                earlyComplete: [
                    { label: this.$t('YES'), value: 1 },
                    { label: this.$t('NO'), value: 0 }
                ],
                allowRenew: [
                    { label: this.$t('NO_LIMIT'), value: 0 },
                    { label: this.$t('RENEWABLE_BEFORE_ALLOT'), value: 1 },
                    { label: this.$t('RENEWABLE_AFTER_ALLOT'), value: 2 },
                    { label: this.$t('BAN_EXTENSION'), value: 3 }
                ]
            }
        },
        methods: {
            onSubmit () {
                // 先清空表单错误提示
                this.errors = {}
                // 设置手动接管message提示
                this.errorMessage = ''
                this.$store.dispatch('MessageTake', true)
                // 添加产品
                this.mdl.overdue_rate.push({ start_day: this.start_day, end_day: this.end_day, rate: this.rate })
                console.log(this.mdl)
                postAddProduct(this.mdl).then((res) => {
                    this.$Message.success(this.$t('ADD_SUCCESS'))
                    this.handleCloseDrawer()
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
                })
            }
        }
    }
</script>

<style scoped>
    .input{
        width: 315px;
    }
</style>
