import { db } from '$lib/sb';

export async function post({ request }) {
	const { newDeal, deliverablesArray } = await request.json();

	const inserted = await db.addDeal(newDeal);

	if (inserted) {
		deliverablesArray.map((d) => {
			d.deal_id = inserted[0].deal_id;
		});
		await db.addDeliverables(deliverablesArray);
	}

	return {
		body: {
			deal_id: inserted[0].deal_id
		}
	};
}

export async function put({ request }) {
	const body = await request.json();

	await db.updateDeal(body);

	return {
		status: 200
	};
}

export async function del({ url }) {
	const deal_id = await url.searchParams.get('deal_id');

	const deleted = await db.deleteDealById(deal_id);

	return {
		status: 303,
		headers: {
			Location: '/collabs'
		}
	};
}
