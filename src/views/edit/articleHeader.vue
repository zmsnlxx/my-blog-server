<template>
    <section class="header" style="height: 100%">
        <input class="textarea" :value="title" @change="changeCurrentTitle($event)"/>
        <div class="themes" @click="selectTheme" style="height: 100%;">
            <span data-theme="default" style="width:15px;height:15px"></span>
            <span data-theme="dark"></span>
            <span data-theme="green"></span>
            <span data-theme="gray"></span>
            <span data-theme="princess"></span>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {Getter} from "vuex-class";

    @Component
    export default class articleHeader extends Vue {
        @Getter articleInfo: any;           // 所有文章信息
        @Getter articleIndex: number;       // 当前选中文章索引

        get title(): string {
            if(this.articleInfo[this.articleIndex]) return this.articleInfo[this.articleIndex].title;
            return '文章标题'
        }

        changeCurrentTitle(e: any) {
            const title = e.target.value;
            this.$emit("changeCurrentTitle", title);
        }

        selectTheme(evt: any) {
            if (evt.target.tagName.toLowerCase() === "span") {
                let theme = evt.target.dataset.theme;
                let spans = evt.target.parentNode.querySelectorAll("span");
                for (let i: number = 0; i < spans.length; i++) {
                    spans[i].style = "";
                }
                this.$emit("changeColor", theme);
                evt.target.style.width = "15px";
                evt.target.style.height = "15px";
            }
        }
    }
</script>

<style lang="less" scoped>
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
</style>
