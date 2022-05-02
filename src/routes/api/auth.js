export async function get({ url, locals }) {
	locals.authenticated = true;
	return {
		status: 302,
		headers: {
			location: '/collabs',
			'set-cookie': `authenticated=${true || ''}; Max-Age=7200; Path=/; HttpOnly;`
		}
	};
}
