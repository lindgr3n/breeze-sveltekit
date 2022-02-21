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
	import { user } from '$lib/store/user';

	let email = '';
	let password = '';
	let status = null;
	let errors = [];

	async function submitForm(event) {
		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);
		const loginResponse = await authClient.post('/api/login', formData).catch((e) => {
			console.log('LOGIN ERROR', e.response);
			errors = e.response.data.errors;
		});
		user.set(loginResponse.data);
		if (errors.length === 0) {
			goto('/dashboard'); // Does not trigger hook
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

		<!-- Session Status -->
		<AuthSessionStatus class="mb-4" {status} />

		<!-- Validation Errors -->
		<AuthValidationErrors class="mb-4" {errors} />

		<form on:submit|preventDefault={submitForm}>
			<!-- Email Address -->
			<div>
				<Label for="email">Email</Label>

				<Input
					id="email"
					type="email"
					class="block mt-1 w-full"
					bind:value={email}
					required
					autoFocus
				/>
			</div>

			<!-- Password -->
			<div class="mt-4">
				<Label for="password">Password</Label>

				<Input
					id="password"
					type="password"
					bind:value={password}
					class="block mt-1 w-full"
					required
					autoComplete="current-password"
				/>
			</div>

			<!-- Remember Me -->
			<div class="block mt-4">
				<label for="remember_me" class="inline-flex items-center">
					<input
						id="remember_me"
						type="checkbox"
						name="remember"
						class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>

					<span class="ml-2 text-sm text-gray-600"> Remember me </span>
				</label>
			</div>

			<div class="flex items-center justify-end mt-4">
				<a href="/forgot-password" class="underline text-sm text-gray-600 hover:text-gray-900">
					Forgot your password?
				</a>
				<Button class="ml-3">Login</Button>
			</div>
		</form>
	</AuthCard>
</GuestLayout>
