import db from '$lib/db';
import { supabase } from '$lib/supabase';

export async function put({ request }) {
	const { socials } = await request.json();

	console.log(socials);
	await supabase
		.from('socials')
		.upsert(socials)
		.then((res) => console.log(res));
	return {
		status: 200
		// body: {
		// 	socials
		// }
	};
}

export async function del({ url }) {
	const id = url.searchParams.get('id');
	const contact = url.searchParams.get('contact');

	await supabase.from('socials').delete().match({ social_id: id });

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
		.eq('contact_id', contact)
		.single();

	console.log(data);

	return {
		status: 200,
		body: {
			contact: data
		}
	};
}
