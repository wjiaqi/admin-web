<template>
    <div>
<!--        搜索框-->
        <search-form :items="formItems" :params="params" :on-submit="onSearch" :on-export="onExportData" :btn-loading="loading" />
<!--        用户表格-->
        <div class="table-body">
            <el-table border style="width: 100%;" stripe :data="data" v-loading="loading">
                <el-table-column align="center" sortable prop="id" label="UID" :width="100" fixed="left"></el-table-column>
                <el-table-column align="center" prop="nickname" :label="$i18n.t('CUSTOMER_NAME')" :min-width="200"></el-table-column>
                <el-table-column align="center" prop="mobile" :label="$i18n.t('MOBILE_NUMBER')" :min-width="200"></el-table-column>
                <el-table-column align="center" prop="reg_time" :label="$i18n.t('REGISTER_TIME')" :min-width="250"></el-table-column>
                <el-table-column align="center" prop="reg_ip" :label="$i18n.t('REGISTER_IP')" :min-width="250"></el-table-column>
                <el-table-column align="center" prop="login_time" :label="$i18n.t('LOGIN_TIME')" :min-width="250"></el-table-column>
                <el-table-column align="center" prop="login_ip" :label="$i18n.t('LOGIN_IP')" :min-width="250"></el-table-column>
                <el-table-column align="center" prop="user_login_record.device" :label="$i18n.t('LOGIN_DEVICE')" :min-width="250"></el-table-column>
                <!-- <el-table-column align="center" fixed="right" :label="$i18n.t('OPERATE')"  width="180">
                    <template slot-scope="scope">
                        <el-link v-auth="'detail'" @click="detail(scope.row)" :underline="false" style="font-size:10px"><i class="el-icon-view el-icon--right"></i>&nbsp;{{$i18n.t('VIEW')}}</el-link>
                    </template>
                </el-table-column> -->
            </el-table>
    <!--        分页-->
            <div class="table-pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next, ->, sizes"
                    :page-size.sync="page.perPage"
                    :total="page.total"
                    :page-count="page.pageCount"
                    :current-page.sync="page.currentPage"
                    :page-sizes="PAGES_SIZE"
                    @current-change="onCurrentPageChange"
                    @size-change="onPerPageChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    // import store from '@/store/index'
    import SearchForm from '@/components/SearchForm'
    import { getUser, exportUserXLS } from '@/api/user'
    import { PAGES_SIZE } from '@/config/constants'

    export default {
        name: 'list',
        data () {
            return {
                PAGES_SIZE,
                loading: false,
                params: {},
                page: {
                    total: 0,
                    currentPage: 1,
                    perPage: PAGES_SIZE[0],
                    pageCount: 1
                },
                data: []
            }
        },
        components: {
            SearchForm
        },
        computed: {
            formItems () {
                // 构建搜索表单
                return [
                    { title: 'UID', type: 'input', key: 'id', maxlength: 20 },
                    { title: this.$i18n.t('MOBILE_NUMBER'), type: 'input', key: 'mobile', maxlength: 50 },
                    { title: this.$i18n.t('REGISTER_TIME'), type: 'date-range', key: 'reg_time' },
                    { title: this.$i18n.t('LOGIN_TIME'), type: 'date-range', key: 'login_time' }
                ]
            }
        },
        methods: {
            onSearch () {
                this.page.currentPage = 1
                this.fetch()
            },
            onExportData () {
                this.loading = true
                exportUserXLS({ ...this.params }).then((res) => {
                    // eslint-disable-next-line camelcase
                    // const { full_uri } = res.result
                    window.location.href = res.result.full_uri
                }).finally(() => {
                    this.loading = false
                })
            },
            // 获取用户列表
            fetch () {
                this.loading = true
                getUser({ ...this.params, page: this.page.currentPage, perPage: this.page.perPage }).then((res) => {
                    // eslint-disable-next-line camelcase
                    const { data, last_page, total } = res.result
                    this.data = data
                    this.page.total = total
                    // eslint-disable-next-line camelcase
                    this.page.pageCount = last_page
                }).finally(() => {
                    this.loading = false
                })
            },
            // 页数切换
            onCurrentPageChange (page) {
                this.page.currentPage = page
                this.fetch()
            },
            // 每页显示数量修改
            onPerPageChange (perPage) {
                this.page.perPage = perPage
                this.fetch()
            }
            // 查询详情
            // detail (row) {
            //     this.$router.push({
            //         path: '/user/detail',
            //         query: {
            //             id: row.id
            //         }
            //     })
            // }
        },
        created () {
            // console.log(store.getters.user)
            this.fetch()
        }
    }
</script>

<style scoped>
.block{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:20px;
}
</style>
