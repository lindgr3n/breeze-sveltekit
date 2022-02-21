import { authClient } from '$lib/axios_backend';
import cookie from 'cookie';

export async function post(event) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	let errorsResponse = null;
	const response = await authClient('/logout', {
		method: 'post',
		headers: {
			Referer: event.url.host,
			'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
			Cookie: `XSRF-TOKEN=${cookies['XSRF-TOKEN']};laravel_session=${cookies['laravel_session']}`
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

	const xsrfCookie = cookie.serialize('XSRF-TOKEN', '', {
		httpOnly: true,
		maxAge: 0,
		path: '/'
	});
	const laravelCookie = cookie.serialize('laravel_session', '', {
		httpOnly: true,
		maxAge: 0,
		path: '/'
	});
	const userCookie = cookie.serialize('user_session', '', {
		httpOnly: true,
		maxAge: 0,
		path: '/'
	});

	event.locals.authenticated = false;
	event.locals.user = null;
	return {
		headers: {
			'Set-Cookie': [xsrfCookie, laravelCookie, userCookie]
		}
	};
}
