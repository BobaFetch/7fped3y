import db from '$lib/db';

export async function get() {
	const contacts = db
		.prepare(
			`SELECT contact_id, firstName, lastName, email, phone, category, info, description, location,
			json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
			 as socials from contacts LEFT JOIN socials on contact_id = client_id group by contact_id`
		)
		.all();

	// const del = db.prepare(`DELETE FROM contacts where contacts.firstName = 'Andrew'`);

	// del.run();

	return {
		body: {
			contacts
		}
	};
}

export async function post({ request }) {
	let body = await request.json();
	console.log(body);
	const { firstName, lastName, email, phone, category, info, description, location, owner_id } =
		body;

	const newContact = db.prepare(`
		INSERT INTO contacts(firstName, lastName, email, phone, category, info, description, location, owner_id)
		VALUES('${firstName}', '${lastName}', '${email}', '${phone}', '${category}', '${info}', '${description}', '${location}', ${owner_id})`);
	// if (body.socials.length > 0) {
	// 	const { platform, url } = body.socials;
	// 	const newSocial = `INSERT INTO socials`;
	// }

	newContact.run();

	const contacts = db
		.prepare(
			`SELECT contact_id, firstName, lastName, email, phone, category, info, description, location,
			json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
			 as socials from contacts LEFT JOIN socials on contact_id = client_id group by contact_id`
		)
		.all();
	return {
		status: 200,
		headers: {
			location: '/contacts'
		},
		body: {
			contacts
		}
	};
}
