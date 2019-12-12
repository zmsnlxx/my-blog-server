<template>
    <div class="entrance" @click="$router.push({path:'/home'})">
        <back-ground/>
        <div class="content">
            <div class="home-header">
                <img class="home-logo"
                     src="http://img4.imgtn.bdimg.com/it/u=2018368050,1299385894&fm=26&gp=0.jpg"
                     alt="logo"/>
            </div>
            <div class="home-body">
                <div class="introduce"> 时光正好，未来可期，欢迎回来，开始吧少年 ！</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Home extends Vue {}
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

                .introduce {
                    padding-top: 20px;
                    margin-top: 40px;
                    font-size: 30px;
                    color: #fff;
                }
            }


        }
    }

</style>

