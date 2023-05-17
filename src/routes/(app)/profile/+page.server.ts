import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function ({ locals }) {
	// Could skip passing the user here because pagedata is merged with the page data in layout.server
	// Can be good to return it here in the case where you want light weight user populated in hooks and want to return more detailed user here.
	return { user: locals.user };
};

export const actions: Actions = {
	default: async () => {
		return {};
	}
};
