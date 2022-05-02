import { db } from '$lib/sb';

export async function post({ request }) {
	const body = await request.json();
	console.log(body);

	const newDeal = await db.addDeal(body.newDeal);

	return {
		body: {
			deal_id: newDeal[0].deal_id
		}
	};
}

export async function del({ url }) {
	const deal_id = await url.searchParams.get('deal_id');

	const deletedDeal = await db.deleteDealById(deal_id);
	const deletedDeliverables = await db.deleteDeliverablesByDealId(deal_id);

	db.prepare(`DELETE FROM deals WHERE deal_id = ${deal_id}`).run();
	db.prepare(`DELETE FROM deliverables WHERE deal_id = ${deal_id}`).run();

	return {
		status: 303,
		headers: {
			Location: '/collabs'
		}
	};
}
