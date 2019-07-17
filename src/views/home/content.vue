<template>
    <section class="content">
        <h1>lxx</h1>
        <top-nav/>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import TopNav from "../other/TopNav.vue";

    @Component({components: {TopNav}})
    export default class ContentNav extends Vue {


    }
</script>
<style lang="less" scoped>

</style>
