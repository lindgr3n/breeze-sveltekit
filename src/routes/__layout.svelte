<script context="module">
	export async function load({ url, session }) {
		const { authenticated, guest, user } = session;
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
				userSession: user
			}
		};
	}
</script>

<script>
	import '../app.css';
	import { user } from '$lib/store/user';

	export let userSession;

	if (userSession) {
		user.set(userSession);
	}
</script>

<svelte:head>
	<title>Laravel</title>
</svelte:head>

<slot />
