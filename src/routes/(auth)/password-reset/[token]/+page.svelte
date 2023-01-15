<script lang="ts">
	import ApplicationLogo from '$lib/components/ApplicationLogo.svelte';
	import AuthCard from '$lib/components/AuthCard.svelte';
	import AuthValidationErrors from '$lib/components/AuthValidationErrors.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import GuestLayout from '$lib/components/layouts/GuestLayout.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let password = '';
	let password_confirmation = '';
	let errors: Array<string> = [];

	$: errors = form?.errors ?? [];

	// async function submitForm(event) {
	// 	const formData = new FormData();
	// 	formData.append('email', email);
	// 	const loginResponse = await authClient.post('/api/reset-password', formData).catch((e) => {
	// 		console.log('LOGIN ERROR', e.response);
	// 		errors = e.response.data.errors;
	// 	});
	// 	if (errors.length === 0) {
	// 		goto('/login');
	// 	}
	// }
</script>

<GuestLayout>
	<AuthCard>
		<div slot="logo">
			<a href="/">
				<ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
			</a>
		</div>

		<div class="mb-4 text-sm text-gray-600">Enter your new password.</div>

		<!-- Validation Errors -->
		<AuthValidationErrors class="mb-4" {errors} />

		<form method="post" use:enhance>
			<!-- Password -->
			<div>
				<Label for="email">Password</Label>
				<Input
					id="password"
					type="password"
					name="password"
					bind:value={password}
					class="block mt-1 w-full"
					required
					autofocus
				/>
			</div>
			<div>
				<Label for="email">Comfirm password</Label>
				<Input
					id="password_confirmation"
					type="password"
					name="password_confirmation"
					bind:value={password_confirmation}
					class="block mt-1 w-full"
					required
					autofocus
				/>
			</div>

			<div class="flex items-center justify-end mt-4">
				<Button>Submit</Button>
			</div>
		</form>
	</AuthCard>
</GuestLayout>
