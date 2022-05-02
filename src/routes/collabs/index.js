import { db } from '$lib/sb';

export async function get() {
	const deals = await db.getDeals();
	const contacts = await db.getAllContacts();
	const users = await db.getAllUsers();

	return {
		status: 200,
		body: {
			deals,
			contacts,
			users
		}
	};
}
