<script>
	import { goto } from '$app/navigation';

	import { authClient } from '$lib/axios';

	import ApplicationLogo from '$lib/components/ApplicationLogo.svelte';

	import AuthCard from '$lib/components/AuthCard.svelte';
	import AuthValidationErrors from '$lib/components/AuthValidationErrors.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import GuestLayout from '$lib/components/layouts/GuestLayout.svelte';

	async function submitForm() {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('password_confirmation', password_confirmation);
		const registerResponse = await authClient.post('/api/register', formData).catch((e) => {
			console.log('REGISTER ERROR', e.response);
			errors = e.response.data.errors;
		});
		if (errors.length === 0) {
			goto('/login');
		}
	}

	let name = '';
	let email = '';
	let password = '';
	let password_confirmation = '';
	let errors = [];
</script>

<GuestLayout>
	<AuthCard>
		<div slot="logo">
			<a href="/">
				<ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
			</a>
		</div>

		<!-- Validation Errors -->
		<AuthValidationErrors class="mb-4" {errors} />

		<form on:submit|preventDefault={submitForm}>
			<!-- Name -->
			<div>
				<Label for="name">Name</Label>

				<Input
					id="name"
					type="text"
					bind:value={name}
					class="block mt-1 w-full"
					required
					autoFocus
				/>
			</div>

			<!-- Email Address -->
			<div class="mt-4">
				<Label for="email">Email</Label>
				<Input id="email" type="email" bind:value={email} class="block mt-1 w-full" required />
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
					autoComplete="new-password"
				/>
			</div>

			<!-- Confirm Password -->
			<div class="mt-4">
				<Label for="password_confirmation">Confirm Password</Label>
				<Input
					id="password_confirmation"
					type="password"
					bind:value={password_confirmation}
					class="block mt-1 w-full"
					required
				/>
			</div>

			<div class="flex items-center justify-end mt-4">
				<a href="/login" class="underline text-sm text-gray-600 hover:text-gray-900">
					Already registered?
				</a>
				<Button class="ml-4">Register</Button>
			</div>
		</form>
	</AuthCard>
</GuestLayout>
