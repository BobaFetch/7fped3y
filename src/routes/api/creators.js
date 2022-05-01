import db from '$lib/db';
import { supabase } from '$lib/supabase';

export async function get() {
	const { error, data } = await supabase.from('contacts').select(`
		*,
		users (
			company_id,
			team_id
		)
	`);

	if (data) {
		console.log(data);
	}
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
