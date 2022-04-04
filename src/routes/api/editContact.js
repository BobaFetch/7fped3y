import db from '$lib/db';

export async function del({ url }) {
	const contact_id = url.searchParams.get('id');

	db.prepare(`DELETE FROM contacts WHERE contact_id = ${contact_id}`).run();

	return {
		status: 302,
		headers: {
			location: '/contacts'
		}
	};
}
