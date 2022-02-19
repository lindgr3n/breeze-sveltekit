<script>
	let className;
	export let status = null;
	export { className as class };
</script>

{#if status}
	<div class="{className} font-medium text-sm text-green-600">
		{status}>
	</div>
{/if}
