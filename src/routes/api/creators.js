import { db } from '$lib/sb';

export async function get() {
	const creators = await db.getCreators();
	const socials = await db.getSocials();

	return {
		status: 200,
		body: {
			creators,
			socials
		}
	};
}
