// import db from '$lib/db';
import { db } from '$lib/database';

export async function get({ params }) {
	const deal_id = params.collab;

	// let deal;
	let deliverables;
	let creator;
	let socials;

	const deal = await db.getDealById(deal_id);

	if (deal) {
		creator = await db.getContactById(deal.client_id);
	}
	// deal = db
	// 	.prepare(
	// 		`SELECT deals.*, users.firstName || ' ' || users.lastName owner FROM deals LEFT JOIN users ON deals.owner_id = users.user_id where deal_id = ${deal_id}`
	// 	)
	// 	.all();
	// deliverables = db.prepare(`select * from deliverables WHERE deal_id = ${deal_id}`).all();
	// creator = db.getContactByID(deal.contact_id);
	// socials = db.prepare(`SELECT * FROM socials WHERE contact_id = ${deal[0].client_id}`).all();
	// const team = db.prepare(`SELECT * FROM users WHERE company_id = ${deal[0].team_id}`).all();

	console.log(deal);
	// console.log(creator);
	return {
		body: {
			deal,
			creator
		}
	};
}
