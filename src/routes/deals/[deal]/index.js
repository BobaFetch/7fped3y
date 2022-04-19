import db from '$lib/db';

export async function get({ params }) {
	const deal_id = params.deal;

	let deal;
	let deliverables;
	let creator;
	let socials;

	deal = db
		.prepare(
			`SELECT deals.*, users.firstName || ' ' || users.lastName owner FROM deals LEFT JOIN users ON deals.owner_id = users.user_id where deal_id = ${deal_id}`
		)
		.all();
	deliverables = db.prepare(`select * from deliverables WHERE deal_id = ${deal_id}`).all();
	creator = db.prepare(`SELECt * FROM contacts WHERE contact_id = ${deal[0].client_id}`).all();
	socials = db.prepare(`SELECT * FROM socials WHERE contact_id = ${deal[0].client_id}`).all();
	const team = db.prepare(`SELECT * FROM users WHERE company_id = ${deal[0].team_id}`).all();

	return {
		body: {
			deal: deal[0],
			deliverables,
			creator: creator[0],
			socials,
			team
		}
	};
}
