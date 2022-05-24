import { db } from '$lib/sb';

export async function del({ url }) {
	const contact_id = url.searchParams.get('id');

	db.deleteContact(contact_id);

	return {
		status: 302,
		headers: {
			location: '/contacts'
		}
	};
}
