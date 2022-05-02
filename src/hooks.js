import cookie from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.authenticated = cookies.authenticated;

	const response = await resolve(event);

	response.headers['set-cookie'] = `authenticated=${
		event.locals.authenticated || ''
	}; Path=/; HttpOnly `;

	return response;
}

export async function getSession(request) {
	return {
		authenticated: request.locals.authenticated
	};
}
