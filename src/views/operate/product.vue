<template>
    <div>
        <el-button v-auth ="'add'"  @click="onAdd" type="success" style="float: right; margin-bottom: 20px"><i class="el-icon-plus"></i>&nbsp;{{$i18n.t('ADD_PRODUCT')}}</el-button>
        <div class="table-body">
<!--            产品表格-->
            <el-table border style="width: 100%;" stripe :data="data" v-loading="loading">
                <el-table-column align="center" sortable prop="product_code" :label="this.$t('PRODUCT_NO')" :width="180" fixed="left"></el-table-column>
                <el-table-column align="center" prop="channel.name" :label="$i18n.t('CHANNEL_NAME')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="product_name" :label="$i18n.t('PRODUCT_NAME')" :min-width="150"></el-table-column>
<!--                <el-table-column align="center" prop="status_text" :label="$i18n.t('STATUS')" :min-width="150"></el-table-column>-->
                <el-table-column align="center" prop="allow_renew_text" :label="$i18n.t('REPAYMENT_METHOD')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="created_at" :label="$i18n.t('CREATE_TIME')" :min-width="150"></el-table-column>
                <el-table-column align="center" prop="updated_at" :label="$i18n.t('UPDATE_TIME')" :min-width="150"></el-table-column>
                <el-table-column align="center" fixed="right" :label="$i18n.t('OPERATE')"  :min-width="150">
                    <template slot-scope="scope">
                        <el-link v-auth="'update'" @click="onUpdate(scope.row.id)" :underline="false" style="font-size:10px"><i class="el-icon-edit"></i>&nbsp;{{$i18n.t('EDIT')}}</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link v-auth="'delete'"  @click="onDelete(scope.row.id)" :underline="false" style="font-size:10px"><i class="el-icon-delete"></i>&nbsp;{{$i18n.t('DELETE')}}</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--        抽屉-->
        <el-drawer
            :title="this.$t('ADD_PRODUCT')"
            :visible.sync="drawer"
            size="550px"
            ref="drawer">
            <product-form :handle-close-drawer="handleCloseDrawer"></product-form>
        </el-drawer>
    </div>
</template>

<script>
    import { getProductList, deleteProduct } from '@/api/operate'
    import ProductForm from '../../components/operate/ProductForm'

    export default {
        name: 'product',
        data () {
            return {
                loading: false,
                data: [],
                drawer: false
            }
        },
        methods: {
            getProduct () {
                // 产品管理
                getProductList().then((res) => {
                    this.data = res.result.data
                }).catch((e) => {
                    console.log(e)
                })
            },
            // 删除
            onDelete (id) {
                this.$confirm(this.$t('REMIND_STATEMENT'), this.$t('REMIND'), {
                    confirmButtonText: this.$t('CONFIRM'),
                    cancelButtonText: this.$t('CANCEL'),
                    type: 'warning'
                }).then(() => {
                    deleteProduct(id).then((res) => {
                        console.log(res)
                        this.getProduct()
                        this.$message({
                            type: 'success',
                            message: this.$t('DELETE_SUCCESS')
                        })
                    })
                        .catch((e) => {
                            console.log(e)
                            this.$message({
                                type: 'warning',
                                message: this.$t('DELETE_FAIL')
                            })
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('CANCEL_DELETE')
                    })
                })
            },
            // 修改
            onUpdate (id) {
                const href = this.$router.resolve({
                    path: '/operate/detail',
                    query: {
                        id
                    }
                })
                window.open(href.href, '_blank')
            },
            // 打开抽屉
            onAdd () {
                this.drawer = true
            },
            // 关闭抽屉
            handleCloseDrawer () {
                this.$refs.drawer.closeDrawer()
            }
        },
        components: {
            ProductForm
        },
        created () {
            this.getProduct()
        }
    }
</script>

<style scoped>
</style>
