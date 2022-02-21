<script>
	import AppLayout from '$lib/components/layouts/AppLayout.svelte';
</script>

<svelte:head>
	<title>Laravel - Dashboard</title>
</svelte:head>

<AppLayout>
	<h2 slot="header" class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>

	<div class="py-12">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
			<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
				<div class="p-6 bg-white border-b border-gray-200">You're logged in!</div>
			</div>
		</div>
	</div>
</AppLayout>
