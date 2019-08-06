<template>
    <section class="edit">
        <el-container style="height: 100%" v-loading="loading" element-loading-text="文章发布中...">
            <el-aside style="border-right:1px solid #999999;" width="200px">
                <AsideNav @changeTitle="changeTitle" :isUpdate="isUpdate"/>
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
    import {Getter, Action} from "vuex-class";
    import "highlight.js/styles/github.css";
    import hljs from "highlight.js";
    import articleHeader from "./articleHeader.vue";
    import AsideNav from "./AsideNav.vue";
    import marked from "marked";
    import jsCookie from "js-cookie";
    import moment from "moment";


    @Component({components: {articleHeader, AsideNav}})
    export default class EditNav extends Vue {
        @Getter user: any;
        @Action setUserInfo: any;
        protected theme: string = "default";
        protected loading: boolean = false;
        protected defaultText: string = "";
        protected currentArticle: any;
        protected currentTitle: string;
        protected currentHtml: any;
        protected isUpdate: boolean = false;


        protected async mounted() {
            this.loading = true;
            if (jsCookie.get("email")) {
                const oldCookie: string = jsCookie.get("email") || "";
                const cookie: string = this.$util.DecodeCookie(oldCookie);
                const {code, data} = (await this.$api.getUserInfo({cookie})).data;
                if (code === 0) {
                    this.setUserInfo(data);
                }
            }
            this.loading = false;
        }

        changeCurrentTitle(e: string) {
            this.currentTitle = e
        }

        protected goPublish() {
            this.isUpdate = false;
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
                _id: this.currentArticle._id,
                title: this.currentTitle,
                updateTime: moment().format("YYYY-MM-DD"),
                content: marked(this.currentHtml),
                contentMD: this.currentHtml,
            };
            console.log(params);
            this.$api.updateArticle(params).then((req: any) => {
                console.log(req.data.data);
                this.$message({
                    type: req.data.code === 0 ? "success" : "error",
                    message: req.data.data.message
                });
                this.isUpdate = true;
                this.loading = false;
            })
        }

        protected async uploadImage(file: any) {
            return await this.uploadRequest(file);
        }

        protected changeTitle(data: any) {
            this.currentArticle = data;
            this.defaultText = data.contentMD;
        }

        protected changeColor(color: string) {
            console.log(color);
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
            // console.log("html-content", html);
            this.$nextTick(() => {
                const codes = document.querySelectorAll(".markdown-body pre code");
                codes.forEach(elem => {
                    hljs.highlightBlock(elem);
                });
            });
            this.currentHtml = html
        }

    }
</script>

<style lang="less" scoped>
    .edit {
        width: 100%;
        height: 100%;
    }

</style>
