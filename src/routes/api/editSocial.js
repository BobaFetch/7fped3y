import db from '$lib/db';

export async function put({ request }) {
	const body = await request.json();

	console.log(body);
	let socials;

	body.map((social) => {
		!social.social_id
			? db.exec(
					`INSERT INTO socials (contact_id, platform, url, followers) VALUES(${social.contact_id}, '${social.platform}', '${social.url}', '0')`
			  )
			: db.exec(
					`UPDATE socials SET url='${social.url}', platform='${social.platform}' WHERE social_id=${social.social_id} RETURNING * `
			  );
	});

	socials = db.prepare(`SELECT * FROM socials WHERE contact_id = ${body[0].contact_id}`).all();

	return {
		status: 200,
		body: {
			socials
		}
	};
}

export async function del({ url }) {
	const id = url.searchParams.get('id');
	const contact = url.searchParams.get('contact');

	db.exec(`DELETE FROM socials WHERE social_id = ${id}`);

	let socials = db.prepare(`SELECT * FROM socials where contact_id = ${contact}`).all();

	return {
		status: 200,
		body: {
			socials
		}
	};
}
