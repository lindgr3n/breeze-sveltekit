import { authClient } from '$lib/axios_backend';
import cookie from 'cookie';

export async function get(event) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	let errorsResponse = null;
	const responseUser = await authClient('/api/user', {
		method: 'get',
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

	const user = responseUser.data;
	return {
		body: user
	};
}
