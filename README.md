# Welcome to supacool!

🚧🚧🚧

## To to use it?

First, you need to install it:
```bash
npm add supacool -D
```

Then, you have a few configs to do: 
1/ hooks.server.ts
add the seq

2/ setup your +layout.server.ts...

3/ init your store in the root +layout.svelte...

4/ create a /routes/auth/signup/+page.svelte
and paste 
```
<script>
  import {SignUp} from 'supacool/auth'
</script>

<SignUp />
```

5/ create a /routes/auth/signin/+page.svelte
and paste 
```
<script>
  import {SignIn} from 'supacool/auth'
</script>

<SignIn />
```