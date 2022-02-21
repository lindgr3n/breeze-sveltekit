import { authClient } from '$lib/axios_backend';

export async function get(event) {
	let errorsResponse = null;
	const responseUser = await authClient('/reset-password', {
		method: 'post',
		headers: {
			Referer: event.url.host
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

	return {};
}
