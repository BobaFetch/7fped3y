import { get } from 'svelte/store';
import { authenticated } from './stores/tempStore';

export async function guard({ url }) {
	const isAuthenticated = get(authenticated);

	if (isAuthenticated && url.pathname === '/auth') {
		return {
			status: 302,
			redirect: '/collabs'
		};
	} else if (!isAuthenticated && url.pathname !== '/auth') {
		return {
			status: 302,
			redirect: '/auth'
		};
	}

	return {};
}
