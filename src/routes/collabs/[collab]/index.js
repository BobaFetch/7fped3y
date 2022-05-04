// import db from '$lib/db';
import { db } from '$lib/sb';
export async function get({ params }) {
	const deal_id = params.collab;

	let creator;
	let team;

	const deal = await db.getDealById(deal_id);

	if (deal) {
		creator = await db.getContactById(deal.client_id);
		team = await db.getTeam(deal.team_id);
	}

	return {
		body: {
			deal,
			creator,
			team
		}
	};
}
