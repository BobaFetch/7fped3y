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
			platform,
			url,
			followers
		)
  `
		)
		.eq('contact_id', id)
		.single();

	if (error) {
		// console.log(error);
		throw new Error(error.message);
	}

	return data;
};
