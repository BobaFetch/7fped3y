import { supabase } from '$lib/client';

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
		dealname,
		dealdescription,
		active,
		status,
		deliverables(
			description,
			duedate,
			delivered,
			delivereddate
		)
	`
		)
		.eq('deal_id', id);

	if (error) {
		throw new Error(error);
	}

	return data;
};
