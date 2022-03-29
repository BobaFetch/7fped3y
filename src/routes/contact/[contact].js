import data from '$lib/mock_data.json';
import db from '$lib/db';
import { contactStore } from '$lib/stores/tempStore';

export async function get({ params }) {
	const contact_id = parseInt(params.contact);
	let contactData, contact, deals, team;
	// const socials = db
	// 	.prepare(
	// 		`SELECT contacts.*,
	// 	(SELECT socials.platform FROM socials WHERE client_id = contacts.contact_id) as socials
	// 	FROM contacts where contact_id = 2`
	// 	)
	// 	.all();
	// console.log(socials);

	contact = await db
		.prepare(
			`SELECT contact_id, firstName, lastName, email, phone, category, info, description, location,
		json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
		 as socials from contacts LEFT JOIN socials on contact_id = client_id WHERE contact_id = ${params.contact} LIMIT 1`
		)
		.all();
	deals = await db.prepare(`SELECT * FROM deals WHERE client_id = ${params.contact}`).all();
	team = await db
		.prepare(
			`SELECT users.* FROM users LEFT JOIN deals ON users.company_id = deals.team_id 
			 LEFT JOIN contacts ON contacts.contact_id = deals.client_id WHERE deals.client_id = ${params.contact}`
		)
		.all();
	// console.log(contact);
	return {
		body: {
			contact: contact[0],
			deals,
			team
		}
	};
}
