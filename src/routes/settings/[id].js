import data from '$lib/mock_data.json';

export async function get({ params }) {
	//pulls as an array, send first item from array
	const user = data.users.filter((i) => i.user_id == params.id);
	const company = data.company.filter((c) => user[0].company_id === c.company_id);
	const team = data.users.filter((u) => u.company_id === company[0].company_id);
	console.log({ user, company, team });
	return {
		body: {
			user: user[0],
			company: company[0],
			team
		}
	};
}
