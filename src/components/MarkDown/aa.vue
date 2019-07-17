<template>
    <section class="markdown">
        <div class="md-title">
            <ul class="cf">
                <li>
                    <span>插入图片</span>
                    <input type="file" class="uploadFile" @change="insertImg">
                </li>
                <li @click="maskBol=true">
                    <span>插入链接</span>
                </li>
                <li @click="insertCode">
                    <span>代码块</span>
                </li>
                <li @click="setCursorPosition($refs.text, '***')">
                    <span>分割线</span>
                </li>
                <li @click="setCursorPosition($refs.text, '****', 2)">
                    <span>粗体</span>
                </li>
                <li @click="setCursorPosition($refs.text, '**', 1)">
                    <span>斜体</span>
                </li>
                <li @click="setCursorPosition($refs.text, '> ', 2)">
                    <span>引用</span>
                </li>
            </ul>
        </div>
        <textarea v-model="val" @input="handleModelInput" ref="text" @keydown.tab="tabMarkdown"></textarea>
        <div class="render fmt" v-html="renderHtml"></div>

        <div class="mask" v-show="maskBol">
            <div class="link-text">
                <input type="text" v-model="link">
                <button @click="insertLink">确定</button>
            </div>
        </div>
    </section>

</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import highlightJs from "highlight.js";
    import marked from "marked";

    @Component

    export default class Name extends Vue {
        link: string = "";
        maskBol: boolean = false;
        textarea: any;
        val:any = '';


        mounted(): void {
            this.textarea = this.$refs.text;
        };

        get renderHtml() {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true, //允许 Git Hub标准的markdown.
                tables: true, //允许支持表格语法。该选项要求 gfm 为true。
                breaks: true, //允许回车换行。该选项要求 gfm 为true。
                pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
                sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
                smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
                smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
                highlight: (code: any) => {
                    return highlightJs.highlightAuto(code).value;
                }
            });
            return marked(this.val);
        }

        tabMarkdown(e: any) { // tab键
            e.preventDefault();
            let indent = "    ";
            let start: any = this.textarea.selectionStart;
            let end: any = this.textarea.selectionEnd;
            let selected: any = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g, "\n" + indent);
            this.textarea.value = this.textarea.value.substring(0, start) + selected
                + this.textarea.value.substring(end);
            // this.textarea.setSelectionRange(start + indent.length, start
            //     + selected.length);
        };

        handleModelInput(): void {
            this.$emit("input", this.val);
        };

        async insertImg(e: any) { // 插入图片
            let formData = new FormData(),
                img = "";
            formData.append("img", e.target.files[0]);
            try {
                let data = await this.axios({
                    method: "post",
                    url: "http://localhost:3000/markdown_upload_img",
                    data: formData
                });
                img = data.data.img;
            } catch (e) {
                console.log(e);
            }

            let val = `![图片描述](${img})`;
            this.setCursorPosition(this.$refs.text, val, 6);
        };

        insertLink() { //插入链接
            this.maskBol = false;
            let val = `[链接描述](${this.link})`;
            this.setCursorPosition(this.$refs.text, val, 5);
        };

        insertCode() {
            let val = `
\`\`\`

\`\`\``;
            this.setCursorPosition(this.$refs.text, val, val.length - 8);
        };

        setCursorPosition(dom, val, posLen) { // 设置光标位置
            let cursorPosition = 0;
            if (dom.selectionStart) {
                cursorPosition = dom.selectionStart;
            }
            this.insertAtCursor(dom, val);
            dom.focus();
            dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length));
            this.val = dom.value;
        };

        insertAtCursor(dom, val) { // 光标所在位置插入字符
            if (document.selection) {
                dom.focus();
                sel = document.selection.createRange();
                sel.text = val;
                sel.select();
            } else if (dom.selectionStart || dom.selectionStart == "0") {
                let startPos = dom.selectionStart;
                let endPos = dom.selectionEnd;
                let restoreTop = dom.scrollTop;
                dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);
                if (restoreTop > 0) {
                    dom.scrollTop = restoreTop;
                }
                dom.focus();
                dom.selectionStart = startPos + val.length;
                dom.selectionEnd = startPos + val.length;
            } else {
                dom.value += val;
                dom.focus();
            }
        }

    }
</script>

<style lang="less" scoped>

</style>
