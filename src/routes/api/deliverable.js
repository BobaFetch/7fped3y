import { db } from '$lib/sb';
import { supabase } from '$lib/supabase';

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

export async function put({ url, request }) {
	const body = await request.json();
	const deal_id = await url.searchParams.get('deal');
	const delivered = body.delivered == true ? 0 : 1;
	const deliveredDate = new Date(Date.now());
	let data;
	console.log(body);

	if (delivered == 1) {
		await supabase
			.from('deliverables')
			.update({ delivered: 1, delivereddate: deliveredDate })
			.match({ deliverable_id: body.deliverable_id });
		// .then((res) => (data = res.data));
	} else {
		await supabase
			.from('deliverables')
			.update({ delivered: 0, delivereddate: null })
			.match({ deliverable_id: body.deliverable_id });
		// .then((res) => (data = res.data));
	}

	await supabase
		.from('deals')
		.select(
			`
		deal_id,
		client_id,
		owner_id,
		team_id,
		dealName,
		dealDescription,
		active,
		status,
		deliverables(
			deliverable_id,
			description,
			duedate,
			delivered,
			delivereddate
		)
		)
	`
		)
		.eq('deal_id', deal_id)
		.single()
		.then((res) => (data = res.data));

	return {
		body: {
			data
		}
	};
}

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
