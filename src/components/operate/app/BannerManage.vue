<template>
    <div>
        <el-button  @click="onAdd()" type="success" style="float: right; margin-bottom: 20px"><i class="el-icon-plus"></i>&nbsp;{{$i18n.t('ADD_BANNER')}}</el-button>
        <el-table border style="width: 100%; margin-top: 20px" stripe :data="data" v-loading="loading">
            <el-table-column align="center" prop="title" :label="$i18n.t('TITLE')" :min-width="150"></el-table-column>
<!--            <el-table-column align="center" prop="content" :label="$i18n.t('CONTENT')" :min-width="150"></el-table-column>-->
            <el-table-column align="center" prop="sort" :label="$i18n.t('SORT')" :min-width="150"></el-table-column>
            <el-table-column align="center" prop="status_text" :label="$i18n.t('STATUS')" :min-width="150"></el-table-column>
            <el-table-column align="center" fixed="right" :label="$i18n.t('OPERATE')" :min-width="150">
                <template slot-scope="scope">
                    <el-link @click="onEdit(scope.row)" :underline="false" style="font-size:10px"><i class="el-icon-edit"></i>&nbsp;{{$i18n.t('EDIT')}}</el-link>
                    <el-divider direction="vertical"></el-divider>
                    <el-link @click="onViewer(scope.row.full_pic)" :underline="false" style="font-size:10px"><i class="el-icon-picture-outline"></i>&nbsp;{{$i18n.t('CHECK_IMAGE')}}</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--        大图预览-->
        <el-image-viewer v-show="showViewer" :on-close="closeViewer" :url-list="[url]"></el-image-viewer>
        <!--        banner抽屉-->
        <el-drawer
            :title = "$i18n.t(mdl.id > 0 ? 'EDIT' : 'ADD_BANNER')"
            :visible.sync="drawer"
            size="800px"
            destroy-on-close
            center
            ref="drawer">
            <banner-form :mdl="mdl" :handle-close-drawer="handleCloseDrawer" :getAppBanner="getAppBanner" style="overflow-y: visible; max-height: 400px"></banner-form>
        </el-drawer>
    </div>
</template>

<script>
    // 引入elementui大图预览组件
    import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
    import { getAppBanner } from '@/api/operate'
    import BannerForm from '@/components/operate/BannerForm'

    export default {
        name: 'BannerManage',
        data () {
            return {
                data: [],
                drawer: false,
                showViewer: false,
                url: '',
                mdl: {},
                loading: false
            }
        },
        components: {
            ElImageViewer,
            BannerForm
        },
        methods: {
            // Banner管理
            getAppBanner () {
                this.loading = true
                getAppBanner().then((res) => {
                    this.data = res.result
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
                    pic: '',
                    status: true
                })
                this.drawer = true
            },
            // 打开大图预览
            onViewer (fullPic) {
                this.showViewer = true
                this.url = fullPic
            },
            // 关闭大图预览
            closeViewer () {
                this.showViewer = false
            },
            // 关闭抽屉
            handleCloseDrawer () {
                this.drawer = false
            }
        }
    }
</script>

<style scoped>

</style>
