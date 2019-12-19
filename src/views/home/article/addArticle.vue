<template>
    <section class="addArticle" style="margin-top: 80px">
        <el-card class="card" :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
            <div slot="header" class="clearfix">
                <ul>
                    <li>{{ isAdd ? '文章新增' : '文章编辑' }}</li>
                </ul>
            </div>
            <div class="card-body">
                <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
                    <el-form-item label="封面图片" style="height: 130px;">
                        <div v-if="!form.img"
                             style="width: 120px;height: 120px;border: 1px dotted #999999;border-radius: 10px"
                             @click="updataImg">
                            <el-icon style="text-align: center;line-height: 120px;width: 100%;font-size: 30px;"
                                     class="el-icon-plus"></el-icon>
                        </div>
                        <img v-else :src="form.img" alt="" style="height:120px" @click="updataImg">
                        <input type="file" id="file" name="file" style="width:0;height: 0;" @change="handleFile">
                    </el-form-item>
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
                    </el-form-item>
                    <el-form-item label="文章分类">
                        <el-select v-model="form.categoryId" placeholder="请选择文章分类" @change="changeCategory" prop="category">
                            <el-option v-for="item in classData" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章标签">
                        <el-select v-model="form.tagId" multiple filterable @change="changeTags" placeholder="请选择标签" prop="tags">
                            <el-option
                                    v-for="item in articleTags"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章摘要" prop="abstract">
                        <el-input v-model="form.abstract" placeholder="请输入文章摘要"></el-input>
                    </el-form-item>
                    <el-form-item label="文章正文">
                        <mark-down
                                :theme="theme"
                                :default-text="form.contentMD"
                                :uploadImage="uploadImage"
                                width="100%"
                                height="100%"
                                class="markdown"
                                @html-change="htmlChange"
                                style="height: 500px;"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="isAdd" type="primary" @click="onSubmit('ruleForm')">新建</el-button>
                        <el-button v-else type="primary" @click="editArticle">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import Types from "../../../../types";
    import hljs from "highlight.js";
    import marked from "marked";
    import {Getter} from "vuex-class";

    @Component
    export default class addArticle extends Vue {
        @Getter userInfo: any;
        form: Types.ArticleData = {
            img: "",
            title: "",
            author: '',
            categoryName: '',
            categoryId: '',
            tagName: [],
            tagId: [],
            abstract: "",
            content: "",
            contentMD: '',
            id: ''
        };
        classData: Array<Types.ArticleClassData> = [];
        articleTags: Array<Types.TagsData> = [];
        rules: any = {
            title: [
                {required: true, message: "请填写文章标题", trigger: "change"}
            ],
            category: [
                {required: true, message: "请选择文章分类", trigger: "change"}
            ],
            abstract: [
                {required: true, message: "请填写文章摘要", trigger: "change"}
            ],
            tags: [
                {required: true, message: "请选择文章标签", trigger: "change"}
            ]
        };
        articleId: any;
        isAdd: boolean = true;
        theme: string = "default";


        htmlChange(html: string) {
            this.$nextTick(() => {
                const codes = document.querySelectorAll(".markdown-body pre code");
                codes.forEach(elem => {
                    hljs.highlightBlock(elem);
                });
            });
            this.form.contentMD = html;
            this.form.content = marked(html);
        }

        async mounted() {
            const {type, id} = this.$route.query;
            this.articleId = id;
            this.isAdd = type === "add";
            // 如果是新增
            if (this.isAdd) {
                const [classData, articleTags] = await Promise.all([this.getArticleClass(), this.getArticleTags()]).then(req => {
                    return this.$lo.map(req, (item: Types.InterfaceData) => this.$util.checkResp(item))
                });
                this.classData = classData;
                this.articleTags = articleTags;
            } else {
                const [classData, articleDetails, articleTags] = await Promise.all([this.getArticleClass(), this.getArticleDetails(), this.getArticleTags()]).then(req => {
                    return this.$lo.map(req, (item: Types.InterfaceData) => this.$util.checkResp(item))
                });
                this.classData = classData;
                this.articleTags = articleTags;
                this.form = articleDetails;
            }
        }

        // 编辑文章
        async editArticle(){
            console.log(this.form);
            const {code} = await this.$api.updateArticle(this.form);
            if (code === 0) {
                this.$router.push({name: "article@index"});
            }
        }
        // 获取文章标签
        getArticleTags() {
            return this.$api.getArticleTags();
        }

        changeCategory(val: any):void {
            const {name, id} = this.$lo.find(this.classData, (item: any) => item.id === val);
            this.form.categoryName = name;
            this.form.categoryId = id;
        }

        changeTags(val: Array<string>):void {
            this.form.tagId = val;
        }

        getArticleDetails(){
            return this.$api.getArticleDetails({id: this.articleId})
        }

        // 获取文章分类
        getArticleClass() {
            return this.$api.getArticleClass();
        }

        handleFile(e: any) {
            const $target = e.target;
            const file = $target.files[0];
            const type = file.type.split("/")[0];
            if (type != "image") {
                this.$message.warning("请上传图片");
                return;
            }
            const size = Math.round(file.size / 1024 / 1024);
            if (size > 3) {
                this.$message.warning("图片大小不得超过3M");
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const that = this;
            reader.onload = function() {
                that.form.img = this.result;
            };
        }

        updataImg() {
            const input: any = document.getElementById("file");
            input.click();
        }

        // 新建文章
        async onSubmit(formName: any) {
            if (this.$lo.size(this.form.categoryId) === 0) {
                this.$message.warning("请选择文章分类");
                return;
            }
            this.form.author = this.userInfo.name;
            const $refs: any = this.$refs[formName];
            $refs.validate(async (valid: any) => {
                if (valid) {
                    const {code} = await this.$api.addArticle(this.form);
                    if (code === 0) {
                        this.$router.push({name: "article@index"});
                    }
                } else {
                    return false;
                }
            });
        }

        // 取消编辑或新增，返回文章列表页
        cancel() {
            this.$router.push({name: "article@index"});
        }

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
    }
</script>

<style lang="less" scoped>
    .addArticle {
        width: 80%;
        margin: 0 auto;

        .card {
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
                }
            }

            .card-body {
            }
        }
    }

    .avatar-uploader {
        width: 178px;
        height: 178px;
        display: block;
    }


    .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        border-radius: 6px;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9
    }

    .avatar {
        width: 100%;
        height: 100%;
    }
</style>
