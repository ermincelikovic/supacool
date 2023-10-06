<script>
	import { invalidateAll } from '$app/navigation';

	/** @type{import('@supabase/supabase-js').SupabaseClient} */
	export let supabase;

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		invalidateAll();
	};
</script>

<button on:click={handleSignOut}>Sign out</button>
