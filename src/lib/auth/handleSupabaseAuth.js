// src/hooks.server.ts
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * @param {PUBLIC_SUPABASE_URL: string, PUBLIC_SUPABASE_ANON_KEY: string} config
 * @returns
 */
const auth = (config) => {
	return async ({ event, resolve }) => {
		event.locals.supabase = createSupabaseServerClient({
			supabaseUrl: config.PUBLIC_SUPABASE_URL,
			supabaseKey: config.PUBLIC_SUPABASE_ANON_KEY,
			event
		});

		// heper function to get session in locals
		event.locals.getSession = async () => {
			const {
				data: { session }
			} = await event.locals.supabase.auth.getSession();
			return session;
		};

		return resolve(event, {
			filterSerializedResponseHeaders(name) {
				return name === 'content-range';
			}
		});
	};
};

const callback = async ({ event, resolve }) => {
	if (event.url.pathname === '/auth/callback') {
		const code = event.url.searchParams.get('code');

		if (code) {
			await event.locals.supabase.auth.exchangeCodeForSession(code);
		}

		throw redirect(303, '/');
	}

	return resolve(event);
};

/**
 *
 * @param {string[]} routes
 * @param {string?} redirectURL
 * @returns
 */
const protect = (routes, redirectURL) => {
	return async ({ event, resolve }) => {
		const found = routes.filter((route) => event.url.pathname.startsWith(route));

		// protect requests to all routes that start with /protected-routes
		if (found.length > 0) {
			const session = await event.locals.getSession();

			if (!session) {
				// the user is not signed in
				throw redirect(303, `${redirectURL ?? '/auth/signIn'}?redirectURL=${event.url.pathname}`);
			}
		}

		return resolve(event);
	};
};

/**
 * @param {PUBLIC_SUPABASE_URL: string, PUBLIC_SUPABASE_ANON_KEY: string} config
 * @param {string[]} routes
 * @param {string?} redirectURL
 * @returns
 */
export const handleSupabaseAuth = (config, routes, redirectURL) => {
	return sequence(auth, callback, protect(routes, redirectURL));
};
