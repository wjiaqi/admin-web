<template>
    <Form :model="channel" label-position="right" :label-width="130">
            <form-item :label="this.$t('INPUT_CHANNEL')">
                <el-select v-model="channel.type">
                    <el-option v-for="item in channelType" :key="item.key" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </form-item>
            <form-item :label="this.$t('CHANNEL_NAME')">
                <el-input v-model="channel.name" style="width: 215px;"></el-input>
            </form-item>
            <form-item :label="this.$t('WHETHER_OR_NOT_INPUT')">
                <el-select v-model="channel.status" >
                    <el-option v-for="item in optionStatus" :key="item.key" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </form-item>
            <form-item :label="this.$t('INPUT_TIME')">
                <el-time-picker is-range v-model="timeArray" range-separator="-"  value-format="HH:mm" format="HH:mm" style="width: 215px;"></el-time-picker>
            </form-item>
            <form-item :label="this.$t('INPUT_SINGLE_VOLUME')">
                <el-input-number v-model="channel.case_limit" :min="0" ></el-input-number>
            </form-item>
            <form-item>
                <el-button @click="handleCloseDrawer">{{$i18n.t('CANCEL')}}</el-button>
                <el-button type="success" @click="onSubmit">{{$i18n.t('CONFIRM')}}</el-button>
            </form-item>
    </Form>
</template>

<script>
    import { updateChannel } from '@/api/operate'

    export default {
        name: 'ChannelForm',
        data () {
            return {
                visible: this.show,
                channelType: [
                    { label: 'APP', value: 1 },
                    { label: this.$i18n.t('LOAN_OVERRUN'), value: 2 },
                    { label: 'H5', value: 3 }
                ],
                optionStatus: [
                    { label: this.$i18n.t('ALLOW_INPUT'), value: 1 },
                    { label: this.$i18n.t('ALLOW_OLD_CUSTOMER'), value: 2 },
                    { label: this.$i18n.t('PROHIBIT_INPUT'), value: 3 }
                ],
                timeArray: []
            }
        },
        props: {
            channel: {
                type: Object,
                default: () => {}
            },
            handleCloseDrawer: {
                type: Function,
                required: true
            },
            fetch: {
                type: Function,
                required: true
            }
        },
        methods: {
            getTime () {
                // const timeStartArr = time2Array(this.channel.case_start_time)
                // const timeEndArr = time2Array(this.channel.case_end_time)
                // this.timeArray = [
                //     moment().hour(timeStartArr[0]).minute(timeStartArr[1]).second(timeStartArr[2]),
                //     moment().hour(timeEndArr[0]).minute(timeEndArr[1]).second(timeEndArr[2])
                // ]
                // this.timeArray = [this.timeArray[0].toDate(), this.timeArray[1].toDate()]
                this.timeArray = [this.channel.case_start_time, this.channel.case_end_time]
            },
            // 进件管理修改
            onSubmit () {
                this.channel.case_start_time = this.timeArray[0]
                this.channel.case_end_time = this.timeArray[1]
                updateChannel(this.channel.id, this.channel).then(() => {
                    this.fetch()
                    this.handleCloseDrawer()
                    this.$Message.success(this.$t('UPDATE_SUCCESS'))
                }).catch((e) => {
                    console.log(e)
                    this.handleCloseDrawer()
                    this.$Message.error(this.$t('UPDATE_FAIL'))
                })
            }
        }
    }
</script>

<style scoped>
</style>
