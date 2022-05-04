import { db } from '$lib/sb';

export async function get({ url }) {
	const deal_id = await url.searchParams.get('deal_id');

	const data = await db.getDealById(deal_id);

	return {
		body: data
	};
}

export async function post({ request }) {
	const body = await request.json();
	const { data } = await db.addDeliverables(body);

	return {
		status: 200
	};
}

// export async function put({ request }) {
// 	const body = await request.json();
// 	const delivered = body.delivered == true ? 0 : 1;
// 	const deliveredDate = new Date(Date.now());

// 	if (delivered == 1) {
// 		db.prepare(
// 			`UPDATE deliverables SET delivered = 1, deliveredDate = '${deliveredDate}' WHERE deliverable_id = ${body.deliverable_id}`
// 		).run();
// 	} else {
// 		db.prepare(
// 			`UPDATE deliverables SET delivered = 0, deliveredDate = NULL WHERE deliverable_id = ${body.deliverable_id}`
// 		).run();
// 	}

// 	const data = db.prepare(`SELECT * FROM deliverables WHERE deal_id = ${body.deal_id}`).all();
// 	console.log(data);
// 	return {
// 		body: {
// 			data
// 		}
// 	};
// }

export async function del({ url }) {
	const deliverable_id = await url.searchParams.get('deliverable');
	const deal_id = await url.searchParams.get('deal');

	const data = await db.deleteDeliverableById(deliverable_id);
	console.log(data);

	return {
		body: {
			data
		}
	};
}
