<template>
    <div class="entrance">
        <back-ground/>
        <div class="content">
            <div class="home-header">
                <img class="home-logo"
                     src="http://img4.imgtn.bdimg.com/it/u=2018368050,1299385894&fm=26&gp=0.jpg"
                     alt="logo"/>
            </div>
            <div class="home-body">
                <div class="app-enter" :class="item.id" v-for="(item,i) in EnterData" :key="i"
                     :style="{left: item.left, bottom: item.bottom, width: item.width+'px'}" @click="">
                    <div class="link-container"
                         :style="{height: item.width*0.65+'px', border: `1px solid rgb(${item.rgb})`, color: item.fontColor, backgroundColor: item.bgColor, fontSize: item.width*0.17+'px', zIndex: 6}">
                        {{ item.name }}
                    </div>
                    <div class="shadow"
                         :style="{width: item.width+'px', height: item.width*0.65+'px', right: -item.width*0.12+'px', top: -item.width*0.12+'px', border: `2px solid rgb(${item.rgb}, 0.2)`}"></div>
                    <div class="arrow"
                         :style="{width: item.width*0.1+'px', height: item.width*0.1+'px', border: `1px solid rgb(${item.rgb})`, backgroundColor: item.bgColor, borderTop: 'none', borderLeft: 'none'}"></div>
                    <div :id="item.id" class="point"
                         :style="{top: item.width*0.78+'px', backgroundColor: `rgba(${item.rgb}, 0.25)`}">
                        <div class="circle" :style="{border: `2px solid rgb(${item.rgb}, 0.5)`}"></div>
                    </div>
                    <div class="group" :style="{top: item.width*1.12+'px'}">{{ item.group }}</div>
                </div>
                <div class="introduce"> 时光正好，未来可期，加油 ！</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "vuex-class";
    import jsCookie from "js-cookie";

    @Component
    export default class Home extends Vue {
        @Action setUserInfo: any;
        @Getter user: any;
        data: Array<Types.HeaderName> = [
            {label: "首页", jump: "/home"},
            {label: "编辑", jump: "/edit"},
            {label: "查找", jump: "/home"},
            {label: "待定", jump: "/home"},
            {label: "待定", jump: "/home"},
            {label: "待定", jump: "/home"},
            {label: "待定", jump: "/home"},
            {label: "待定", jump: "/home"},
        ];
        EnterData = [
            {
                left: "20%",
                bottom: "52%",
                width: 110,
                rgb: "30, 173, 249",
                modal: {
                    bgColor: "1, 38, 87",
                },
                bgColor: "#022d5d",
                fontColor: "#6ac9fc",
                name: "首页",
                group: "首页",
                id: "zhxy",
            },
            {
                left: "9%",
                bottom: "44%",
                width: 101,
                rgb: "30, 173, 249",
                modal: {
                    bgColor: "1, 38, 87",
                },
                bgColor: "#034283",
                fontColor: "#6ac9fc",
                name: "编辑",
                group: "编辑",
                id: "pkxk",
            },
            {
                left: "15%",
                bottom: "23%",
                width: 113,
                rgb: "30, 173, 249",
                modal: {
                    bgColor: "1, 38, 87",
                },
                bgColor: "#022e60",
                fontColor: "#6ac9fc",
                name: "快速查找",
                group: "查找",
                id: "qywx",
            },
            {
                left: "28%",
                bottom: "31%",
                width: 113,
                rgb: "174, 131, 252",
                modal: {
                    bgColor: "59, 31, 119",
                },
                bgColor: "#06366f",
                fontColor: "#ccb1fc",
                name: "文章撰写",
                group: "写作",
                id: "bwtk",
            },
            {
                left: "40%",
                bottom: "15%",
                width: 122,
                rgb: "254, 218, 0",
                bgColor: "#032b5c",
                fontColor: "#fbe97a",
                pathname: "/data",
                router: "/data",
                name: "个人主页",
                group: "个人主页",
                id: "jydsj",
            },
            {
                left: "54%",
                bottom: "23%",
                width: 104,
                rgb: "254, 218, 0",
                bgColor: "#04346c",
                fontColor: "#fbe97a",
                pathname: "https://yue.haofenshu.com",
                name: "数据汇总",
                group: "汇总",
                id: "ksyj",
            },
            {
                left: "67%",
                bottom: "18%",
                width: 113,
                rgb: "254, 218, 0",
                bgColor: "#022a5c",
                fontColor: "#fbe97a",
                pathname: "http://fenxi.haofenshu.com",
                name: "待定模块",
                group: "待定",
                id: "cjfx",
            },
            {
                left: "68%",
                bottom: "40%",
                width: 91,
                rgb: "43, 209, 199",
                modal: {
                    bgColor: "0, 53, 50",
                },
                bgColor: "#054789",
                fontColor: "#98E5E0",
                name: "待定模块",
                group: "待定",
                pathname: "http://data.yunxiao.com/manage",
                id: "zhszpj",
            },
            {
                left: "80%",
                bottom: "48%",
                width: 101,
                rgb: "43, 209, 199",
                modal: {
                    bgColor: "0, 53, 50",
                },
                bgColor: "#022d60",
                fontColor: "#98E5E0",
                name: "待定模块",
                group: "待定",
                id: "zysygh",
            },
            {
                left: "85%",
                bottom: "31%",
                width: 100,
                rgb: "43, 209, 199",
                modal: {
                    bgColor: "0, 53, 50",
                },
                bgColor: "#023a7c",
                fontColor: "#98E5E0",
                name: "待定模块",
                group: "待定",
                id: "zbpkxk",
            }
        ];


        async mounted() {

            if (jsCookie.get("email")) {
                const oldCookie: string = jsCookie.get("email") || "";
                const cookie: string = this.$util.DecodeCookie(oldCookie);
                const InterfaceData: Types.InterfaceData = (await this.$api.getUserInfo({cookie})).data;
                const {code,data} = InterfaceData;
                if (code === 0) {
                    this.setUserInfo(data);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .entrance {
        position: fixed;
        left: 0;
        top: 0;

        .content {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            font-size: 20px;
            text-align: center;
            padding-top: 5%;

            .home-logo {
                width: 220px;
                border-radius: 50%;
                animation: mylogo 3s;
                -moz-animation: mylogo 3s; /* Firefox */
                -webkit-animation: mylogo 3s; /* Safari and Chrome */
                -o-animation: mylogo 3s; /* Opera */
                animation-iteration-count: infinite;
            }

            .home-header {
                .link {
                    display: block;
                }
            }

            .home-body {
                padding-top: 20px;

                .list {
                    .link {
                        display: inline-block;
                        padding: 20px;
                        color: #409eff;
                        min-width: 80px;
                        text-decoration: none;
                    }
                }
            }

            .introduce {
                padding-top: 20px;
                font-size: 30px;
                color: #fff;
            }
        }
    }

    .app-enter {
        position: absolute;
        z-index: 18;
    }

    .app-enter > .link-container {
        padding: 0.3em;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 300;
    }

    .app-enter > .link-container:hover {
        color: #fff;
        text-decoration: none;
        font-weight: 300;
    }

    .app-enter > .shadow {
        position: absolute;
        border-radius: 3px;
        z-index: -1;
    }

    .app-enter > .arrow {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%) rotate(45deg);
        z-index: 5;
    }

    .app-enter > .group {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: #fff;
        white-space: nowrap;
        font-weight: 300;
    }

    .app-enter > .point {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .point > .circle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 71%;
        height: 71%;
        border-radius: 50%;
    }

    .point > .circle:before {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        content: '';
        display: block;
        width: 67%;
        height: 67%;
        border-radius: 50%;
    }

    .app-enter.zhxy .circle:before,
    .app-enter.pkxk .circle:before,
    .app-enter.qywx .circle:before {
        background: rgba(30, 173, 249, 0.5);
    }

    .app-enter.bwtk .circle:before {
        background: rgba(174, 131, 252, 0.5);
    }

    .app-enter.jydsj .circle:before,
    .app-enter.ksyj .circle:before,
    .app-enter.cjfx .circle:before {
        background-color: rgba(254, 218, 0, 0.5);
    }

    .app-enter.zhszpj .circle:before,
    .app-enter.zysygh .circle:before,
    .app-enter.zbpkxk .circle:before {
        background-color: rgba(43, 209, 199, 0.5);
    }


    .point > .circle:after {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        content: '';
        display: block;
        width: 33%;
        height: 33%;
        border-radius: 50%;
    }

    .app-enter.zhxy .circle:after,
    .app-enter.pkxk .circle:after,
    .app-enter.qywx .circle:after {
        background: rgb(30, 173, 249);
    }

    .app-enter.bwtk .circle:after {
        background: rgb(174, 131, 252);
    }

    .app-enter.jydsj .circle:after,
    .app-enter.ksyj .circle:after,
    .app-enter.cjfx .circle:after {
        background-color: rgb(254, 218, 0);
    }

    .app-enter.zhszpj .circle:after,
    .app-enter.zysygh .circle:after,
    .app-enter.zbpkxk .circle:after {
        background-color: rgb(43, 209, 199);
    }

    .app-enter:hover > .link-container {
        color: #fff !important;
    }

    .app-enter.zhxy:hover > .link-container,
    .app-enter.zhxy:hover > .arrow,
    .app-enter.pkxk:hover > .link-container,
    .app-enter.pkxk:hover > .arrow,
    .app-enter.qywx:hover > .link-container,
    .app-enter.qywx:hover > .arrow {
        background-color: rgb(30, 173, 249) !important;
    }

    .app-enter.zhxy:hover > .shadow,
    .app-enter.pkxk:hover > .shadow,
    .app-enter.qywx:hover > .shadow {
        background-color: rgba(30, 173, 249, 0.1);
    }

    .app-enter.bwtk:hover > .link-container,
    .app-enter.bwtk:hover > .arrow {
        background-color: rgb(174, 131, 252) !important;
    }

    .app-enter.bwtk:hover > .shadow {
        background-color: rgba(174, 131, 252, 0.1);
    }

    .app-enter.jydsj:hover > .link-container,
    .app-enter.jydsj:hover > .arrow,
    .app-enter.ksyj:hover > .link-container,
    .app-enter.ksyj:hover > .arrow,
    .app-enter.cjfx:hover > .link-container,
    .app-enter.cjfx:hover > .arrow {
        background-color: rgb(254, 218, 0) !important;
    }

    .app-enter.jydsj:hover > .shadow,
    .app-enter.ksyj:hover > .shadow,
    .app-enter.cjfx:hover > .shadow {
        background-color: rgba(254, 218, 0, 0.1);
    }

    .app-enter.zhszpj:hover > .link-container,
    .app-enter.zhszpj:hover > .arrow,
    .app-enter.zysygh:hover > .link-container,
    .app-enter.zysygh:hover > .arrow,
    .app-enter.zbpkxk:hover > .link-container,
    .app-enter.zbpkxk:hover > .arrow {
        background-color: rgb(43, 209, 199) !important;
    }

    .app-enter.zhszpj:hover > .shadow,
    .app-enter.zysygh:hover > .shadow,
    .app-enter.zbpkxk:hover > .shadow {
        background-color: rgba(43, 209, 199, 0.1);
    }


    @keyframes mylogo {
        0% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
        25% {
            transform: rotate(0deg) scale(1, 1);
            opacity: 0.8;
        }
        100% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
    }

    @-moz-keyframes mylogo {
        0% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
        25% {
            transform: rotate(0deg) scale(1, 1);
            opacity: 0.8;
        }
        100% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
    }

    @-webkit-keyframes mylogo {
        0% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
        25% {
            transform: rotate(0deg) scale(1, 1);
            opacity: 0.8;
        }
        100% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
    }

    @-o-keyframes mylogo {
        0% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
        25% {
            transform: rotate(0deg) scale(1, 1);
            opacity: 0.8;
        }
        100% {
            transform: rotate(0deg) scale(0.8, 0.8);
            opacity: 1;
        }
    }

</style>

