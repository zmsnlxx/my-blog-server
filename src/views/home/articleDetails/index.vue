<template>
    <section class="articleDetails">
        <h1 v-if="_.size(form) === 0">获取文章信息失败</h1>
        <el-card v-else class="card" :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
            <div slot="header" class="clearfix">
                <ul>
                    <li>文章详情</li>
                </ul>
            </div>
            <div class="card-body">
                <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
                    <el-form-item label="封面图片" style="height: 130px;">
                        <img :src="form.img" @click="updataImg" alt="" style="width:120px;height:120px">
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
                        <el-button type="primary" @click="editArticle('ruleForm')">新建</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component

    export default class articleDetails extends Vue {
        form: any = {};

        async mounted() {
            const id = this.$route.query.id;
            console.log(id);
            const {code, data} = (await this.$api.getArticleDetails({id})).data;
            console.log(data);
            if (code === 0) {
                this.form = data;
            }
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

        editArticle(){
            console.log(this.form);
        }

    }
</script>

<style lang="less" scoped>
    .articleDetails {
        .card {
            width: 80%;
            margin: 80px auto;

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
</style>
