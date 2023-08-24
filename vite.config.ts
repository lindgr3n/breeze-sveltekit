import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@lucia-auth/sveltekit']
	},
	server: {
		origin: 'http://localhost',
		port:3000
	  },
	  preview:{
		port:3000,
		},
};

export default config;
