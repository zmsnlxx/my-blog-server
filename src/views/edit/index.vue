<template>
    <section class="edit">
        <el-container style="height: 100%" v-loading="loading" :element-loading-text="loadingText">
            <el-aside style="border-right:1px solid #999999;" width="200px">
                <section class="AsideNav">
                    <ul class="article_content">
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item :name="index" v-for="(item,index) in articleClass" :key="index">
                                <template slot="title">
                                    <div style="margin-left: 20px;font-size: 16px">
                                        <i class="header-icon el-icon-info"></i>
                                        <span style="display: inline-block;margin-left: 10px">{{ item.label }}</span>
                                    </div>
                                </template>
                                <div style="padding: 0">
                                    <li style="padding-left:40px;box-sizing: border-box;list-style: none;width: 100%;height: 50px;line-height: 50px;border-bottom: 1px solid #eeeeee;">
                                        <el-button type="text"
                                                   style="font-size: 14px;display:inline-block;margin-right: 10px"
                                                   @click="addArticle">新建文章
                                        </el-button>
                                        <i class="el-icon-circle-plus"></i>
                                    </li>
                                    <li style="padding-left:40px;box-sizing: border-box;list-style: none;width: 100%;height: 50px;line-height: 50px;border-bottom: 1px solid #eeeeee;"
                                        @click="changeArticle(i,id)" v-show="item.content && !$lo.isEmpty(item.content)"
                                        v-for="(i,id) in item.content"
                                        :key="id"
                                        :class="articleIndex === id && activeName === checkActiveName ? 'choiceList' : ''">
                                        <el-row style="height: 100%;">
                                            <el-col class="over-flow" :span="18" style="height: 100%;">
                                                <el-tooltip class="item" effect="dark" :content="i.title"
                                                            placement="top">
                                                    <span>{{ i.title }}</span>
                                                </el-tooltip>
                                            </el-col>
                                            <el-col :span="6" style="height: 100%;">
                                                <el-dropdown trigger="click" style="float: right;margin-right: 10px">
                                        <span class="el-dropdown-link">
                                            <i v-show="articleIndex === id" class="el-icon-s-tools"></i>
                                        </span>
                                                    <el-dropdown-menu slot="dropdown">
                                                        <el-dropdown-item icon="el-icon-upload2">置顶文章</el-dropdown-item>
                                                        <el-dropdown-item icon="el-icon-lock">设为私密</el-dropdown-item>
                                                        <el-dropdown-item icon="el-icon-delete-solid"
                                                                          @click.native="deleteArticle(i)">删除文章
                                                        </el-dropdown-item>
                                                        <el-dropdown-item icon="el-icon-s-fold">
                                                            <el-dropdown>
                                        <span class="el-dropdown-link">
                                            <span>设置文章分类</span>
                                        </span>
                                                                <el-dropdown-menu slot="dropdown">
                                                                    <el-dropdown-item v-for="(i,id) in articleClass"
                                                                                      :key="id"
                                                                                      :icon="i.icon"
                                                                                      @click.native="changeTabs(i,item)">
                                                                        {{ i.label }}
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </el-col>
                                        </el-row>
                                    </li>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </ul>
                </section>
            </el-aside>
            <el-container style="height: 100%">
                <el-header>
                    <!--                    <articleHeader @changeColor="changeColor" @changeCurrentTitle="changeCurrentTitle"></articleHeader>-->
                    <section class="header" style="height: 100%">
                        <el-row style="height: 100%;">
                            <el-col :span="20" style="height: 100%;">
                                <label>
                                    <input class="textarea" :value="title" @change="changeCurrentTitle($event)"/>
                                </label>
                            </el-col>
                            <el-col :span="4" style="height: 100%;">
                                <div class="themes" @click="selectTheme" style="height: 100%;">
                                    <span data-theme="default" style="width:15px;height:15px"></span>
                                    <span data-theme="dark"></span>
                                    <span data-theme="green"></span>
                                    <span data-theme="gray"></span>
                                    <span data-theme="princess"></span>
                                </div>
                            </el-col>
                        </el-row>
                    </section>
                </el-header>
                <el-main style="padding: 0;height: 100%;">
                    <mark-down
                            :theme="theme"
                            :uploadImage="uploadImage"
                            width="100%"
                            height="100%"
                            class="markdown"
                            @html-change="htmlChange"
                            :defaultText="defaultText"
                            @goPublish="goPublish"
                    />
                </el-main>
            </el-container>
        </el-container>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Watch} from "vue-property-decorator";
    import "highlight.js/styles/github.css";
    import hljs from "highlight.js";
    import marked from "marked";
    import moment from "moment";
    import Types from '../../../types/index';
    @Component
    export default class EditNav extends Vue {
        protected theme: string = "default";
        protected loading: boolean = true;
        protected currentTitle: string;
        protected currentHtml: any;
        protected articleInfo: any = [];
        protected isPublish: boolean = false;
        activeName: number = 0;
        articleIndex: number = 0;
        protected currentArticle: any = {};
        protected defaultText: string = "";
        protected title: string = "文章标题";
        protected articleClass: any = [];
        protected checkActiveName: number = 0;

        // 监听当前文章的变化，获取当前文章的内容和标题
        @Watch("currentArticle")
        changeCurrentArticle(val: any) {
            if (val) {
                this.title = val.title || "文章标题";
                this.defaultText = val.contentMD || "## 请选择或者新建文章！";
            }
        }

        // 获取当前加载文本
        get loadingText(): string {
            return this.isPublish ? "文章发布中..." : "文章加载中...";
        }

        // 拿到所有文章数据存到vuex
        protected async mounted() {
            const {data} = (await this.getArticle()).data;
            this.articleInfo = data;
            this.getArticleClass();
            this.currentArticle = this.$lo.find(data, (item: any) => item.tags === "前端技术") || [];
            this.defaultText = this.currentArticle.contentMD || "## 请选择或者新建文章！";
            this.title = this.currentArticle.title || "文章标题";
            this.loading = false;
        }

        // 切换当前文章
        protected changeArticle(item: any, id: number): void {
            this.checkActiveName = this.activeName;
            this.currentArticle = item;
            this.articleIndex = id;
        }

        getArticleClass() {
            const classArr: Array<Types.ArticleClass> = [
                {label: "前端技术", icon: "", content: []},
                {label: "生活情感", icon: "", content: []},
                {label: "日常吐槽", icon: "", content: []},
                {label: "语言艺术", icon: "", content: []},
            ];
            if (!this.$lo.isEmpty(this.articleInfo)) {
                this.$lo.each(this.articleInfo, (item: any) => {
                    const index = this.$lo.findIndex(classArr, (i: any) => i.label === item.tags);
                    classArr[index].content.push(item);
                });
            }
            this.articleClass = classArr;
            console.log(this.articleClass);
        }

        // 请求文章数据接口
        async getArticle() {
            return await this.$api.getArticle();
        }

        selectTheme(evt: any) {
            if (evt.target.tagName.toLowerCase() === "span") {
                let theme = evt.target.dataset.theme;
                let spans = evt.target.parentNode.querySelectorAll("span");
                for (let i: number = 0; i < spans.length; i++) {
                    spans[i].style = "";
                }
                this.theme = theme;
                evt.target.style.width = "15px";
                evt.target.style.height = "15px";
            }
        }

        changeCurrentTitle(e: any) {
            this.currentTitle = e.target.value;
        }

        // 文章发布
        protected goPublish() {
            this.loading = true;
            this.isPublish = true;
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
            const params = {
                _id: this.currentArticle._id,
                title: this.currentTitle,
                updateTime: moment().format("YYYY-MM-DD"),
                content: marked(this.currentHtml),
                contentMD: this.currentHtml,
                on: true,
            };
            // console.log(this.Generate_Brief(this.currentHtml,100));
            this.$api.updateArticle(params).then((req: any) => {
                // 增加请求响应时间
                setTimeout(() => {
                    this.$message({
                        type: req.data.code === 0 ? "success" : "error",
                        message: req.data.code === 0 ? "发布成功!" : "发布失败!"
                    });
                    this.articleInfo = req.data.data;
                    this.getArticleClass();
                    this.currentArticle = this.$lo.find(req.data.data, (item: any) => item._id === this.currentArticle._id);
                    this.isPublish = false;
                    this.loading = false;
                }, 1000);
            });
        }

        // 删除文章
        protected async deleteArticle(article: any) {
            const {code, data} = (await this.$api.deleteArticle({_id: article._id})).data;
            this.$message({
                type: code === 0 ? "success" : "error",
                message: data.message
            });
            if (code === 0) {
                console.log(data);
                this.articleInfo = data.data;
                this.getArticleClass();
                this.currentArticle = this.$lo.find(data.data, (item: any) => item.tags === "前端技术") || [];
            }
        }

        // 添加文章
        protected addArticle(): void {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
            const params = {
                title: moment().format("YYYY-MM-DD") || "",
                time: moment().format("YYYY-MM-DD") || "",
                tags: this.articleClass[this.activeName].label,
                content: marked(`# ${moment().format("YYYY-MM-DD")}`) || "", // 转换过后的html
                contentMD: `# ${moment().format("YYYY-MM-DD")}` || "" // markdown
            };
            this.$api.addArticle(params).then(async (req: Types.InterfaceData) => {
                this.$message({
                    type: req.data.code === 0 ? "success" : "error",
                    message: req.data.data.message
                });
                if (req.data.code === 0) {
                    this.articleInfo = req.data.data.data;
                    this.getArticleClass();
                    this.currentArticle = this.$lo.find(req.data.data.data, (item: any) => item.tags === "前端技术") || [];
                }
            });

        }

        protected async uploadImage(file: any) {
            return await this.uploadRequest(file);
        }

        protected changeColor(color: string) {
            this.theme = color;
        }

        protected uploadRequest(file: any) {
            const result = "https://github.com/luosijie/Front-end-Blog/blob/master/img/logo_vmmarkdown_name.png?raw=true";
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    resolve(result);
                }, 1000);
            });
        }

        protected htmlChange(html: string) {
            this.$nextTick(() => {
                const codes = document.querySelectorAll(".markdown-body pre code");
                codes.forEach(elem => {
                    hljs.highlightBlock(elem);
                });
            });
            this.currentHtml = html;
        }
    }
</script>
<style lang="less">
    @import '../../assets/css/common.less';
</style>
<style lang="less" scoped>
    .edit {
        width: 100%;
        height: 100%;

        .AsideNav {
            .article_content {
                padding-left: 0;
                margin-top: 0;

                .article_list {
                    padding-left: 20px;
                    box-sizing: border-box;
                    list-style: none;
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid #eeeeee;
                }

                .choiceList {
                    background-color: #999999;
                }
            }
        }

        .textarea {
            height: 100%;
            color: #666464;
            width: 80%;
            outline: none;
            resize: none;
            background: transparent;
            border-color: transparent;
            font-size: 20px;
            overflow-y: hidden;
            overflow-x: hidden
        }

        .themes {
            float: right;
            display: flex;
            align-items: center;
            position: relative;

            span {
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: red;
                border-radius: 50%;
                margin: 0 6px;
                border: 2px solid #e0e0e0;
                position: absolute;
                cursor: pointer;
                color: white;
                bottom: 10px;

                &:nth-child(1) {
                    background-color: #35495e;
                    right: 120px;
                }

                &:nth-child(2) {
                    background-color: #232323;
                    right: 90px;
                }

                &:nth-child(3) {
                    background-color: #41b883;
                    right: 60px;
                }

                &:nth-child(4) {
                    background-color: #fafbfc;
                    right: 30px;
                }

                &:nth-child(5) {
                    background-color: #f05959;
                    right: 0;
                }
            }
        }
    }

</style>
