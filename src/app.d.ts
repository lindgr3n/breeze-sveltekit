/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: User?;
		}

		interface PageData {
			user: User?;
		}

		// interface Platform {}

		// interface Session {}

		// interface Stuff {}
	}
	interface User {
		id: number;
		name: string;
		email: string;
		email_verified_at: Date;
		created_at: Date;
		updated_at: Date;
	}
}

export {};
