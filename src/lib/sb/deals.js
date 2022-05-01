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
	`
    )
    .eq('deal_id', id)
    .single();

  if (error) {
    throw new Error(error);
  }

  return data;
};
