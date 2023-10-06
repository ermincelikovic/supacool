# Welcome to supacool!

🚧🚧🚧

## To to use it?

First, you need to install it:
```bash
npm add supacool -D
```

Then, you have a few configs to do:
1. Add your supabase env variables to .env or .env.local
```
PUBLIC_SUPABASE_URL=https://your-url.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-key
```

2. Create hooks.server.js
```js
import { handleSupabaseAuth } from 'supacool/auth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(
    handleSupabaseAuth(['/app'])
);
```

3. setup your +layout.server.js
```js
export const load = (async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
});
```

4. init your store in the root +layout.svelte
```svelte
<script>
  import {SignUp} from 'supacool/auth'
</script>

<SignUp />
```

5. create a /routes/auth/signup/+page.svelte
```svelte
<script>
  import {SignUp} from 'supacool/auth'
</script>

<SignUp />
```

6. create a /routes/auth/signin/+page.svelte
```svelte
<script>
  import {SignIn} from 'supacool/auth'
</script>

<SignIn />
```