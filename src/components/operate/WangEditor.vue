<template>
    <div class="editor">
        <div ref="toolbar" class="toolbar"></div>
        <div ref="editor" class="text"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import Vue from 'vue'

    export default {
        name: 'WangEditor',
        data () {
            return {
                editor: '',
                info: ''
            }
        },
        props: {
            isClear: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            }
        },
        watch: {
            // 监听触发即清空文本域内容
            isClear (value) {
                if (value) {
                    this.editor.txt.clear()
                    this.info = null
                }
            },
            value: function (value) {
                if (value !== this.editor.txt.html()) {
                    this.editor.txt.html(this.value)
                }
            }
        },
        mounted () {
            this.setEditor()
            this.editor.txt.html(this.value)
        },
        methods: {
            setEditor () {
                this.editor = new E(this.$refs.toolbar, this.$refs.editor)
                this.editor.config.debug = true // 开启debug模式
                this.editor.config.showLinkImg = false // 关闭网络上传图片
                this.editor.config.uploadImgShowBase64 = false // base 64 存储图片
                this.editor.config.menus = ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'indent', 'lineHeight', 'foreColor', 'backColor', 'link', 'list', 'justify', 'quote', 'emoticon', 'image', 'table', 'code', 'splitLine', 'undo', 'redo'] // 配置菜单栏
                this.editor.config.uploadImgServer = 'http://192.168.9.253:18306/upload' // 配置服务器端地址
                this.editor.config.uploadImgHeaders = { Authorization: Vue.ls.get('token') } // 自定义 header（添加token）
                this.editor.config.uploadFileName = 'file' // 即在使用 formData.append(name, file) 添加图片文件时，自定义第一个参数。
                this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
                this.editor.config.uploadImgMaxLength = 1 // 限制一次最多上传 1 张图片
                this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
                const _this = this
                this.editor.config.uploadImgHooks = {
                    fail: (xhr, editor, result) => {
                        // 插入图片失败回调
                        console.log('fail', result)
                    },
                    success: (xhr, editor, result) => {
                        // 图片上传成功回调
                        console.log('success', xhr)
                    },
                    timeout: (xhr, editor, result) => {
                        console.log('timeout')
                    },
                    error: (xhr, editor, result) => {
                        console.log('error', xhr, result)
                    },
                    customInsert: function (insertImgFn, result) {
                        // result 即服务端返回的接口
                        console.log('customInsert', result)
                        if (result.code === 200) {
                            insertImgFn(result.result.full_uri)
                        } else {
                            _this.$message.error(result.message)
                        }
                    }
                }
                this.editor.config.onchange = (html) => {
                    this.info = html // 绑定当前的值
                    this.$emit('change', this.info) // 将内容同步到父组件
                }
                // 创建富文本编辑器
                this.editor.create()
            }
        }
    }
</script>

<style scoped>
    .toolbar {
        border: 1px solid #ccc;
    }
    .text {
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        min-height: 30%;
        height: 300px;
        overflow-y: auto;
    }
</style>
