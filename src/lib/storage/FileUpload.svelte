<script>
	import { createEventDispatcher } from 'svelte';
	import { supacool } from '../supacool.js';

	/**
	 * Your storage name
	 */
	export let name = '';

	/**
	 * without the '/' at the end
	 */
	export let path = undefined;

	const dispatch = createEventDispatcher();

	function dispatchSuccess() {
		dispatch('success', detail);
	}

	const upload = async (e) => {
		const avatarFile = e.target.files[0];
		const whereToUpload = [];
		if (path) {
			whereToUpload.push(path);
		}

		// Let's add the date to avoid collision (as recommanded by supabase)
		whereToUpload.push(new Date().toISOString() + '_' + avatarFile.name);

		const { data, error } = await $supacool.s.storage
			.from(name)
			.upload(whereToUpload.join('/'), avatarFile);

		if (data) {
			dispatchSuccess(data);
		}
		// TODO nice ui
		console.log(`error`, error);
	};
</script>

<input type="file" on:change={upload} />
