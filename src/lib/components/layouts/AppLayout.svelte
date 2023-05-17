<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from './Navigation.svelte';
</script>

<div class="min-h-screen bg-gray-100">
	<Navigation user={$page?.data.user} />

	<!-- Page Heading -->
	<header class="bg-white shadow">
		<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<slot name="header" />
		</div>
	</header>

	<!-- Page Content -->
	<main><slot /></main>
</div>
