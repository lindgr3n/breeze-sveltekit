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
	let email = '';
	let password = '';
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

		<form method="post" use:enhance>
			<!-- Email Address -->
			<div>
				<Label for="email">Email</Label>

				<Input
					id="email"
					type="email"
					name="email"
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
					name="password"
					bind:value={password}
					class="block mt-1 w-full"
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
				<a href="/password-reset" class="underline text-sm text-gray-600 hover:text-gray-900">
					Forgot your password?
				</a>
				<Button class="ml-3">Login</Button>
			</div>
		</form>
	</AuthCard>
</GuestLayout>
