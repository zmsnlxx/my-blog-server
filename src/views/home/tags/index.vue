<template>
    <section class="tags" v-loading="loading">
        <div class="content">
            <el-card :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
                <div class="card-header">
                    <ul class="ul">
                        <li class="li">标签管理</li>
                    </ul>
                </div>
                <div class="card-body">
                    <div style="padding: 20px 40px">
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="mini"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>
                        <el-tag
                                v-for="tag in tags"
                                :key="tag.id"
                                closable
                                style="margin: 10px 30px 10px 0"
                                :type="tag.type"
                                @close="handleClose(tag)">
                            {{tag.name}}
                        </el-tag>
                    </div>
                </div>
            </el-card>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import Types from "../../../../types";

    @Component

    export default class tags extends Vue {
        inputVisible: boolean = false;
        loading: boolean = true;
        inputValue: string = "";
        types: Array<string> = ["", "success", "info", "warning", "danger"];
        tags: Array<Types.TagsData> = [];


        async handleClose(tag: Types.TagsData) {
            this.loading = true;
            const {id} = tag;
            const {code, data} = await this.$api.deleteArticleTags({id});
            if (code === 1 || code === 0) {
                this.tags = data;
            } else {
                this.$message.error(data);
            }
            setTimeout(() => {
                this.loading = false;
            },1000)
        }

        async mounted(){
            this.tags = await this.getArticleTags().then((req: Types.InterfaceData) => this.$util.checkResp(req));
            setTimeout(() => {
                this.loading = false;
            },1000)
        }

        getArticleTags() {
            return this.$api.getArticleTags();
        }

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                const saveTagInput: any = this.$refs.saveTagInput;
                saveTagInput.$refs.input.focus();
            });
        }

        async handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.loading = true;
                const params = {name: inputValue, type: this.types[Math.floor(Math.random() * 5)]};
                const {code, data} = await this.$api.addArticleTags(params)
                if (code === 1 || code === 0) {
                    this.tags = data;
                } else {
                    this.$message.error(data);
                }
                setTimeout(() => {
                    this.loading = false;
                },1000)
            }
            this.inputVisible = false;
            this.inputValue = "";
        }
    }
</script>

<style lang="less" scoped>
    .tags {
        width: 100%;
        height: 100%;

        .content {
            padding-top: 80px;
            box-sizing: border-box;

            width: 80%;
            margin: 0 auto;
            height: 100%;

            .card-header {
                width: 100%;
                height: 15%;

                .ul {
                    width: 100%;
                    padding-left: 0;
                    height: 40px;
                    margin: 0;
                    border-bottom: 1px solid #999999;

                    .li {
                        color: black;
                        font-size: 18px;
                        list-style: none;
                        float: left;
                        text-align: center;
                        line-height: 40px;
                        margin-right: 20px;
                    }
                }
            }

            .card-body {
                margin-top: 20px;

                .el-tag + .el-tag {
                    margin-left: 10px;
                }

                .button-new-tag {
                    height: 24px;
                    line-height: 24px;
                    padding-top: 0;
                    padding-bottom: 0;
                    margin-right: 30px;
                }

                .input-new-tag {
                    width: 90px;
                    height: 24px;
                    vertical-align: bottom;
                    margin-right: 30px;
                    margin-bottom: 10px;
                }
            }

        }
    }
</style>
