import { getDeals, getDealById } from '$lib/database/deals';
import { getAllContacts, getContactById } from '$lib/database/contacts';
import { getAllUsers } from '$lib/database/users';

export const db = {
	getDeals,
	getDealById,
	getAllContacts,
	getContactById,
	getAllUsers
};
