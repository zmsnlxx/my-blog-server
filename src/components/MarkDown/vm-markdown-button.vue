<template>
    <div class="vm-markdown-button" @mouseleave="hideSlot" @click="showSlot">
        <i :class="icon" :data-layout="layout"></i>
        <slot v-if="slot"/>
    </div>
</template>

<script lang="ts">
    import {Vue, Component,Prop} from 'vue-property-decorator'

    @Component

    export default class VmMarkdownButton extends Vue {
        @Prop({default: "iconfont icon-heading"}) icon: string;
        @Prop({default: ""}) layout: string;
        @Prop({default: false}) keepSlot: boolean;
        slot = this.keepSlot;

        showSlot():void {
            if(this.keepSlot) return;
            !this.slot ? this.slot = true : this.slot = false
        }

        hideSlot():void {
            if(this.keepSlot) return;
            this.slot = false
        }
    }
</script>

<style lang="less" scoped>
    .vm-markdown-button {
        // width: 24px;
        // height: 24px;
        position: relative;
        border-radius: 4px;
        outline: 0;
        cursor: pointer;
        background-color: transparent;
        border: none;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        color: inherit;

        &:first-child {
            margin-left: 0;
        }

        i {
            display: inline-block;
            line-height: 24px;
            width: 24px;
            font-size: 16px;
            // color: #858585;
            color: inherit;
            text-align: center;
        }
    }
</style>
