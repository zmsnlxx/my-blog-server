<template>
	<div class="home">
		首页
	</div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import ContentNav from './content.vue'


	@Component({components: {ContentNav}})
    export default class Home extends Vue {
	   
    }
</script>
<style lang="less">

</style>
