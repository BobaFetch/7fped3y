import data from '$lib/mock_data.json';
import db from '$lib/db';

export async function get({ params }) {
	//pulls as an array, send first item from array
	const user = db
		.prepare(
			`SELECT users.*, companies.name company FROM users LEFT JOIN companies ON users.company_id = companies.company_id WHERE users.user_id = ${params.id}`
		)
		.all();

	const team = db
		.prepare(
			`SELECT users.* FROM companies LEFT JOIN users on users.company_id = companies.company_id WHERE companies.company_id = ${user[0].company_id}`
		)
		.all();
	// console.log(team);
	return {
		body: {
			user: user[0],
			team
		}
	};
}
