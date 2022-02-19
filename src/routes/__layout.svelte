<script context="module">
	export async function load({ url, session }) {
		const { authenticated, guest } = session;
		// If we are not on a guest endpoint and we are not authenticated we redirect
		if (!authenticated && !guest) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			status: 200,
			props: {
				authenticated
			}
		};
	}
</script>

<script>
	import '../app.css';
	import { user } from '$lib/store/user';
	import { authClient } from '$lib/axios';
	import { onMount } from 'svelte';


	onMount(async () => {
		console.log('STORED USER', $user, authenticated);
		if(!$user && authenticated) {
			// Fetch user and store
			const response = await authClient.get('/api/user');
			user.set(response.data)
		}
	})

	export let authenticated;
</script>

<svelte:head>
	<title>Laravel</title>
</svelte:head>

<slot />
