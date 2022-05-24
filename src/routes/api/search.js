import { supabase } from '$lib/supabase';

export async function get({ url }) {
	const query = await url.searchParams.get('query');
	let options;

	if (query === 'Contacts') {
		const { data, error } = await supabase
			.from('contacts')
			.select('contact_id, firstname, lastname');

		if (error) {
			console.log(error);
		}

		options = data;
		console.log(options);
	}

	if (query === 'Collabs') {
		// data = db.prepare('SELECT deal_id id, dealName name FROM deals').all();
		const { data, error } = await supabase.from('deals').select('deal_id, dealName');

		options = data;
	}

	return {
		status: 200,
		body: {
			options
		}
	};
}
