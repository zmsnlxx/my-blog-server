<template>
    <section class="markDownModel">
        <mark-down
                :theme="theme"
                :uploadImage="uploadImage"
                width="100%"
                height="100%"
                class="markdown"
                @html-change="htmlChange"
                @goPublish="isShowMarkDown = false"
                style="height: 500px;"
        />
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import hljs from "highlight.js";
    import marked from "marked";

    // import Types from "../../../../types/index";


    @Component

    export default class markDownModel extends Vue {
        theme: string = "default";


        async uploadImage(file: any) {
            return await this.uploadRequest(file);
        }

        uploadRequest(file: any) {
            const result = "https://github.com/luosijie/Front-end-Blog/blob/master/img/logo_vmmarkdown_name.png?raw=true";
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    resolve(result);
                }, 1000);
            });
        }

        htmlChange(html: string) {
            this.$nextTick(() => {
                const codes = document.querySelectorAll(".markdown-body pre code");
                codes.forEach(elem => {
                    hljs.highlightBlock(elem);
                });
            });
            this.$emit('htmlValue',{markedHtml:marked(html)});
        }

    }
</script>

<style lang="less" scoped>
    .markDownModel{

    }

</style>
