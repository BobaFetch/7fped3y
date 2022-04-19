import db from '$lib/db';

export async function get({ params }) {
	const contact_id = parseInt(params.contact);
	let socials, contact, deals, team;

	contact = await db
		.prepare(
			`SELECT contact_id, firstName, lastName, email, phone, category, info, description, location FROM contacts WHERE contact_id = ${params.contact} LIMIT 1`
		)
		.all();

	deals = await db.prepare(`SELECT * FROM deals WHERE client_id = ${params.contact}`).all();

	team = await db
		.prepare(
			`SELECT users.* FROM users LEFT JOIN deals ON users.company_id = deals.team_id 
			 LEFT JOIN contacts ON contacts.contact_id = deals.client_id WHERE deals.client_id = ${params.contact}`
		)
		.all();

	socials = await db.prepare(`SELECT * FROM socials where contact_id = ${params.contact}`).all();

	// console.log(socials);
	return {
		body: {
			contact: contact[0],
			deals,
			team,
			socials
		}
	};
}
