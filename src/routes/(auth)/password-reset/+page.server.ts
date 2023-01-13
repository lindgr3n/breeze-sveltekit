import { authClient } from '$lib/axios_backend';
import { fail } from '@sveltejs/kit';
import cookie from 'cookie';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function () {
	return {};
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();

		const response = await authClient.get('/sanctum/csrf-cookie');
		const headersCookies = response?.headers['set-cookie'] ?? [];
		const cookies = cookie.parse(headersCookies.join(';'));

		let errorsResponse: Array<string> = [];
		await authClient('/forgot-password', {
			method: 'post',
			headers: {
				Referer: url.host,
				'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
				Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
			},
			data: { email: data.get('email') }
		}).catch((error) => {
			errorsResponse = Object.keys(error.response.data.errors).map((key) => {
				return error.response.data.errors[key];
			});
		});

		if (errorsResponse.length > 0) {
			return fail(400, { errors: errorsResponse });
		}
	}
};
