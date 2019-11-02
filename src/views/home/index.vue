<template>
    <div class="home">
        <headerNav class="header"></headerNav>
        <router-view class="content"></router-view>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import headerNav from '../other/header'


    @Component({components: {headerNav}})
    export default class Home extends Vue {


    }
</script>
<style lang="less">
    .home {
        overflow: auto;
        position: relative;
        background-color: #eeeeee;
        height: 100%;
        .header {
            position: fixed;
            top: 0;
            width: 100%;
        }
        .content {
            width: 100%;
        }
    }
</style>
