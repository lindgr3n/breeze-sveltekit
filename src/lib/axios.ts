import axios from 'axios';

export const authClient = axios.create({
	// baseURL: 'http://localhost:3000',
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},
	withCredentials: true // required to handle the CSRF token
});
