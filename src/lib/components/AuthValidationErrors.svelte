<script lang="ts">
	let className = '';
	export let errors: Array<string> = [];
	export { className as class };
</script>

{#if errors.length > 0}
	<div class={className}>
		<div class="font-medium text-red-600">Whoops! Something went wrong.</div>

		<ul class="mt-3 list-disc list-inside text-sm text-red-600">
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	</div>
{/if}
