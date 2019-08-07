<template>
    <section class="AsideNav">
        <ul class="article_content">
            <li class="article_list" @click="addArticle"><i class="el-icon-circle-plus"></i><span
                    style="display: inline-block;margin-left: 10px">新建文章</span></li>
            <li class="article_list" @click="changeArticle(index)" v-for="(item,index) in articleInfo"
                :key="index" :class="articleIndex === index ? 'choiceList' : ''">
                <el-row :gutter="20">
                    <el-col :span="18" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                            <span>{{ item.title }}</span>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="6">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <i v-show="articleIndex === index" class="el-icon-s-tools" style="padding: 25px 5px"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-upload2">置顶文章</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-lock">设为私密</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-delete-solid" @click.native="deleteArticle(item)">删除文章
                                </el-dropdown-item>
                                <el-dropdown-item icon="el-icon-s-fold">
                                    <el-dropdown>
                                        <span class="el-dropdown-link">
                                            <span>设置文章分类</span>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="(i,id) in articleClass" :key="id" :icon="i.icon"
                                                              @click.native="changeTabs(i,item)">{{ i.label }}
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import moment from "moment";
    import marked from "marked";
    import {Getter,Action} from "vuex-class";


    @Component
    export default class AsideNav extends Vue {
        @Getter articleInfo: any;           // 所有文章信息
        @Getter articleIndex: number;       // 当前选中文章索引
        @Action getArticleInfo: any;        // 存储文章信息
        @Action changeArticleIndex: any;    // 存储当前文章索引
        protected articleClass: Array<Types.ArticleClass> = [
            {label: "前端技术", icon: ""},
            {label: "生活情感", icon: ""},
            {label: "日常吐槽", icon: ""},
            {label: "语言艺术", icon: ""},
        ];

        // 设置文章类型
        protected changeTabs(i: Types.ArticleClass, item: any) {
            console.log(item);
            console.log(i);

        }

        // 删除文章
        protected async deleteArticle(article: any) {
            const {code, data} = (await this.$api.deleteArticle({_id: article._id})).data;
            this.$message({
                type: code === 0 ? "success" : "error",
                message: data.message
            });
            if (code === 0) {
                this.getArticleInfo(data.data);
                this.changeArticleIndex(0);
            }
        }

        // 添加文章
        protected addArticle(): void {
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
                title: moment().format("YYYY-MM-DD") || "",
                time: moment().format("YYYY-MM-DD") || "",
                tags: "前端技术" || "",
                content: marked(`# ${moment().format("YYYY-MM-DD")}`) || "", // 转换过后的html
                contentMD: `# ${moment().format("YYYY-MM-DD")}` || "" // markdown
            };
            this.$api.addArticle(params).then(async (req: Types.InterfaceData) => {
                this.$message({
                    type: req.data.code === 0 ? "success" : "error",
                    message: req.data.data.message
                });
                if (req.data.code === 0) {
                    this.getArticleInfo(req.data.data.data);
                }
            });

        }

        // 切换当前文章
        protected changeArticle(index: number): void {
            this.changeArticleIndex(index);
        }
    }
</script>

<style lang="less" scoped>
    .AsideNav {
        .article_content {
            padding-left: 0;
            margin-top: 0;

            .article_list {
                padding-left: 20px;
                box-sizing: border-box;
                list-style: none;
                width: 100%;
                height: 70px;
                line-height: 70px;
                border-bottom: 1px solid #eeeeee;
            }

            .choiceList {
                background-color: #999999;
            }
        }
    }
</style>
