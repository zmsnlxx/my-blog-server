<template>
    <div class="vm-editor-menu" :style="{backgroundColor:bgMenu, color:menuColor, border:menuBorder}">
        <div class="command">
            <vm-markdown-button icon="iconfont icon-heading">
                <vm-markdown-dropdown>
                    <ul class="vm-editor-ul" :style="{color: filterColor}">
                        <li @click="insertText('# Title\n')">
                            <h1>H1</h1>
                        </li>
                        <li @click="insertText('## Title\n')">
                            <h2>H2</h2>
                        </li>
                        <li @click="insertText('### Title\n')">
                            <h3>H3</h3>
                        </li>
                        <li @click="insertText('#### Title\n')">
                            <h4>H4</h4>
                        </li>
                        <li @click="insertText('##### Title\n')">
                            <h5>H5</h5>
                        </li>
                    </ul>
                </vm-markdown-dropdown>
            </vm-markdown-button>
            <vm-markdown-button icon="iconfont icon-bold" @click.native="insertText(' **Bold** ')"/>
            <vm-markdown-button icon="iconfont icon-italic" @click.native="insertText(' *Italic* ')"/>
            <vm-markdown-button icon="iconfont icon-strikethrough" @click.native="insertText(' ~~Strikethrough~~ ')">
            </vm-markdown-button>
            <vm-markdown-button icon="iconfont icon-ol" @click.native="insertText('1. Ordered List\n')"/>
            <vm-markdown-button icon="iconfont icon-ul" @click.native="insertText('- Unordered List\n')"/>
            <vm-markdown-button icon="iconfont icon-quote" @click.native="insertText(' > Blockquote\n\n')"/>
            <vm-markdown-button icon="iconfont icon-code" @click.native="insertText('```\nCode\n```\n')"/>
            <vm-markdown-button icon="iconfont icon-image" @click.native="updataImg">
                <input type="file" accept="image/jpeg,image/jpg,image/png" class="load-img">
            </vm-markdown-button>
            <vm-markdown-button icon="iconfont icon-link"
                                @click.native="insertText('[zmsnlxx](https://github.com/zmsnlxx)')"/>
            <vm-markdown-button icon="iconfont icon-line" @click.native="insertText('***\n')"/>
        </div>
        <div class="vm-markdown-layout">
            <vm-markdown-button icon="iconfont icon-layout-default" layout="default"
                                @click.native="setLayout('default')"/>
            <vm-markdown-button icon="iconfont icon-layout-right" layout="right" @click.native="setLayout('right')"/>
            <!-- <vm-markdown-button icon="iconfont icon-layout-left" layout="left"/> -->
            <vm-markdown-button icon="iconfont icon-layout-zoom" layout="zoom" @click.native="setLayout('zoom')"/>
            <span style="margin-left: 20px" @click="goPublish">发布</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import VmMarkdownButton from "./vm-markdown-button.vue";
    import VmMarkdownDropdown from "./vm-markdown-dropdown.vue";
    import insertText from "./utils/index.js";

    @Component({components: {VmMarkdownButton, VmMarkdownDropdown}})
    export default class Name extends Vue {
        @Prop({
            type: Function, default() {
                return () => {
                };
            }
        }) uploadImage: any;
        @Prop({default: "#fafbfc"}) bgMenu: string;
        @Prop({default: "1px solid #eeeff1"}) menuBorder: string;
        @Prop({default: "#858585"}) menuColor: string;
        @Prop({default: "#232323"}) hoverColor: string;
        @Prop() markdwon: string;


        get filterColor(): string {
            if (this.bgMenu === "#fafbfc") {
                return "#232323";
            } else {
                return this.bgMenu;
            }
        }

        protected updataImg() {
            this.$prompt("请输入图片地址", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(({value}: any) => {
                const imgUrl = `![image](${value}#width-full)`;
                let content: any = document.querySelector(".vm-markdown-content");
                insertText(content, imgUrl);
            }).catch(() => {
                console.log("取消输入");
            });
        }

        // async insertImage(e: any) {
        //     console.log(e);
        //     const $target = e.target || e.srcElement;
        //     console.log($target);
        //     const file = $target.files[0];
        //     console.log(file);
        //
        //     const type = file.type.split("/")[0];
        //     console.log(type);
        //     // console.log(type);
        //     if (type != "image") {
        //         console.log("请上传图片");
        //         return;
        //     }
        //     const size = Math.round(file.size / 1024 / 1024);
        //     console.log(size);
        //     if (size > 3) {
        //         alert("图片大小不得超过3M");
        //         return;
        //     }
        //
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     // const that = this;
        //     reader.onload = (e: any) => {
        //         console.log(e.currentTarget.result);
        //         const imgUrl = `![image](${file.name})`;
        //         let content: any = document.querySelector(".vm-markdown-content");
        //         insertText(content, imgUrl);
        //     };
        //
        //     // if (!files.length) {
        //     //     console.log("sss");
        //     //     return;
        //     // }
        //     // let imgUrl = await this.uploadImage(file);
        //     // console.log(imgUrl);
        //     // imgUrl = `![image](${imgUrl})`;
        //     // this.insertText(imgUrl);
        // }

        /**
         * 文章发布
         */
        goPublish() {
            this.$emit("publish", this.markdwon);
        }

        insertText(string: string) {
            let content: any = document.querySelector(".vm-markdown-content");
            insertText(content, string);
            this.$emit("textChange", content.value);
        }

        setLayout(type: any) {
            const VmMarkdown: any = document.querySelector(".vm-markdown");
            const VmMarkdownEdit: any = document.querySelector(".vm-markdown-edit");
            switch (type) {
                case "default":
                    VmMarkdownEdit.style.width = "50%";
                    break;
                case "right":
                    VmMarkdownEdit.style.width = "100%";
                    break;
                case "left":
                    VmMarkdownEdit.style.width = "0";
                    break;
                case "zoom":
                    if (VmMarkdown.style.position === "fixed") {
                        const parent: any = this.$parent;
                        VmMarkdown.style.cssText = `
                            width: ${parent.width};
                            height: ${parent.height};
                        `;
                    } else {
                        VmMarkdown.style.cssText = `
                            position: fixed;
                            z-index: 999;
                            left: 0;
                            top: 0;
                            margin: 0;
                            width: 100%;
                            height: 100%;
                        `;
                    }
                    break;
            }
        }

        mounted() {
            let menu: any = document.querySelector(".vm-editor-menu");
            menu.addEventListener("mouseover", (evt: any) => {
                if (evt.target.tagName == "I") {
                    evt.target.style.color = this.hoverColor;
                }
            });
            menu.addEventListener("mouseout", (evt: any) => {
                if (evt.target.tagName == "I") {
                    evt.target.style.color = "";
                }
            });
        }
    }
</script>

<style lang="less" scoped>
    .vm-editor-menu {
        display: flex;
        height: 40px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        border-radius: 4px 4px 0px 0px;
        position: relative;

        .command,
        .vm-markdown-layout {
            display: flex;
        }

        .line {
            display: inline-block;
            width: 1px;
            height: 40px;
            margin: 0 10px;
            background-color: #eeeff1;
        }
    }

    ul.vm-editor-ul {
        padding: 0;
        margin: 0;

        li {
            margin: 0;
            padding: 5px 30px;
            display: flex;
            justify-content: center;

            &:hover {
                background: #f8f8f8;
            }

            h1 {
                text-align: center;
            }
        }
    }

    .load-img {
        display: inline-block;
        z-index: 999;
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
    }
</style>
