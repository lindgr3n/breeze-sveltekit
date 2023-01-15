import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function (event) {
	return {
		user: event.locals.user
	};
};
