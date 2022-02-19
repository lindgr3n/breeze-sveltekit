const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
