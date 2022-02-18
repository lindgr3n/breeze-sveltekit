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
				// user: response ? response.data : {}
				user: {}
			}
		};
	}
</script>

<script>
	import '../app.css';
</script>

<div class="min-h-screen bg-gray-100">
	<!-- <Navigation user={user} /> -->

	<!-- Page Heading -->
	<!-- <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {{header}}
        </div>
    </header> -->

	<!-- Page Content -->
	<main><slot /></main>
</div>
