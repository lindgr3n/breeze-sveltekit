import axios from 'axios';

export const authClient = axios.create({
	baseURL: variables.backend_url,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},
	withCredentials: true // required to handle the CSRF token
});
