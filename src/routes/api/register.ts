import { authClient } from '$lib/axios_backend';
import cookie from 'cookie';

export async function post(event) {
	const data = await event.request.formData();

	const response = await authClient.get('/sanctum/csrf-cookie');
	const cookies = cookie.parse(response.headers['set-cookie'].join(';'));

	let errorsResponse = null;
	const registerResponse = await authClient('/register', {
		method: 'post',
		headers: {
			'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
			Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
		},
		data: {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
			password_confirmation: data.get('password_confirmation')
		}
	}).catch((error) => {
		errorsResponse = {
			status: error.response.status,
			body: {
				errors: Object.values(error.response.data.errors).flat()
			}
		};
	});

	if (errorsResponse) {
		return errorsResponse;
	}

	// cookies = cookie.parse(registerResponse.headers['set-cookie'].join(';'));

	// const xsrfCookie = cookie.serialize('XSRF-TOKEN', cookies['XSRF-TOKEN'], {
	// 	httpOnly: true,
	// 	maxAge: 60 * 60 * 24 * 7, // 1 week
	// 	path: '/'
	// });
	// const laravelCookie = cookie.serialize('laravel_session', cookies['laravel_session'], {
	// 	httpOnly: true,
	// 	maxAge: 60 * 60 * 24 * 7, // 1 week
	// 	path: '/'
	// });

	return {
		// headers: {
		// 	'Set-Cookie': [xsrfCookie, laravelCookie]
		// },
		body: registerResponse.data
	};
}
