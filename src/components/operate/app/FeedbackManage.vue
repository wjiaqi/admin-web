<template>
    <div>
        <div class="table-body">
            <el-table border style="width: 100%; margin-top: 20px" stripe :data="data.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)" v-loading="loading">
                <el-table-column align="center" sortable prop="user_id" label="UID" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="user.real_name" :label="$i18n.t('USERNAME')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="user.mobile" :label="$i18n.t('TEL')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="created_at" :label="$i18n.t('FEEDBACK_TIME')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="content" :label="$i18n.t('CONTENT')" :min-width="250"></el-table-column>
                <el-table-column align="center" prop="updated_at" :label="$i18n.t('HANDEL_TIME')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="status_text" :label="$i18n.t('STATUS')" :min-width="150"></el-table-column>
                <el-table-column align="center" fixed="right" :label="$i18n.t('OPERATE')" :min-width="150">
                    <template slot-scope="scope">
                        <el-link @click="onEdit(scope.row)" :underline="false" style="font-size:10px"><i class="el-icon-edit"></i>&nbsp;{{$i18n.t('EDIT')}}</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next, ->, sizes"
                    :page-size.sync="page.pageSize"
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
        <!--        banner抽屉-->
        <el-drawer
            :title = "$i18n.t(mdl.id > 0 ? 'EDIT' : 'ADD_BANNER')"
            :visible.sync="drawer"
            size="500px"
            destroy-on-close
            center
            ref="drawer">
            <feedback-form :mdl="mdl" :handle-close-drawer="handleCloseDrawer" :getAppFeedback="getAppFeedback"></feedback-form>
        </el-drawer>
    </div>
</template>

<script>
    import { getAppFeedback } from '@/api/operate'
    import FeedbackForm from '@/components/operate/FeedbackForm'
    import { PAGES_SIZE } from '@/config/constants'

    export default {
        name: 'FeedbackManage',
        data () {
            return {
                PAGES_SIZE,
                page: {
                    pageSize: 10,
                    total: 0,
                    currentPage: 1,
                    perPage: PAGES_SIZE[0],
                    pageCount: 1
                },
                data: [],
                drawer: false,
                mdl: {},
                loading: false
            }
        },
        components: {
            FeedbackForm
        },
        methods: {
            // 反馈管理
            getAppFeedback () {
                this.loading = true
                getAppFeedback().then((res) => {
                    this.data = res.result
                    this.page.total = res.result.length
                    this.page.pageCount = Math.ceil(res.result.length / 10)
                }).catch((e) => {
                    console.log(e)
                }).finally(() => {
                    this.loading = false
                })
            },
            // 反馈编辑
            onEdit (row) {
                this.mdl = Object.assign({}, row)
                this.drawer = true
            },
            // 关闭对话框
            handleCloseDrawer () {
                this.drawer = false
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
        }
    }
</script>

<style scoped>

</style>
