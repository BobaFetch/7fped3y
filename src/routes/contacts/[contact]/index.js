// import db from '$lib/db';
import { db } from '$lib/sb';

export async function get({ params }) {
	const contact_id = parseInt(params.contact);
	let team;

	const contact = await db.getContactById(contact_id);
	const deals = await db.getDealsByContact(contact_id);
	if (deals) {
		team = await db.getTeam(deals[0].team_id);
	}

	console.log(contact);
	return {
		body: {
			contact,
			deals,
			team
		}
	};
}
