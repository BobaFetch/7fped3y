import { supabase } from '$lib/supabase';

export const getAllContacts = async () => {
	const { data, error } = await supabase.from('contacts').select(`
    contact_id,
		firstname,
		lastname,
		email,
		phone,
		category,
		info,
		description,
		location,
		socials (
			platform,
			url,
			followers
		)
  `);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const getContactById = async (id) => {
	const { data, error } = await supabase
		.from('contacts')
		.select(
			`
  contact_id,
		firstname,
		lastname,
		email,
		phone,
		category,
		info,
		description,
		location,
		socials (
			social_id,
			contact_id,
			platform,
			url,
			followers
		)
  `
		)
		.eq('contact_id', id)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const getCreators = async () => {
	const { data, error } = await supabase.from('contacts').select(`
	contact_id,
	firstname,
	lastname,
	email,
	phone,
	category,
	info,
	description,
	location,
	socials(
		platform,
		url,
		followers
	),
	owner:owner_id(
		user_id,
		company_id,
		team_id
	)
`);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const getSocials = async () => {
	const { data, error } = await supabase.from('socials').select('*');
	if (error) {
		throw new Error(error.message);
	}
	return data;
};
