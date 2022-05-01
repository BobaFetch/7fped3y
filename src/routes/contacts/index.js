import db from '$lib/db';

export async function get() {
	const contacts = db
		.prepare(
			`SELECT contacts.contact_id, firstName, lastName, email, phone, category, info, description, location,
			json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
			 as socials from contacts LEFT JOIN socials on contacts.contact_id = socials.contact_id group by contacts.contact_id`
		)
		.all();

	return {
		body: {
			contacts
		}
	};
}

export async function post({ request }) {
	let body = await request.json();
	console.log(body.socials);
	const { firstName, lastName, email, phone, category, info, description, location, owner_id } =
		body;

	const newContact = db.prepare(`
		INSERT INTO contacts(firstName, lastName, email, phone, category, info, description, location, owner_id)
		VALUES('${firstName}', '${lastName}', '${email}', '${phone}', '${category}', '${info}', '${description}', '${location}', ${owner_id}) RETURNING *`);

	// if (body.socials.length > 0) {
	// 	const { platform, url } = body.socials;
	// 	const newSocial = `INSERT INTO socials ()`;
	// }

	console.log(newContact.run());

	const contacts = db
		.prepare(
			`SELECT contacts.contact_id, firstName, lastName, email, phone, category, info, description, location,
			json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
			 as socials from contacts LEFT JOIN socials on contacts.contact_id = socials.contact_id group by contacts.contact_id`
		)
		.all();
	return {
		status: 200,
		body: {
			contacts
		}
	};
}

export async function del({ url }) {
	const contact_id = url.searchParams.get('id');

	db.prepare(`DELETE FROM contacts WHERE contact_id = ${contact_id}`).run();

	return {};
}
