<script>
	let className = '';
	let htmlFor;
	export { className as class };
	export { htmlFor as for };
</script>

<label for={htmlFor} class="{className} block font-medium text-sm text-gray-700">
	<slot />
</label>
