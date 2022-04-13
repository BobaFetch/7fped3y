import db from '$lib/db';

export async function put({ request }) {
	const body = await request.json();
	console.log(body);

	db.prepare(
		`UPDATE deals SET dealDescription = '${body.dealDescription}', status = '${body.status}' WHERE deal_id = ${body.deal_id}`
	).run();

	return {};
}
