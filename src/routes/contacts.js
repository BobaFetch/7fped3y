import db from '$lib/db';

export async function get() {
	const contacts = await db
		.prepare(
			`SELECT contact_id, firstName, lastName, email, phone, category, info, description, location,
			json_group_array(json_object('platform', socials.platform, 'url', socials.url, 'followers', socials.followers))
			 as socials from contacts join socials on contact_id = client_id group by contact_id`
		)
		.all();

	console.log(contacts);

	return {
		body: {
			contacts
		}
	};
}
