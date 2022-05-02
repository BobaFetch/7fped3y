import { getAllContacts, getContactById } from '$lib/sb/contacts';
import { getDeals, getDealById } from '$lib/sb/deals';
import { getAllUsers, getTeam } from '$lib/sb/users';

export const db = {
	getAllContacts,
	getContactById,
	getDeals,
	getDealById,
	getAllUsers,
	getTeam
};
