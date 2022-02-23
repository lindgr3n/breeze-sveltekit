import axios from 'axios';
import { variables } from '$lib/variables';

export const authClient = axios.create({
	baseURL: variables.backend_url,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},
	withCredentials: true // required to handle the CSRF token
});
