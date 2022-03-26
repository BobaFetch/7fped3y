import { writable } from 'svelte/store';

import contacts from '$lib/mock_contacts.json';

export const authenticated = writable(true);

const contactStore = writable(null, (set) => {
	set(contacts);
});

export { contactStore };
