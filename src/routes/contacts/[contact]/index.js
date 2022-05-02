// import db from '$lib/db';
import { db } from '$lib/sb';

export async function get({ params }) {
	const contact_id = parseInt(params.contact);
	let team;

	const contact = await db.getContactById(contact_id);
	const deals = await db.getDealsByContact(contact_id);

	// team = await db
	// 	.prepare(
	// 		`SELECT users.* FROM users LEFT JOIN deals ON users.company_id = deals.team_id
	// 		 LEFT JOIN contacts ON contacts.contact_id = deals.client_id WHERE deals.client_id = ${params.contact}`
	// 	)
	// 	.all();

	console.log(contact);
	return {
		body: {
			contact,
			deals,
			// team,
			socials
		}
	};
}
