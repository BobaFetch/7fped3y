import db from '$lib/db';

export async function put({ request }) {
	const body = await request.json();
	console.log(body);

	db.prepare(
		`UPDATE deals SET dealDescription = '${body.dealDescription}', status = '${body.status}' WHERE deal_id = ${body.deal_id}`
	).run();

	return {};
}

export async function post({ request }) {
	const body = await request.json();
	let newDealId;
	console.log(body);
	db.prepare(
		`
		INSERT INTO deals (client_id, owner_id, team_id, dealName, dealDescription, active, status)
		VALUES
		(${body.contact_id}, ${body.owner_id}, ${body.team_id}, '${body.dealName}', '${body.description}', ${body.active}, '${body.status}')
	`
	).run();

	// get back last_insert_rowid() and set newDealId
	const { lastInsertRowid } = db.prepare(`SELECT last_insert_rowid() FROM deals`).run();

	return {
		body: {
			lastInsertRowid
		}
	};
}

export async function del({ url }) {
	const deal_id = await url.searchParams.get('deal_id');

	db.prepare(`DELETE FROM deals WHERE deal_id = ${deal_id}`).run();

	return {
		status: 303,
		headers: {
			Location: '/deals'
		}
	};
}
