import { db } from '$lib/sb';

export async function get({ params }) {
	const user_id = params.id;
	let team;
	const user = await db.getUserById(1);
	if (user) {
		team = await db.getTeam(user.company_id);
	}

	console.log(user);

	return {
		body: {
			user,
			team
		}
	};
}
