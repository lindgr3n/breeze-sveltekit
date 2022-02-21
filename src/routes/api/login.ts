import cookie from 'cookie';
import { authClient } from '$lib/axios_backend';

export async function post(event) {
	const data = await event.request.formData();

	const response = await authClient.get('/sanctum/csrf-cookie');
	let cookies = cookie.parse(response.headers['set-cookie'].join(';'));

	let errorsResponse = null;
	const loginRespons = await authClient('/login', {
		method: 'post',
		headers: {
			'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
			Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
		},
		data: { email: data.get('email'), password: data.get('password') }
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

	cookies = cookie.parse(loginRespons.headers['set-cookie'].join(';'));
	const responseFromServer = await authClient('/api/user', {
		method: 'get',
		headers: {
			Referer: 'localhost:3000',
			'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
			Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
		}
	}).catch((e) => {
		console.log('CATCHED USER ERROR', e.response.statusText);
	});

	cookies = cookie.parse(responseFromServer.headers['set-cookie'].join(';'));

	const xsrfCookie = cookie.serialize('XSRF-TOKEN', cookies['XSRF-TOKEN'], {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7, // 1 week
		path: '/'
	});
	const laravelCookie = cookie.serialize('laravel_session', cookies['laravel_session'], {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7, // 1 week
		path: '/'
	});
	const userCookie = cookie.serialize('user_session', JSON.stringify(responseFromServer.data), {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7, // 1 week
		path: '/'
	});

	event.locals.user = responseFromServer.data

	return {
		headers: {
			'Set-Cookie': [xsrfCookie, laravelCookie, userCookie]
		},
		body: responseFromServer.data
	};
}
