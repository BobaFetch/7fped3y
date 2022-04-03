import db from '$lib/db';

export async function post({ request }) {
	const body = await request.json();
	console.log(body);

	return {};
}
