import { authClient } from '$lib/axios_backend';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Verify we are authenticated
	const responseFromServer = await authClient('/api/user', {
		method: 'get',
		headers: {
			Referer: event.url.host,
			'X-XSRF-TOKEN': event.cookies.get('XSRF-TOKEN'),
			Cookie: `XSRF-TOKEN=${event.cookies.get('XSRF-TOKEN')};laravel_session=${event.cookies.get(
				'laravel_session'
			)}`
		}
	}).catch(() => {
		// Unauthenticated
	});

	event.locals.user = responseFromServer?.data ?? null;
	const routeId = event.route.id ?? '';

	if (event.locals.user && routeId.includes('/(auth)/') && routeId != '/(auth)/logout') {
		throw redirect(303, '/dashboard');
	}

	if (!event.locals.user && routeId.includes('/(app)/')) {
		// Need authentication
		throw redirect(303, '/login');
	}

	const response = await resolve(event);

	return response;
};
