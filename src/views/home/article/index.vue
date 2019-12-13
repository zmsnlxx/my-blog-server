<template>
    <section class="article">
        <div class="content">
            <el-card class="card" :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
                <div slot="header" class="clearfix">
                    <ul>
                        <li v-for="(item,index) in classData" :class="currentIndex === index ? 'color' : ''"
                            :key="index"
                            @click="changeClassId(item.id,index)">{{ item.name }}
                        </li>
                        <el-button style="float: right" type="primary" @click="goAddArticle">新增文章
                        </el-button>
                    </ul>
                </div>
                <div class="card-body" v-if="_.size(articleInfo) !== 0" v-loading="loading" element-loading-text="拼命加载中">
                    <div v-for="(item,index) in articleInfo" :key="index" class="card-item" @click="getArticleDetails(item.id)">
                        <div class="card-content">
                            <div class="left">
                                <img :src="item.img" alt="">
                            </div>
                            <div class="right">
                                <h3 style="margin-top: 0;margin-bottom: 10px">{{ item.title }}</h3>
                                <div class="top more-overflow">{{ item.abstract }}</div>
                                <div class="bottom">
                                    <span class="class">{{ _.get(_.filter(classData,classItem => classItem.id === item.tags),'0.name')}}</span>
                                    <span v-if="item.updateTime" class="time" style="color: #37c6c0">{{ item.updateTime }}</span>
                                    <span v-else class="time" style="color: #37c6c0">{{ item.createdTime }}</span>
                                    <span class="more" style="color: red" @click.stop="deleteArticle(item)">删除</span>
                                    <span class="more" style="color: #37c6c0" @click.stop="editArticle(item.id)">编辑</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                            style="text-align: center;margin-top: 20px;font-size: 16px"
                            :hide-on-single-page="_.size(allArticle) < 5"
                            :total="_.size(allArticle)"
                            :page-size="5"
                            @current-change="handleCurrentChange"
                            layout="total, prev, pager, next">
                    </el-pagination>
                </div>
                <div v-else>
                    暂无数据
                </div>

            </el-card>

        </div>

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
    import {Vue, Component} from "vue-property-decorator";
    import Types from "../../../../types";


    @Component
    export default class articleNav extends Vue {
        classData: Array<Types.ArticleClassData> = []; // 文章分类
        loading: boolean = true;
        dialogVisible: boolean = false;
        articleInfo: any = null; // 文章数据
        currentClassId: number | string;
        currentIndex: number = 0;
        currentArticle: Types.ArticleData;
        allArticle: Array<Types.ArticleData> = [];

        private async mounted() {
            // 拿到文章分类
            this.classData = await this.getArticleClass().then((req: Types.InterfaceData) => this.$util.checkResp(req));
            this.currentClassId = this.$lo.get(this.classData, `${this.currentIndex}.id`);
            const allArticle = await this.getArticle().then((req: Types.InterfaceData) => this.$util.checkResp(req));
            this.allArticle = [...allArticle].reverse();
            this.articleInfo = this.allArticle.slice(0, 5);
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }

        handleCurrentChange(val: number) {
            this.articleInfo = this.allArticle.slice((val - 1) * 5, val * 5)
        }

        getArticleDetails(id: any){
            this.$router.push({name: 'article@details', query: {id}})
        }

        deleteArticle(params: Types.ArticleData) {
            this.dialogVisible = true;
            this.currentArticle = params;
        }

        // 编辑文章
        editArticle(id: any){
            this.$router.push({name: 'article@add', query: {id}})
        }

        // 删除文章
        delArticle() {
            this.loading = true;
            this.dialogVisible = false;
            const {id} = this.currentArticle;
            this.$api.deleteArticle({articleId: id, classId: this.classData[this.currentIndex].id}).then((req: any) => this.$util.checkResp(req)).then((req: any) => {
                setTimeout(() => {
                    this.$message.success('删除成功！');
                    this.articleInfo = req;
                    this.loading = false;
                }, 1000);
            });
        }

        handleClose() {
            this.dialogVisible = false;
        }

        goAddArticle(){
            this.$router.push({name: 'article@add', query: {type: 'add'}})
        }

        /**
         * 切换文章分类，获取对应分类下文章数据
         * @param params 文章分类id
         * @param index 当前文章分类索引
         */
        async changeClassId(params: number, index: number) {
            this.loading = true;
            this.currentClassId = params;
            this.articleInfo = await this.getArticle().then((req: Types.InterfaceData) => this.$util.checkResp(req));
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.currentIndex = index;
        }

        // 获取文章分类
        getArticleClass() {
            return this.$api.getArticleClass();
        }

        // 获取文章
        getArticle() {
            return this.$api.getArticle({id: this.currentClassId});
        }

    }
</script>

<style lang="less" scoped>
    .article {
        width: 100%;
        height: 100%;
        overflow: auto;

        .content {
            padding-top: 80px;
            box-sizing: border-box;
            width: 80%;
            margin: 0 auto;
            height: 100%;

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
    }
</style>
