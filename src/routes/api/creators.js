import db from '$lib/db';

export async function get() {
	const creators = db
		.prepare(
			'SELECT contacts.*, company_id team_id FROM contacts JOIN users ON users.user_id = contacts.owner_id'
		)
		.all();

	const socials = db.prepare('SELECT * FROM socials').all();

	return {
		status: 200,
		body: {
			creators,
			socials
		}
	};
}
