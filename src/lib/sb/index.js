import { getAllContacts, getContactById } from '$lib/sb/contacts';
import { getDeals, getDealById, getDealsByContact } from '$lib/sb/deals';
import { getAllUsers, getUserById, getTeam } from '$lib/sb/users';

export const db = {
	getAllContacts,
	getContactById,
	getDeals,
	getDealById,
	getDealsByContact,
	getAllUsers,
	getUserById,
	getTeam
};
