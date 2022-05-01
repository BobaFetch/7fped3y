// import db from '$lib/db';
import { db } from '$lib/sb';

//REMOVE SQLITE SHIT WHEN ALL IS WORKING

export async function get() {
	// const deals = db.prepare('SELECT * FROM deals').all();
	const deals = await db.getDeals();
	const contacts = await db.getAllContacts();
	const users = await db.getAllUsers();
	// console.log(contacts);

	// const contacts = db
	// 	.prepare(
	// 		`SELECT contacts.contact_id, firstName, lastName, email, phone, category, info, description, location,
	// 		json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
	// 		 as socials from contacts LEFT JOIN socials on contacts.contact_id = socials.contact_id group by contacts.contact_id`
	// 	)
	// 	.all();
	// const users = db.prepare('SELECT * FROM users').all();

	return {
		status: 200,
		body: {
			deals,
			contacts,
			users
		}
	};
}
