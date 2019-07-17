<template>
    <section class="edit">
        <h1 style="color: black">编辑页面</h1>
        <mark-down v-model="markdown" />
        <button class="print" @click="goPrint">打印markdown</button>

    </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class edit extends Vue {
        markdown:string = '';

        goPrint ():void {
            console.log(this.markdown)
        }

    }
</script>

<style lang="less" scoped>

</style>
