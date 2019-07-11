<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class App extends Vue {

    }
</script>

<style>
    @import 'assets/css/common.less';

    html, body {
        margin: 0;
        height: 100%;
    }
</style>
