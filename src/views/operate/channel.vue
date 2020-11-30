<template>
    <div>
<!--        渠道表格-->
        <el-table border style="width: 100%;" stripe :data="data">
            <el-table-column align="center" sortable prop="type_text" :label="this.$t('INPUT_CHANNEL')" :width="150" fixed="left"></el-table-column>
            <el-table-column align="center" prop="name" :label="$i18n.t('CHANNEL_NAME')" :min-width="200"></el-table-column>
            <el-table-column align="center" :label="this.$t('INPUT_TIME')"  :min-width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.case_start_time}}</span>-<span>{{scope.row.case_end_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="status_text" :label="$i18n.t('WHETHER_OR_NOT_INPUT')" :min-width="200"></el-table-column>
            <el-table-column align="center" prop="case_limit" :label="$i18n.t('DAILY_ORDER_QUANTITY')" :min-width="150"></el-table-column>
            <el-table-column align="center" fixed="right" :label="$i18n.t('OPERATE')" :min-width="100">
                <template slot-scope="scope">
                    <el-link v-auth="'edit'" @click="onUpdate(scope.row)" :underline="false" style="font-size:10px"><i class="el-icon-edit"></i>&nbsp;{{$i18n.t('EDIT')}}</el-link>
                </template>
            </el-table-column>
        </el-table>
<!--        对话框-->
        <!--        对话框-->
        <el-dialog
            :title="$i18n.t('UPDATE_INPUT_CONFIGURE')"
            :visible.sync="dialog"
            width="450px"
            :close-on-click-modal="false"
            destroy-on-close>
            <channel-form ref="dialog" :channel="channel" :fetch="fetch" :handle-close-drawer="handleCloseDialog"></channel-form>
        </el-dialog>
</div>
</template>

<script>
    import ChannelForm from '@/components/operate/ChannelForm'
    import { getChannel } from '@/api/operate'

    export default {
        name: 'channel',
        data () {
            return {
                channel: {},
                timeArray: [],
                id: '',
                dialog: false,
                index: '',
                data: []
            }
        },
        components: {
            ChannelForm
        },
        methods: {
            fetch () {
                // 进件管理
                getChannel().then((res) => {
                    this.data = res.result.data
                }).catch((e) => {
                    console.log(e)
                })
            },
            // 修改
            onUpdate (row) {
                this.dialog = true
                this.id = row.id
                this.channel = Object.assign({}, row)
                this.$nextTick(() => this.$refs.dialog.getTime())
            },
            handleCloseDialog () {
                this.dialog = false
            }
        },
        created () {
            this.fetch()
        }
    }
</script>

<style scoped>
.el-dialog{
    width: 550px !important;
}
    #channelName{
        width: 215px !important;
    }
</style>
