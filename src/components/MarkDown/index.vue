<template>
    <div class="vm-markdown" :style="{width: width, height:height}">
        <vm-markdown-menu
                :bgMenu="themeValue.bgMenu"
                :menuBorder="themeValue.menuBorder"
                :menuColor="themeValue.menuColor"
                :hoverColor="themeValue.hoverColor"
                :uploadImage="uploadImage"
                @textChange="updateHtmlString"
                :markdwon="markdwon"
        >
        </vm-markdown-menu>
        <div class="content">
            <div class="vm-markdown-edit" :style="{backgroundColor: themeValue.bgLeft}">
                <label>
                    <textarea class="vm-markdown-content" v-model="markdString"></textarea>
                </label>
            </div>
            <div class="markdown-body" v-html="htmlString" :style="{backgroundColor: themeValue.bgRight}"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from "vue-property-decorator";
    import VmMarkdownMenu from "./vm-markdown-menu.vue";
    import marked from "marked";
    import theme from "./config/theme";

    @Component({components: {VmMarkdownMenu}})
    export default class VmMarkdown extends Vue {
        @Prop({
            type: Function, default() {
                return () => {
                };
            }
        }) uploadImage: any;
        @Prop({default: "default"}) theme: string;
        @Prop({default: "900px"}) width: string;
        @Prop({default: "500px"}) height: string;
        @Prop({default: ""}) defaultText: string;
        markdwon: string = "";

        private markdString: string = "";
        private htmlString: string = "";

        get themeValue() {
            if (theme.hasOwnProperty(this.theme)) {
                return this.$lo.get(theme, this.theme);
            } else {
                return this.$lo.get(theme, "dark");
            }
        }

        @Watch("defaultText")
        changeDefaultText(val: any) {
            this.markdString = val;
        }

        @Watch("markdString") changeMarkdwon(value: any) {
            this.markdwon = value;
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
            this.htmlString = marked(value);
            console.log(this.htmlString);
            this.$emit("html-change", value);
        }

        updateHtmlString(data: any) {
            this.markdString = data;
        }
    }
</script>

<style lang="less">
    @import url('./assets/iconfont/iconfont.css');

    .vm-markdown {
        background-color: white;
        border-radius: 4px;
        min-width: 700px;
        min-height: 300px;
        overflow: hidden;

        .content {
            display: flex;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            height: calc(100% - 40px);
            width: 100%;
            text-align: left;
            font-size: 16px;
            border: 1px solid #eeeff1;
            border-top: none;

            .vm-markdown-edit,
            .render {
                height: 100%;
            }

            .vm-markdown-edit {
                width: 50%;
                box-sizing: border-box;
                outline: none;
                border-right: 1px solid #eeeff1;
                flex-shrink: 0;

                .vm-markdown-content {
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                    overflow: auto;
                    box-sizing: border-box;
                    resize: none;
                    outline: none;
                    border: none;
                    background-color: transparent;
                    font-size: 14px;
                    color: #232323;
                    line-height: 24px;
                }
            }

            .markdown-body {
                padding: 15px;
                overflow: auto;
                flex-grow: 1;
                word-wrap: break-word;
                img[src*="#width-full"] {
                    width: 100%;
                }
            }
        }
    }

</style>

