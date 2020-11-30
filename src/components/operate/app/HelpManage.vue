<template>
    <div>
        <el-button @click="onAdd()" type="success" style="float: right; margin-bottom: 20px"><i class="el-icon-plus"></i>&nbsp;{{$i18n.t('ADD_HELP')}}</el-button>
        <div class="table-body">
            <el-table border style="width: 100%; margin-top: 20px" stripe :data="data.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)" v-loading="loading">
                <el-table-column align="center" prop="title" :label="$i18n.t('TITLE')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="content" :label="$i18n.t('CONTENT')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="sort" :label="$i18n.t('SORT')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="status_text" :label="$i18n.t('STATUS')" :min-width="150"></el-table-column>
                <el-table-column align="center" fixed="right" :label="$i18n.t('OPERATE')" :min-width="150">
                    <template slot-scope="scope">
                        <el-link @click="onEdit(scope.row)" :underline="false" style="font-size:10px"><i class="el-icon-view el-icon--right"></i>&nbsp;{{$i18n.t('EDIT')}}</el-link>
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
        <!--        抽屉-->
        <el-drawer
            :title = "$i18n.t(mdl.id > 0 ? 'EDIT' : 'ADD_HELP')"
            :visible.sync="drawer"
            size="500px"
            destroy-on-close
            center
            ref="drawer">
            <help-form :mdl="mdl" :handle-close-drawer="handleCloseDrawer" :getAppHelp="getAppHelp"></help-form>
        </el-drawer>
    </div>
</template>

<script>
    import { getAppHelp } from '@/api/operate'
    import HelpForm from '@/components/operate/HelpForm'
    import { PAGES_SIZE } from '@/config/constants'

    export default {
        name: 'HelpManage',
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
            HelpForm
        },
        methods: {
            // Banner管理
            getAppHelp () {
                this.loading = true
                getAppHelp().then((res) => {
                    this.data = res.result
                    this.page.total = res.result.length
                    this.page.pageCount = Math.ceil(res.result.length / 10)
                }).catch((e) => {
                    console.log(e)
                }).finally(() => {
                    this.loading = false
                })
            },
            // Banner编辑
            onEdit (row) {
                this.mdl = Object.assign({}, row)
                this.drawer = true
            },
            // Banner新增
            onAdd () {
                this.mdl = Object.assign({}, {
                    id: 0,
                    title: '',
                    content: '',
                    sort: 0,
                    status: 1
                })
                this.drawer = true
            },
            // 关闭抽屉
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
