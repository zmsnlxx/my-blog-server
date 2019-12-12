<template>
    <section class="header">
        <ul class="ul">
            <li class="li" v-for="(item,index) in routerData" :key="index" @click="changeIndex(item)">
                <router-link class="routerJump" :class="currentIndex === index ? 'selection' : ''" :to="item.path">{{
                    item.name }}
                </router-link>
            </li>

            <li v-if="isLogin" class="li" style="float: right">
                <el-dropdown style="width: 100%;height: 100%;" placement="top-end">
                    <el-button style="width: 100%;height: 100%;font-size: 18px;color: white" type="text">{{
                        userInfo.name }}
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push({path:'/personal'})">个人资料</el-dropdown-item>
                        <el-dropdown-item @click.native="clearUser">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li v-else class="li" style="float: right">
                <router-link class="routerJump" to="/login">[登录]</router-link>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {Getter, Action} from "vuex-class";
    import JsCookie from "js-cookie";
    import Types from "../../../types/index";

    @Component
    export default class HeaderNav extends Vue {
        @Action setUserInfo: any;
        @Getter userInfo: any;
        isLogin: boolean = false;
        routerData: Array<Types.RouterData> = [
            {name: "首页", path: "/home/index"},
            {name: "分类管理", path: "/home/addClass"},
            {name: "标签管理", path: "/home/tags"},
            {name: "编辑记录", path: "/home/editRecord"},
            {name: "数据汇总", path: "/home/dataSummary"},
        ];
        currentIndex: number = 0;

        async mounted() {
            if (JsCookie.get("email")) {
                const oldCookie: string = JsCookie.get("email") || "";
                const cookie: string = this.$util.DecodeCookie(oldCookie);
                const InterfaceData: Types.InterfaceData = await this.$api.getUserInfo({cookie});
                const {code, data} = InterfaceData;
                if (code === 0) {
                    await this.setUserInfo(data);
                    this.isLogin = this.$lo.size(this.userInfo) !== 0;
                }
            }
        };

        changeIndex(params: Types.RouterData): void {
            this.currentIndex = this.$lo.findIndex(this.routerData, (item: Types.RouterData): boolean => item.path === params.path);
        }

        clearUser() {
            JsCookie.remove("email");
            this.$router.push({path: "/login"});
        }

    }
</script>

<style lang="less" scoped>
    .header {
        z-index: 100;
        width: 100%;
        position: relative;
        height: 60px;
        background-color: #475669;
        box-shadow: 0 0 5px #999999;

        .icon {
            color: white;
            font-size: 30px;
            display: inline-block;
            margin-left: 140px;
            margin-top: 20px;
            line-height: 30px;

        }

        .ul {
            padding-left: 0;
            width: 80%;
            height: 60px;
            margin: 0 auto;

            .li {
                color: white;
                width: 120px;
                font-size: 18px;
                list-style: none;
                float: left;
                text-align: left;
                line-height: 60px;

                .routerJump {
                    text-decoration: none;
                    color: white;
                }

                .routerJump:hover {
                    color: bisque;
                }

                .selection {
                    color: bisque;
                }
            }

        }
    }
</style>
