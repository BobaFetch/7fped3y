import db from '$lib/db';

export async function get({ url }) {
	const query = await url.searchParams.get('query');
	let data;

	if (query === 'Contacts') {
		data = db
			.prepare(`SELECT contact_id id, firstName || ' ' || lastName name FROM contacts`)
			.all();
	}

	if (query === 'Collabs') {
		data = db.prepare('SELECT deal_id id, dealName name FROM deals').all();
	}

	return {
		status: 200,
		body: {
			data
		}
	};
}
