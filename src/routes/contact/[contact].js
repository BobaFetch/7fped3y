import data from '$lib/mock_data.json';
import { contactStore } from '$lib/stores/tempStore';

export async function get({ params }) {
	const contact_id = params.contact;
	const contact = data.contacts.find((c) => c.contact_id == contact_id);
	const deals = data.deals.filter((d) => d.client_id == contact_id);
	const owner = data.users.find((u) => u.user_id === contact.owner_id);

	const test = data.users.filter((user) =>
		deals.map((deal) => deal.owner_id).includes(user.user_id)
	);

	const dealData = {
		client: contact,
		deals: deals
	};

	console.log(test);
	return {
		body: {
			contact,
			deals,
			owner,
			team: test
		}
	};
}
