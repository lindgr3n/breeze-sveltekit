import type { PageServerLoad, Actions } from './$types';
import cookie from 'cookie';
import { authClient } from '$lib/axios_backend';
import type { AxiosResponse } from 'axios';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async function () {
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals, cookies, url }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, missing: true });
		}

		if (!password) {
			return fail(400, { password, missing: true });
		}

		const response: AxiosResponse = await authClient.get('/sanctum/csrf-cookie');
		let headersCookies = response?.headers['set-cookie'] ?? [];
		let headerCookies = cookie.parse(headersCookies.join(';'));

		let errorsResponse: Array<string> = [];
		const loginResponse: AxiosResponse | void = await authClient('/login', {
			method: 'post',
			headers: {
				'X-XSRF-TOKEN': headerCookies['XSRF-TOKEN'],
				Cookie: `XSRF-TOKEN=${headerCookies['XSRF-TOKEN']};laravel_session=${headerCookies['laravel_session']}`
			},
			data: { email: data.get('email'), password: data.get('password') }
		}).catch((error) => {
			errorsResponse = Object.keys(error.response.data.errors).map((key) => {
				return error.response.data.errors[key];
			});
		});

		if (errorsResponse.length > 0) {
			return fail(400, { errors: errorsResponse });
		}

		headersCookies = loginResponse?.headers['set-cookie'] ?? [];
		headerCookies = cookie.parse(headersCookies.join(';'));
		const responseFromServer: AxiosResponse<User> | void = await authClient('/api/user', {
			method: 'get',
			headers: {
				Referer: url.host,
				'X-XSRF-TOKEN': headerCookies['XSRF-TOKEN'],
				Cookie: `XSRF-TOKEN=${headerCookies['XSRF-TOKEN']};laravel_session=${headerCookies['laravel_session']}`
			}
		}).catch((e) => {
			console.log('CATCHED USER ERROR', e.response.statusText);
		});

		headersCookies = responseFromServer?.headers['set-cookie'] ?? [];
		headerCookies = cookie.parse(headersCookies.join(';'));

		locals.user = responseFromServer?.data ?? null;

		cookies.set('XSRF-TOKEN', headerCookies['XSRF-TOKEN'], {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/'
		});
		cookies.set('laravel_session', headerCookies['laravel_session'], {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/'
		});
		cookies.set('laravel_session', headerCookies['laravel_session'], {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/'
		});

		throw redirect(303, '/dashboard');
	}
};
