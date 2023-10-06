# How to Auth:

## Provided in "supacool/auth"

- Hook => handleSupabaseAuth to be used in `hooks.server.ts`
  - Pure auth
  - Manage callback
  - Protect routes
- Store => supaCool, to be set in the root +layout.svelte
- Authenticated.svelte, to be used like this

```html
<Authenticated> When logged in </Authenticated>
```

- SignOut.svelte to log out a user.

## To setup outside

- root +layout.server.ts

  - Provide the session on other pages

- root +layout.ts

  - Create & Generate the supabase session

- +layout.svelte
  - Give the session to a store that will be use in different places

## Flow & Auth in your app

Check examples here

- [x] create your own `/routes/auth/signUp.svelte`
- [x] create your own `/routes/auth/signIn.svelte`
