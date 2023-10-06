/** @typedef {import('@supabase/supabase-js').Session} Session */
/** @typedef {import('@supabase/supabase-js').SupabaseClient} SupabaseClient */
/** @typedef {import('./supacool').SupacoolStore} SupacoolStore */

/**
 * @param {Session | null} session
 * @returns {void} Replace with the actual return type if applicable
 */
const toUser = (session) => {
	if (!session) {
		return null;
	}
	return {
		id: session.user.id,
		name: session.user.user_metadata.preferred_username ?? session.user.email?.split('@')[0],
		avatar_url: session.user.user_metadata.avatar_url
	};
};

function createSupaCool() {
	/** @type{import('svelte/store').Writable<SupacoolStore>} */
	const store = writable({ s: null, user: null });
	const { subscribe, set, update } = store;

	/**@type{Session | null}*/
	let s = null;

	return {
		subscribe,

		/**
		 *
		 * @param {SupabaseClient} supabase
		 * @param {Session | null} session
		 */
		init: (supabase, session) => {
			s = supabase;
			set({
				s,
				user: toUser(session)
			});
		},

		/**
		 * TODO: // here or in the store?
		 * @param {Session | null} session
		 */
		refreshUser: (session) => {
			if (!session) {
				// set({null});
				update((c) => {
					return { ...c, user: null };
				});
			} else {
				update((c) => {
					return {
						...c,
						user: toUser(session)
					};
				});
			}
		},

		/**
		 * TODO: here or in the store?
		 * @param {string} name
		 * @param {string} fullPath
		 * @returns
		 */
		getImageURL: (name, fullPath) => {
			return s?.storage.from(name).getPublicUrl(fullPath).data.publicUrl;
		}
	};
}

export const supaCool = createSupaCool();
