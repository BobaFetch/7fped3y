export async function get({ url, locals }) {
	locals.authenticated = null;

	return {
		status: 302,
		headers: {
			location: '/auth',
			'set-cookie': [`authenticated=; Path=/; HttpOnly;`]
		}
	};
}
