<template>
	<section class="home">
		<top-nav style="margin-top: 20px"/>
		<section class="content">
			<h1>lxx</h1>
		</section>
		<router-view/>
	</section>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import ContentNav from './content.vue'
	import TopNav from "../other/TopNav.vue";


	@Component({components: {ContentNav,TopNav}})
    export default class HomeNav extends Vue {
	   
    }
</script>
<style lang="less">
	.home{
		width: 100%;
		.content{
			width: 80%;
			margin: 0 auto;
			background-color: white;
			height: 500px;
		}
	}
</style>
