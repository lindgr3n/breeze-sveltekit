<script lang="ts">
	import ApplicationLogo from '$lib/components/ApplicationLogo.svelte';

	import AuthCard from '$lib/components/AuthCard.svelte';
	import AuthValidationErrors from '$lib/components/AuthValidationErrors.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import GuestLayout from '$lib/components/layouts/GuestLayout.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let errors: Array<string> = [];

	$: errors = form?.errors ?? [];
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

		<form method="post" action="/register">
			<!-- Name -->
			<div>
				<Label for="name">Name</Label>

				<Input
					id="name"
					name="name"
					type="text"
					value={form?.name ?? ''}
					class="block mt-1 w-full"
					required
					autoFocus
				/>
			</div>

			<!-- Email Address -->
			<div class="mt-4">
				<Label for="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					value={form?.email ?? ''}
					class="block mt-1 w-full"
					required
				/>
			</div>

			<!-- Password -->
			<div class="mt-4">
				<Label for="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
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
					name="password_confirmation"
					type="password"
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
