export type SupacoolStore = {
	s: SupabaseClient | null;
	user: {
		id: string;
		name: string;
		avatar_url: string;
	} | null;
};
