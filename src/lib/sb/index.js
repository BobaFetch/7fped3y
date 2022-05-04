import { getAllContacts, getContactById, getCreators, getSocials } from '$lib/sb/contacts';
import {
	getDeals,
	getDealById,
	getDealsByContact,
	addDeal,
	updateDeal,
	addDeliverables,
	deleteDealById,
	deleteDeliverablesByDealId
} from '$lib/sb/deals';
import { getAllUsers, getUserById, getTeam } from '$lib/sb/users';

export const db = {
	getAllContacts,
	getContactById,
	getCreators,
	getSocials,
	getDeals,
	getDealById,
	getDealsByContact,
	addDeal,
	updateDeal,
	addDeliverables,
	deleteDealById,
	deleteDeliverablesByDealId,
	getAllUsers,
	getUserById,
	getTeam
};
