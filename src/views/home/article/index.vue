<template>
    <section class="article" v-loading="loading" element-loading-text="拼命加载中">
        <div class="content">
            <showArticle v-if="isShow" :classData="classData" :articleInfo="articleInfo" @changeClassId="changeClassId"
                         @changeIsShow="changeIsShow" @changeArticleData="changeArticleData"></showArticle>
            <addArticle :classData="classData" v-else @changeShow="changeShow"></addArticle>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Watch} from "vue-property-decorator";
    import Types from "../../../../types/index";
    import showArticle from "./showArticle.vue";
    import addArticle from "./addArticle.vue";


    @Component({components: {showArticle, addArticle}})
    export default class articleNav extends Vue {
        classData: Array<Types.ArticleClassData> = [];
        loading: boolean = true;
        isShow: boolean = true;
        articleInfo: any = null;
        currentClassId: number | string = 15714031259398356;


        @Watch("isShow")
        async watchIsShow(val: boolean) {
            if (val) {
                this.loading = true;
                this.articleInfo = (await this.getArticle()).data.data;
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            }
        }

        changeArticleData(data:Types.ArticleData){
            this.articleInfo = data;
        }

        async mounted() {
            const [articleClass, articleInfo] = await Promise.all([this.getArticleClass(), this.getArticle()]);
            this.classData = articleClass.data.data;
            this.articleInfo = articleInfo.data.data;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }

        async changeClassId(id: number) {
            this.loading = true;
            this.currentClassId = id;
            this.articleInfo = (await this.getArticle()).data.data;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }

        getArticleClass() {
            return this.$api.getArticleClass();
        }

        getArticle() {
            return this.$api.getArticle({id: this.currentClassId});
        }

        changeShow(e: boolean): void {
            this.isShow = e;
        }


        changeIsShow(e: boolean): void {
            this.isShow = e;
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


        }
    }
</style>
