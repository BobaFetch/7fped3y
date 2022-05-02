import { supabase } from '$lib/supabase';

export const getAllUsers = async () => {
	const { data, error } = await supabase.from('users').select('*');

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const getTeam = async (team_id) => {
	const { data, error } = await supabase.from('users').select('*').eq('company_id', team_id);
	if (error) {
		throw new Error(error.message);
	}

	return data;
};
