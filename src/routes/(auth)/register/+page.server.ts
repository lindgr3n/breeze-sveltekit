import type { PageServerLoad, Actions } from './$types';
import cookie from 'cookie';
import { authClient } from '$lib/axios_backend';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async function () {
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');
		const password_confirmation = data.get('password_confirmation');

		const response = await authClient.get('/sanctum/csrf-cookie');
		const headersCookies = response?.headers['set-cookie'] ?? [];
		const cookies = cookie.parse(headersCookies.join(';'));

		let errorsResponse: Array<string> = [];
		await authClient('/register', {
			method: 'post',
			headers: {
				'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
				Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
			},
			data: {
				name: name,
				email: email,
				password: password,
				password_confirmation: password_confirmation
			}
		}).catch((error) => {
			console.log(error);

			errorsResponse = Object.keys(error.response.data.errors).map((key) => {
				return error.response.data.errors[key];
			});
		});

		if (errorsResponse.length > 0) {
			return fail(400, { email, name, errors: errorsResponse });
		}
		throw redirect(303, '/login');
	}
};
