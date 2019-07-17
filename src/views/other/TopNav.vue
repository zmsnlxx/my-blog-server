<template>
    <el-header>
		<span class="left" v-if="$route.path !== '/home'" @click="$router.back(-1)">
			<i class="el-icon-arrow-left"></i>
		</span>
        <ul class="header_list">
            <router-link></router-link>
            <li class="list" v-for="(item,index) in data" :key="index">
                <router-link :to="item.jump">{{ item.label }}</router-link>
            </li>
        </ul>
        <span class="time">{{ time }}</span>
    </el-header>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    let timer: any;
    @Component
    export default class TopNav extends Vue {
        time: string = "";
        date = new Date();
        data: Array<Types.HeaderName> = [
            {label: "首页",jump:'/home'},
            {label: "编辑",jump:'/edit'},
            {label: "查找",jump:'/home'}
        ];

        mounted(): void {
            const that = this;
            timer = setInterval(function() {
                that.date = new Date();
                const year = that.date.getFullYear();
                let month: string | number = that.date.getMonth() + 1;
                let strDate: string | number = that.date.getDate();
                const hour = that.date.getHours();
                const minutes = that.date.getMinutes();
                let seconds: string | number = that.date.getSeconds();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                that.time = `${year}-${month}-${strDate} ${hour}:${minutes}:${seconds}`;
            }, 1000);
        }

        beforeDestroy() {
            if (timer) {
                clearInterval(timer);//在vue实例销毁钱，清除定时器
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-header {
        position: fixed;
        z-index: 100;
        height: 60px;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;

        .left {
            height: 60px;
            line-height: 60px;
            color: white;
            position: absolute;
            left: 20px;
            font-size: 30px;
            font-weight: 300;
        }

        .header_list {
            float: left;
            list-style: none;
            margin-left: 30px;

            .list {
                float: left;
                color: white;
                display: inline-block;
                margin-right: 30px;
                font-size: 20px;
            }
        }

        .title {
            color: white;
            line-height: 60px;
            font-size: 20px;
        }

        .time {
            color: white;
            line-height: 60px;
            position: absolute;
            right: 20px;
            top: 15px;
        }
    }
</style>
