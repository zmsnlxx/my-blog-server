<template>
    <section class="edit">
        <el-container style="height: 100%" v-loading="loading" :element-loading-text="loadingText">
            <el-aside style="border-right:1px solid #999999;" width="200px">
                <AsideNav/>
            </el-aside>
            <el-container style="height: 100%">
                <el-header>
                    <articleHeader @changeColor="changeColor" @changeCurrentTitle="changeCurrentTitle"></articleHeader>
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
    import {Vue, Component} from "vue-property-decorator";
    import {Action, Getter} from "vuex-class";
    import "highlight.js/styles/github.css";
    import hljs from "highlight.js";
    import articleHeader from "./articleHeader.vue";
    import AsideNav from "./AsideNav.vue";
    import marked from "marked";
    import moment from "moment";


    @Component({components: {articleHeader, AsideNav}})
    export default class EditNav extends Vue {
        @Action getArticleInfo: any;
        @Getter articleInfo: any;           // 所有文章信息
        @Getter articleIndex: number;       // 当前选中文章索引
        protected theme: string = "default";
        protected loading: boolean = false;
        protected currentTitle: string;
        protected currentHtml: any;
        protected isPublish: boolean = false;

        // 获取当前文章的内容
        get defaultText(): string {
            if (this.articleInfo[this.articleIndex]) {
                return this.articleInfo[this.articleIndex].contentMD;
            }
            return "";
        }

        get loadingText(): string {
            return this.isPublish ? "文章发布中..." : "文章加载中...";
        }

        // 拿到所有文章数据存到vuex
        protected async mounted() {
            this.loading = true;
            const {code, data} = (await this.getArticle()).data;
            if (code === 0) {
                this.getArticleInfo(data);
            }
            this.loading = false;
        }

        // 请求文章数据接口
        async getArticle() {
            return await this.$api.getArticle();
        }

        get title(): string {
            if(this.currentTitle) return this.currentTitle;
            return this.articleInfo[this.articleIndex].title;
        }

        // 从header组件接收修改过的文章title值
        changeCurrentTitle(e: string) {
            this.currentTitle = e;
        }

        // 文章发布
        protected goPublish() {
            this.isPublish = true;
            this.loading = true;
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
                _id: this.articleInfo[this.articleIndex]._id,
                title: this.title,
                updateTime: moment().format("YYYY-MM-DD"),
                content: marked(this.currentHtml),
                contentMD: this.currentHtml,

            };
            this.$api.updateArticle(params).then((req: any) => {
                setTimeout(() => {
                    this.$message({
                        type: req.data.code === 0 ? "success" : "error",
                        message: req.data.data.message
                    });
                    this.getArticleInfo(req.data.data.data);
                    this.loading = false;
                    this.isPublish = false;
                }, 1000);
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

<style lang="less" scoped>
    .edit {
        width: 100%;
        height: 100%;
    }

</style>
