import { supabase } from '$lib/supabase';

export const getDeals = async () => {
	const { data, error } = await supabase.from('deals').select('*');

	if (error) {
		throw new Error(error);
	}

	return data;
};

export const getDealById = async (id) => {
	const { data, error } = await supabase
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
			description,
			duedate,
			delivered,
			delivereddate
		)
    )
	`
		)
		.eq('deal_id', id)
		.single();

	if (error) {
		throw new Error(error);
	}

	return data;
};

export const getDealsByContact = async (contact_id) => {
	const { data, error } = await supabase.from('deals').select('*').eq('client_id', contact_id);

	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const addDeal = async (deal) => {
	const { data, error } = await supabase.from('deals').insert([
		{
			client_id: deal.contact_id,
			owner_id: deal.owner_id,
			team_id: deal.team_id,
			dealName: deal.dealName,
			dealDescription: deal.description,
			active: deal.active,
			status: deal.status
		}
	]);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const updateDeal = async (deal) => {
	const { data, error } = await supabase
		.from('deals')
		.update({
			client_id: deal.client_id,
			owner_id: deal.owner_id,
			team_id: deal.team_id,
			dealName: deal.dealName,
			dealDescription: deal.description,
			active: deal.active,
			status: deal.status
		})
		.match({ deal_id: deal.deal_id });

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const addDeliverables = async (deliverables) => {
	const { data, error } = await supabase.from('deliverables').insert(deliverables);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const deleteDealById = async (deal_id) => {
	const { data, error } = await supabase.from('deals').delete().match({ deal_id: deal_id });

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const deleteDeliverablesByDealId = async (deal_id) => {
	const { data, error } = await supabase.from('deliverables').delete().match({ deal_id: deal_id });

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
