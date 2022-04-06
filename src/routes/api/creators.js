import db from '$lib/db';

export async function get() {
	const creators = db.prepare('SELECT * FROM contacts').all();

	const socials = db.prepare('SELECT * FROM socials').all();

	return {
		status: 200,
		body: {
			creators,
			socials
		}
	};
}
