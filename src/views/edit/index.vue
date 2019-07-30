<template>
    <section class="edit">
        <el-container style="height: 100%">
            <el-aside style="border-right:1px solid #999999;" width="200px">
                <ul class="article_content">
                    <li class="article_list" @click="addArticle"><i class="el-icon-circle-plus"></i><span
                            style="display: inline-block;margin-left: 10px">新建文章</span></li>
                    <li class="article_list" @click="changeArticle(index)" v-for="(item,index) in articleTitle"
                        :key="index" :class="choiceIndex === index ? 'choiceList' : ''">
                        <span style="display: inline-block;margin-right: 20px">{{ item.title }}</span>
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <i v-show="choiceIndex === index" class="el-icon-s-tools" style="padding: 25px 5px"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-upload2">置顶文章</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-lock">设为私密</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-delete-solid">删除文章</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-s-fold">
                                    <el-dropdown>
                                        <span class="el-dropdown-link">
                                            <span>设置文章分类</span>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="(item,index) in articleClass" :key="index"
                                                              :icon="item.icon">{{ item.label }}
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </el-aside>
            <el-container style="height: 100%">
                <el-header>Header</el-header>
                <el-main style="padding: 0;height: 100%;">
                    <mark-down v-model="markdown" style="height: 100%;"/>
                </el-main>
            </el-container>
        </el-container>
        <!--        <h1 style="color: black">编辑页面</h1>-->

        <!--        <button class="print" @click="goPrint">打印markdown</button>-->

    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component
    export default class edit extends Vue {
        markdown: string = "";

        articleTitle: Array<Types.ArticleTitle> = [
            {title: "钢铁是怎样练成的"},
            {title: "钢铁是怎样练成的"},
            {title: "钢铁是怎样练成的"},
            {title: "钢铁是怎样练成的"},
        ];
        choiceIndex: number = 0;

        articleClass: Array<Types.ArticleClass> = [
            {label: "前端技术", icon: ""},
            {label: "生活情感", icon: ""},
            {label: "日常吐槽", icon: ""},
            {label: "语言艺术", icon: ""},
        ];


        addArticle() {
            console.log("添加文章");
        }

        changeArticle(index: number): void {
            this.choiceIndex = index;
        }


        // goPrint ():void {
        //     console.log(this.markdown)
        // }

    }
</script>

<style lang="less" scoped>
    .edit {
        width: 100%;
        height: 100%;

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
