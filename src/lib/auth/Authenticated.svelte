<script>
	import { supacool } from '../supacool.js';
</script>

{#if $supacool.user}
	<slot />
{/if}
