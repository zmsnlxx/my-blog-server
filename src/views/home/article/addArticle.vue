<template>
    <section class="addArticle">
        <el-card class="card" :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
            <div slot="header" class="clearfix">
                <ul>
                    <li>文章新增</li>
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
                        <img v-else :src="form.img" alt="" style="width:120px;height:120px">
                        <input type="file" id="file" name="file" style="width:0;height: 0;" @change="handleFile">
                    </el-form-item>
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
                    </el-form-item>
                    <el-form-item label="文章分类">
                        <el-select v-model="form.tags" placeholder="请选择文章分类" prop="tags">
                            <el-option v-for="item in classData" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章摘要" prop="abstract">
                        <el-input v-model="form.abstract" placeholder="请输入文章摘要"></el-input>
                    </el-form-item>
                    <el-form-item label="文章正文">
                        <el-button @click="isShowMarkDown = true">编辑文章</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">新建</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <el-dialog
                title="文章编辑"
                :visible.sync="isShowMarkDown"
                width="60%"
                :before-close="handleClose">
            <markDownModel @htmlValue="params => form.content = params.markedHtml"></markDownModel>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowMarkDown = false">取 消</el-button>
                <el-button type="primary" @click="isShowMarkDown = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import Types from "../../../../types/index";
    import markDownModel from "./markDownModel.vue";

    @Component({components: {markDownModel}})
    export default class addArticle extends Vue {
        @Prop(Array) classData: Array<Types.ArticleClassData>;
        isShowMarkDown: boolean = false;
        form: Types.ArticleData = {
            img: "",
            title: "",
            tags: "",
            abstract: "",
            content: "",
        };
        rules: any = {
            title: [
                {required: true, message: "请填写文章标题", trigger: "change"}
            ],
            tags: [
                {required: true, message: "请选择文章分类", trigger: "change"}
            ],
            abstract: [
                {required: true, message: "请填写文章摘要", trigger: "change"}
            ],
        };

        imgLoading: boolean = false;

        goPublish() {
            console.log(this.form);
        }

        handleClose() {
            this.isShowMarkDown = false;
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

        async onSubmit(formName: any) {
            if(this.$lo.size(this.form.tags) === 0){
                this.$message.warning('请选择文章分类');
                return
            }
            const $refs: any = this.$refs[formName];
            $refs.validate(async (valid: any) => {
                if (valid) {
                    const {code} = (await this.$api.addArticle(this.form)).data;
                    if (code === 0) {
                        this.$emit("changeShow", true);
                    }
                } else {
                    return false;
                }
            });
        }

        cancel() {
            this.$emit("changeShow", true);
        }
    }
</script>

<style lang="less" scoped>
    .addArticle {
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
