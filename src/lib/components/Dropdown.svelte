<script lang="ts">
	export let open = false;
</script>

<div class="flex items-center justify-center p-12">
	<div class=" relative inline-block text-left dropdown">
		<span class="rounded-md shadow-sm">
			<button
				on:click={(evt) => (open = !open)}
				class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
				type="button"
				aria-haspopup="true"
				aria-expanded="true"
				aria-controls="headlessui-menu-items-117"
			>
				<span><slot /></span>
				<svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"
					><path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</button></span
		>
		{#if open}
			<div class="transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
				<div
					class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
					aria-labelledby="headlessui-menu-button-1"
					id="headlessui-menu-items-117"
					role="menu"
				>
					<slot name="items" />
				</div>
			</div>
		{/if}
	</div>
</div>
