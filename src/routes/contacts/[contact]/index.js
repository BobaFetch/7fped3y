// import db from '$lib/db';
import { db } from '$lib/sb';
import { supabase } from '$lib/supabase';

export async function get({ params }) {
	const contact_id = parseInt(params.contact);
	let team;

	const contact = await db.getContactById(contact_id);
	const deals = await db.getDealsByContact(contact_id);
	if (deals.length > 0) {
		team = await db.getTeam(deals[0].team_id);
	}

	return {
		body: {
			contact,
			deals,
			team
		}
	};
}

export async function put({ request }) {
	const body = await request.json();
	//need to find a more efficient way to do this

	const contact = {
		firstname: body.firstname,
		lastname: body.lastname,
		email: body.email,
		phone: body.phone,
		category: body.category,
		info: body.info,
		description: body.description,
		location: body.location
	};

	await supabase.from('contacts').update(contact).match({ contact_id: body.contact_id });
	return {};
}

export async function del({ params }) {
	const contact_id = parseInt(params.contact);

	await supabase
		.from('socials')
		.delete()
		.match({ contact_id: contact_id })
		.then(await supabase.from('contacts').delete().match({ contact_id: contact_id }));

	return {};
}
