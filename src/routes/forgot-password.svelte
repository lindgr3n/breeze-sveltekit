<script context="module">
	export async function load({ session }) {
		const { authenticated } = session;

		if (authenticated) {
			return {
				status: 302,
				redirect: '/dashboard'
			};
		}
		return {};
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/axios';
	import ApplicationLogo from '$lib/components/ApplicationLogo.svelte';
	import AuthCard from '$lib/components/AuthCard.svelte';
	import AuthSessionStatus from '$lib/components/AuthSessionStatus.svelte';
	import AuthValidationErrors from '$lib/components/AuthValidationErrors.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import GuestLayout from '$lib/components/layouts/GuestLayout.svelte';

	let email = '';
	let status = null;
	let errors = [];

	async function submitForm(event) {
		const formData = new FormData();
		formData.append('email', email);
		const loginResponse = await authClient.post('/api/reset-password', formData).catch((e) => {
			console.log('LOGIN ERROR', e.response);
			errors = e.response.data.errors;
		});
		if (errors.length === 0) {
			goto('/login');
		}
	}
</script>

<GuestLayout>
	<AuthCard>
		<div slot="logo">
			<a href="/">
				<ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
			</a>
		</div>

		<div class="mb-4 text-sm text-gray-600">
			Forgot your password? No problem. Just let us know your email address and we will email you a
			password reset link that will allow you to choose a new one.
		</div>

		<!-- Session Status -->
		<AuthSessionStatus class="mb-4" {status} />

		<!-- Validation Errors -->
		<AuthValidationErrors class="mb-4" {errors} />

		<form onSubmit={submitForm}>
			<!-- Email Address -->
			<div>
				<Label for="email">Email</Label>
				<Input
					id="email"
					type="email"
					name="email"
					bind:value={email}
					class="block mt-1 w-full"
					required
					autofocus
				/>
			</div>

			<div class="flex items-center justify-end mt-4">
				<Button>Email Password Reset Link</Button>
			</div>
		</form>
	</AuthCard>
</GuestLayout>
