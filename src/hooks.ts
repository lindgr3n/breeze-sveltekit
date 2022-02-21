import cookie from 'cookie';
import { authClient } from '$lib/axios_backend';

const publicPages = ['/login', '/register', '/api', '/'];

async function isAuthenticated(event, cookies) {
	if (Object.keys(cookies).length === 0) {
		return false;
	}
	// TODO: Create a authenticated endpoint
	const responseFromServer = await authClient('/api/user', {
		method: 'get',
		headers: {
			Referer: event.url.host,
			'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
			Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
		}
	}).catch((e) => {
		console.log('Exception in hook', e);
	});

	if (responseFromServer && responseFromServer.status === 200) {
		return true;
	}

	return false;
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const authenticated = await isAuthenticated(event, cookies);
	event.locals.authenticated = authenticated;
	event.locals.guest = publicPages.includes(event.url.pathname);
	event.locals.user = cookies.user_session;

	const response = await resolve(event);
	return response;
}

export function getSession(request) {
	const { authenticated, guest, user } = request.locals;
	return {
		authenticated,
		guest,
		user: user ? JSON.parse(user) : null
	};
}
