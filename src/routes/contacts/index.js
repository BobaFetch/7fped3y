import { db } from '$lib/sb';
import { supabase } from '$lib/supabase';

export async function get() {
	const contacts = await db.getAllContacts();

	return {
		body: {
			contacts
		}
	};
}

export async function post({ request }) {
	const { contact, socials } = await request.json();
	let contact_id;

	await supabase
		.from('contacts')
		.insert(contact)
		.then((data) => (contact_id = data.data[0].contact_id));

	if (socials.length > 0) {
		if (contact_id) {
			socials.map((social) => (social.contact_id = contact_id));
			console.log(socials);
			await supabase.from('socials').insert(socials);
		}
	}

	return {};
}

export async function del({ url }) {
	const contact_id = url.searchParams.get('id');

	await db
		.from('socials')
		.delete()
		.match({ contact_id: contact_id })
		.then(await db.from('contacts').delete().match({ contact_id: contact_id }));
	return {};
}
