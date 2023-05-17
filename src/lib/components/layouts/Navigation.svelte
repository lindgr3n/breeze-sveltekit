<script lang="ts">
	import { page } from '$app/stores';
	import ApplicationLogo from '../ApplicationLogo.svelte';
	import Dropdown from '../Dropdown.svelte';
	import NavLink from '../NavLink.svelte';
	import ResponsiveNavButton from '../ResponsiveNavButton.svelte';
	import ResponsiveNavLink from '../ResponsiveNavLink.svelte';

	let open = false;
	export let user: User | null;
</script>

<nav class="bg-white border-b border-gray-100">
	<!-- Primary Navigation Menu -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex">
				<!-- Logo -->
				<div class="flex-shrink-0 flex items-center">
					<a href="/dashboard">
						<ApplicationLogo class="block h-10 w-auto fill-current text-gray-600" />
					</a>
				</div>

				<!-- Navigation Links -->
				<div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
					<NavLink href="/dashboard" active={$page.url.pathname === '/dashboard'}>
						Dashboard
					</NavLink>
					<NavLink href="/profile" active={$page.url.pathname === '/profile'}>Profile</NavLink>
				</div>
			</div>

			<!-- Settings Dropdown -->
			<div class="hidden sm:flex sm:items-center sm:ml-6">
				<Dropdown>
					{user?.name ?? '...'}
					<div slot="items" class="divide-y divide-gray-100">
						<div class="px-4 py-3">
							<p class="text-sm leading-5">Signed in as</p>
							<p class="text-sm font-medium leading-5 text-gray-900 truncate">{user?.email}</p>
						</div>
						<div class="py-1">
							<form action="/logout" method="POST">
								<button
									class="cursor-pointer text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
									role="menuitem"
									type="submit"
								>
									Sign out
								</button>
							</form>
						</div>
					</div>
				</Dropdown>
			</div>

			<!-- Hamburger -->
			<div class="-mr-2 flex items-center sm:hidden">
				<button
					on:click={(evt) => (open = !open)}
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
				>
					<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
						{#if open}
							<path
								class="inline-flex"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								class="inline-flex"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Responsive Navigation Menu -->
	{#if open}
		<div class="block sm:hidden">
			<div class="pt-2 pb-3 space-y-1">
				<ResponsiveNavLink href="/dashboard" active={$page.url.pathname === '/dashboard'}>
					Dashboard
				</ResponsiveNavLink>
				<ResponsiveNavLink href="/profile" active={$page.url.pathname === '/profile'}>
					Profile
				</ResponsiveNavLink>
			</div>

			<!-- Responsive Settings Options -->
			<div class="pt-4 pb-1 border-t border-gray-200">
				<div class="flex items-center px-4">
					<div class="flex-shrink-0">
						<svg
							class="h-10 w-10 fill-current text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>

					<div class="ml-3">
						<div class="font-medium text-base text-gray-800">
							{user?.name}
						</div>
						<div class="font-medium text-sm text-gray-500">
							{user?.email}
						</div>
					</div>
				</div>

				<div class="mt-3 space-y-1">
					<form action="/logout" method="POST">
						<!-- Authentication -->
						<ResponsiveNavButton>Logout</ResponsiveNavButton>
					</form>
				</div>
			</div>
		</div>
	{/if}
</nav>
