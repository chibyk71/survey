<script lang="ts">
	import '../app.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<div>
	<slot />
</div>

<style>
	div {
		min-height: 100vh;
		background-color: var(--color-gray-100);
	}
</style>
