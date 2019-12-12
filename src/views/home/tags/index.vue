<template>
    <section class="tags" v-loading="loading">
        <div class="content">
            <el-card :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
                <div class="card-header">
                    <ul class="ul">
                        <li class="li">标签管理</li>
                    </ul>
                </div>
                <div class="card-body">

                </div>
            </el-card>
        </div>
    </section>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component

    export default class tags extends Vue {
    }
</script>

<style lang="less" scoped>
    .tags {
        width: 100%;
        height: 100%;

        .content {
            padding-top: 80px;
            box-sizing: border-box;

            width: 80%;
            margin: 0 auto;
            height: 100%;

            .card-header {
                width: 100%;
                height: 15%;

                .ul {
                    width: 100%;
                    padding-left: 0;
                    height: 40px;
                    margin: 0;
                    border-bottom: 1px solid #999999;

                    .li {
                        color: black;
                        font-size: 18px;
                        list-style: none;
                        float: left;
                        text-align: center;
                        line-height: 40px;
                        margin-right: 20px;
                    }
                }
            }

            .card-body {
                margin-top: 20px;
            }

        }
    }
</style>
