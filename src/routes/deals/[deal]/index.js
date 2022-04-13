import db from '$lib/db';

export async function get({ params }) {
	const deal_id = params.deal;

	let deal;
	let deliverables;
	let creator;
	let socials;

	deal = db.prepare(`SELECT * FROM deals where deal_id = ${deal_id}`).all();
	deliverables = db.prepare(`select * from deliverables WHERE deal_id = ${deal_id}`).all();
	creator = db.prepare(`SELECt * FROM contacts WHERE contact_id = ${deal[0].client_id}`).all();
	socials = db.prepare(`SELECT * FROM socials WHERE contact_id=${deal[0].client_id}`).all();

	return {
		body: {
			deal: deal[0],
			deliverables,
			creator: creator[0],
			socials
		}
	};
}
