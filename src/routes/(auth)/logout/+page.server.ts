import { authClient } from '$lib/axios_backend';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import cookie from 'cookie';
import type { PageServerLoad, Actions, RequestEvent } from './$types';

export const load: PageServerLoad = async function (event) {
	if (event.locals.user) {
		await logoutAction(event);
	}
	throw redirect(307, '/login');
};

export const actions: Actions = {
	default: async (event) => {
		await logoutAction(event);
		throw redirect(307, '/login');
	}
};

async function logoutAction(event: ServerLoadEvent | RequestEvent) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	await authClient('/logout', {
		method: 'post',
		headers: {
			Referer: event.url.host,
			'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
			Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
		}
	}).catch(() => {
		//
	});
	event.cookies.delete('XSRF-TOKEN');
	event.cookies.delete('laravel_session');
	event.cookies.delete('laravel_session');
	event.locals.user = null;

	throw redirect(307, '/login');
}
