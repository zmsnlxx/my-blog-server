<template>
    <section class="showArticle" v-loading="loading">
        <el-card class="card" :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
            <div slot="header" class="clearfix">
                <ul>
                    <li v-for="(item,index) in classData" :class="currentIndex === index ? 'color' : ''" :key="index"
                        @click="changeClassId(item.id,index)">{{ item.name }}
                    </li>
                    <el-button style="float: right" type="primary" @click="$emit('changeIsShow',false)">新增文章</el-button>
                </ul>
            </div>
            <div class="card-body" v-if="_.size(articleInfo) !== 0">
                <div v-for="(item,index) in articleInfo" :key="index" class="card-item">
                    <div class="card-content">
                        <div class="left">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="right">
                            <h1>{{ item.title }}</h1>
                            <div class="top more-overflow">{{ item.abstract }}</div>
                            <div class="bottom">
                                <span class="class">{{ _.get(_.filter(classData,classItem => classItem.id === item.tags),'0.name')}}</span>
                                <span class="time" style="color: #37c6c0">{{ item.createdTime }}</span>
                                <span class="more" style="color: red" @click="deleteArticle(item)">删除</span>
                                <span class="more" style="color: #37c6c0" @click="editArticle(item)">编辑</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                暂无数据
            </div>
        </el-card>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确定要删除本篇文章吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delArticle">确 定</el-button>
              </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import Types from "../../../../types/index";

    @Component
    export default class showArticle extends Vue {
        @Prop(Array) classData: Array<Types.ArticleClassData>;
        @Prop({default: [], type: Array}) articleInfo: Array<Types.ArticleData>;
        currentIndex: number = 0;
        dialogVisible: boolean = false;
        currentArticle: Types.ArticleData;
        loading: boolean = false;


        changeClassId(params: number, index: number) {
            this.$emit("changeClassId", params);
            this.currentIndex = index;
        }

        deleteArticle(params: Types.ArticleData) {
            this.dialogVisible = true;
            this.currentArticle = params;
        }

        editArticle(params: Types.ArticleData) {
            const {id} = params;
            this.$router.push({path: '/home/articleDetails',query:{id}});
        }

        delArticle() {
            this.loading = true;
            this.dialogVisible = false;
            const {id} = this.currentArticle;
            this.$api.deleteArticle({articleId: id, classId: this.classData[this.currentIndex].id}).then((req: any) => {
                console.log(req);
                this.$emit("changeArticleData", req.data.data.data);
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            });
        }

        handleClose() {
            this.dialogVisible = false;
        }
    }
</script>

<style lang="less" scoped>
    .showArticle {
        .card {
            margin-bottom: 20px;

            .clearfix {
                ul {
                    width: 100%;
                    padding-left: 0;
                    height: 40px;
                    margin: 0;

                    li {
                        color: black;
                        font-size: 18px;
                        list-style: none;
                        float: left;
                        text-align: left;
                        line-height: 40px;
                        margin-right: 20px;
                        font-weight: 600;
                    }

                    .color {
                        color: #37c6c0;
                    }

                    li:hover {
                        color: #37c6c0;
                    }

                    li::after {
                        content: '/';
                        margin-left: 30px;
                        color: #999999;
                    }
                }
            }

            .card-body {
                .card-item {
                    width: 100%;
                    height: 180px;
                    padding: 10px;
                    box-sizing: border-box;

                    .card-content {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        border-radius: 10px;
                        box-shadow: 0 0 5px #999999;
                        padding: 20px;
                        box-sizing: border-box;

                        .left {
                            width: 20%;
                            height: 100%;
                            /*margin-right: 20px;*/
                            border-radius: 10px;

                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 10px;
                                background-size: 100% 100%;
                            }
                        }

                        .right {
                            width: 78%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            h1 {
                                margin: 0;
                            }

                            .top {
                                font-size: 16px;
                                color: #999999;
                                text-indent: 30px;
                            }

                            .bottom {
                                .class {
                                    display: inline-block;
                                    margin-right: 20px;
                                    color: #37c6c0;
                                }

                                .more {
                                    float: right;
                                    margin-right: 20px;
                                }
                            }
                        }
                    }


                }
            }
        }
    }
</style>
