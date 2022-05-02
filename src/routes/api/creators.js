// import db from '$lib/db';
import { db } from '$lib/sb';
import { supabase } from '$lib/supabase';

export async function get() {
	const creators = await db.getCreators();
	const socials = await db.getSocials();

	console.log(creators.body);

	// const creators = db
	// 	.prepare(
	// 		'SELECT contacts.*, company_id team_id FROM contacts JOIN users ON users.user_id = contacts.owner_id'
	// 	)
	// 	.all();

	// const socials = db.prepare('SELECT * FROM socials').all();
	// let socials;

	return {
		status: 200,
		body: {
			creators,
			socials
		}
	};
}
