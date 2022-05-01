import { db } from '$lib/database';

export async function get() {
	const deals = await db.getDeals();
	const contacts = await db.getAllContacts();
	const users = await db.getAllUsers();

	// console.log(contacts);
	return {
		status: 200,
		body: {
			deals,
			contacts,
			users
		}
	};
}
