<template>
    <section class="addClass" v-loading="loading">
        <div class="content">
            <el-card :body-style="{padding:'15px',height:'100%',boxSizing: 'border-box'}">
                <div class="card-header">
                    <ul class="ul">
                        <li class="li border">分类管理</li>
                    </ul>
                </div>
                <div class="card-body">
                    <el-button style="float: right;margin-bottom: 10px" type="primary" @click="addDialogVisible = true">
                        新增分类
                    </el-button>
                    <el-table
                            empty-text="暂无数据"
                            :data="body"
                            style="width: 100%"
                            border
                            :row-class-name="({rowIndex}) => rowIndex % 2 === 0 ? 'warning-row' : 'success-row'">
                        <el-table-column
                                align="center"
                                v-for="(item,index) in header"
                                :key="index"
                                :prop="item.prop"
                                :label="item.label"
                        >
                            <el-table-column
                                    align="center"
                                    v-if="!!item.children"
                                    v-for="(i,id) in item.children"
                                    :key="id"
                                    :prop="i.prop"
                                    :label="i.label"
                                    type="i"
                            >
                                <template slot-scope="scope">
                                    <el-button v-if="i.prop === 'delete'" type="danger" @click="deleteClass(scope)">删除
                                    </el-button>
                                    <el-button v-if="i.prop === 'edit'" type="primary" @click="openEditClass(scope)">修改
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

            <!--     新增弹框       -->
            <el-dialog
                    title="新增分类"
                    :visible.sync="addDialogVisible"
                    width="30%"
            >
                <el-row>
                    <el-col :span="6" style="text-align: right">
                        分类名：
                    </el-col>
                    <el-col :span="18">
                        <el-input type="text" v-model="className"/>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                    <el-col :span="6" style="text-align: right">
                        描述：
                    </el-col>
                    <el-col :span="18">
                        <el-input type="text" v-model="desc"/>
                    </el-col>
                </el-row>
                <el-row></el-row>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addClass">确 定</el-button>
            </span>
            </el-dialog>
            <!--     修改弹框       -->
            <el-dialog
                    title="修改分类"
                    :visible.sync="editDialogVisible"
                    width="30%"
            >
                <el-row>
                    <el-col :span="6" style="text-align: right">
                        分类名：
                    </el-col>
                    <el-col :span="18">
                        <el-input type="text" v-model="editClassName"/>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                    <el-col :span="6" style="text-align: right">
                        描述：
                    </el-col>
                    <el-col :span="18">
                        <el-input type="text" v-model="editDesc"/>
                    </el-col>
                </el-row>
                <el-row></el-row>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editClass">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import Types from "../../../../types/index";


    @Component({})
    export default class addClass extends Vue {
        protected tableKey: number = 0;
        protected addDialogVisible: boolean = false;
        protected editDialogVisible: boolean = false;
        className: string = "";
        editClassName: string = "";
        editDesc: string = "";
        desc: string = "";
        loading: boolean = true;
        classData: Array<Types.ArticleClassData> = [];
        currentEditId: number;


        get header() {
            this.tableKey += 1;
            return [
                {label: "序号", prop: "num", fixed: true, minWidth: 70, show: true},
                {label: "分类名称", prop: "name", fixed: true, minWidth: 70, show: true},
                {label: "Id", prop: "id", fixed: true, minWidth: 90, show: true},
                {label: "描述", prop: "desc", fixed: true, minWidth: 90, show: true},
                {
                    label: "相关操作", children: [
                        {label: "编辑", prop: "edit"},
                        {label: "删除", prop: "delete"},

                    ]
                }
            ];
        }

        get body() {
            if (this.$lo.isEmpty(this.classData)) {
                return;
            }
            return this.$lo.map(this.classData, (item: Types.ArticleClassData, index: number) => {
                const data = {id: item.id, value: ""};
                const result = {delete: data, edit: data, num: index + 1};
                return Object.assign(result, item);
            });
        }

        async mounted() {
            this.classData = await this.$api.getArticleClass().then((req: Types.InterfaceData) => this.$util.checkResp(req));
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }

        async addClass() {
            if (this.className.length === 0) {
                this.$message.error("请输入分类名");
            } else {
                this.addDialogVisible = false;
                this.loading = true;
                const params = {name: this.className, desc: this.desc};
                const {code, data} = await this.$api.addArticleClass(params);
                if (code === 1 || code === 0) {
                    this.changeData(data);
                } else {
                    this.$message.error(data)
                }
                this.className = "";
                this.desc = "";
            }
        }

        async deleteClass({row}: any) {
            this.loading = true;
            const {id} = row;
            const {code, data} = await this.$api.deleteArticleClass({id});
            if (code === 1 || code === 0) {
                this.changeData(data);
            } else {
                this.$message.error(data)
            }
        }

        openEditClass({row}: any) {
            this.editDialogVisible = true;
            const {name, desc, id} = row;
            this.editClassName = name;
            this.editDesc = desc;
            this.currentEditId = id;
        }

        async editClass() {
            this.loading = true;
            this.editDialogVisible = false;
            const params: Types.ArticleClassData = {
                id: this.currentEditId,
                name: this.editClassName,
                desc: this.editDesc
            };
            const {code, data} = await this.$api.updateArticleClass(params);
            if (code === 1 || code === 0) {
                this.changeData(data);
            } else {
                this.$message.error(data)
            }
        }

        changeData(data: any) {
            this.classData = data;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    }
</script>

<style lang="less" scoped>
    .addClass {
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

                    .border {
                        border-bottom: 2px solid black;
                    }
                }
            }

            .card-body {
                margin-top: 20px;
            }

        }
    }

</style>
