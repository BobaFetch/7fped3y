import db from '$lib/db';

export async function get() {
	const deals = db.prepare('SELECT * FROM deals').all();
	console.log(deals);

	const contacts = db
		.prepare(
			`SELECT contacts.contact_id, firstName, lastName, email, phone, category, info, description, location,
			json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
			 as socials from contacts LEFT JOIN socials on contacts.contact_id = socials.contact_id group by contacts.contact_id`
		)
		.all();
	const users = db.prepare('SELECT * FROM users').all();

	// console.log(contacts);
	return {
		status: 200,
		body: {
			deals,
			contacts,
			users
		}
	};
}
