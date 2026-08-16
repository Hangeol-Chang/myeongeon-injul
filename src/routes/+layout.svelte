<script lang="ts">
	import favicon from '$lib/assets/facivon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<style>
		@font-face {
			font-family: 'KookminUniversitySunggokSerif';
			src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/2607101542@kmu80sungkokserif/kmu80sungkokserif/KMU80SungkokSerif.woff2')
				format('woff2');
			font-weight: 400;
			font-display: swap;
		}
	</style>
</svelte:head>

{@render children()}
