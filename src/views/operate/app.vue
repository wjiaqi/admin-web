<template>
    <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--        banner管理-->
        <el-tab-pane :label="$i18n.t('BANNER_MANAGE')" name="first">
            <banner-manage ref="banner"></banner-manage>
        </el-tab-pane>
        <!--        帮助管理-->
        <el-tab-pane :label="$i18n.t('HELP_MANAGE')" name="second">
            <help-manage ref="help"></help-manage>
        </el-tab-pane>
        <!--        反馈管理-->
        <el-tab-pane :label="$i18n.t('FEEDBACK_MANAGE')" name="third">
            <feedback-manage ref="feedback"></feedback-manage>
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
    import BannerManage from '@/components/operate/app/BannerManage'
    import HelpManage from '@/components/operate/app/HelpManage'
    import FeedbackManage from '@/components/operate/app/FeedbackManage'

    export default {
        name: 'app',
        data () {
            return {
                activeName: 'first'
            }
        },
        components: {
            BannerManage,
            HelpManage,
            FeedbackManage
        },
        methods: {
            handleClick (tab) {
                if (tab.paneName === 'second') {
                    this.$refs.help.getAppHelp()
                } else if (tab.paneName === 'third') {
                    this.$refs.feedback.getAppFeedback()
                }
            }
        }
    }
</script>

<style scoped>

</style>
