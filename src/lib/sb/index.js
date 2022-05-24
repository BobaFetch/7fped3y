import {
	deleteContact,
	getAllContacts,
	getContactById,
	getCreators,
	getSocials
} from '$lib/sb/contacts';
import {
	getDeals,
	getDealById,
	getDealsByContact,
	getDeliverablesByDealId,
	addDeal,
	updateDeal,
	addDeliverables,
	deleteDealById,
	deleteDeliverablesByDealId,
	deleteDeliverableById
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
	getDeliverablesByDealId,
	addDeal,
	updateDeal,
	addDeliverables,
	deleteDealById,
	deleteDeliverablesByDealId,
	deleteDeliverableById,
	getAllUsers,
	getUserById,
	getTeam,
	deleteContact
};
