import axios, { type AxiosInstance } from 'axios';

export const authClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL as string,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},
	withCredentials: true // required to handle the CSRF token
});
