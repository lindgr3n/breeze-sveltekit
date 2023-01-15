import { authClient } from '$lib/axios_backend';
import { fail, redirect } from '@sveltejs/kit';
import type { AxiosResponse } from 'axios';
import cookie from 'cookie';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function () {
	return {};
};

export const actions: Actions = {
	default: async ({ request, params, url }) => {
		const data = await request.formData();
		const token = params.token;
		const email = url.searchParams.get('email');

		const response: AxiosResponse = await authClient.get('/sanctum/csrf-cookie');
		const headersCookies = response?.headers['set-cookie'] ?? [];
		const cookies = cookie.parse(headersCookies.join(';'));

		let errorsResponse: Array<string> = [];
		await authClient('/reset-password', {
			method: 'post',
			headers: {
				Referer: url.host,
				'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
				Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
			},
			data: {
				email: email,
				password: data.get('password'),
				password_confirmation: data.get('password_confirmation'),
				token: token
			}
		}).catch((error) => {
			errorsResponse = Object.keys(error.response.data.errors).map((key) => {
				return error.response.data.errors[key];
			});
		});

		if (errorsResponse.length > 0) {
			return fail(400, { errors: errorsResponse });
		}
		throw redirect(303, '/login');
	}
};
