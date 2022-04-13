import db from '$lib/db';

export async function post({ request }) {
	const body = await request.json();
	db.prepare(
		`
    INSERT INTO deliverables(deal_id, description, dueDate, delivered)
    VALUES
    (${body.deal_id}, '${body.description}', '${body.dueDate}', '${body.delivered}')
  `
	).run();

	const data = db.prepare(`SELECT * FROM deliverables WHERE deal_id = ${body.deal_id}`).all();
	return {
		body: {
			data
		}
	};
}

export async function put({ request }) {
	const body = await request.json();
	const delivered = body.delivered === true ? 0 : 1;
	const deliveredDate = new Date(Date.now());

	if (delivered === 1) {
		db.prepare(
			`UPDATE deliverables SET delivered = 1, deliveredDate = '${deliveredDate}' WHERE deliverable_id = ${body.deliverable_id}`
		).run();
	} else {
		db.prepare(
			`UPDATE deliverables SET delivered = 0, deliveredDate = NULL WHERE deliverable_id = ${body.deliverable_id}`
		).run();
	}

	const data = db
		.prepare(`SELECT * FROM deliverables WHERE deliverable_id = ${body.deal_id}`)
		.all();

	return {
		body: {
			data
		}
	};
}

export async function del({ url }) {
	const deliverable_id = await url.searchParams.get('deliverable');
	const deal_id = await url.searchParams.get('deal');

	db.prepare(`DELETE FROM deliverables WHERE deliverable_id = ${deliverable_id}`).run();

	const data = db.prepare(`SELECT * FROM deliverables WHERE deal_id = ${deal_id}`).all();

	return {
		body: {
			data
		}
	};
}
