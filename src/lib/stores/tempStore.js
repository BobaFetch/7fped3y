import { writable } from 'svelte/store';

import data from '$lib/mock_data.json';

export const authenticated = writable(false);

const contactStore = writable(null, (set) => {
	set(data.contacts);
});

export { contactStore };
