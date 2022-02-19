<script>
	let className;
	export { className as class };
	export let disabled = false;
    export let value;
</script>

<input
	{disabled}
	class="{className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
	{...$$restProps}
    bind:value={value}
/>
