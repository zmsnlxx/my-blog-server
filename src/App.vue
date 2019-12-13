<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    @Component
    export default class App extends Vue {}
</script>

<style>
    @import 'assets/css/common.less';

    html,body,#app{
        margin: 0;
        height: 100%;
        overflow: auto;
    }
</style>
