# Frontend Ucoach

## project structure

- src/
- schemas/
  valibot schemas for the api responses, and form validation.(brand new zod alternative few bytes and faster).

- ui/

  - components => small piece that renders markup(most are client components).
  - partials => large components.
  - hooks(custom hooks that can do magic).
  - charts (upcoming).
  - providers (context providers).
  - utils (helper functions and constants for the ui purpose).

- app/
  - pages and layouts [using nextjs14 app router]
    - Layout Groups.
      - (auth)
        - login,register and forgot password pages.
      - (dashboard)
        - the dashboard pages
      - (docs)
        - test for the components.
      - (marketing)
        - landing page and pricing page.
      - (preview)
        - the widget's preview pages.[control them by url search params and embed them inside the iframe in the workshop page]

## Notes

NOTE: some of the components are not used, but can use them in the future.
NOTE02: using tailwindcss for styling, so don't need to create a lot of css files.
NOTE03: using nextjs14, so consider taking advantage of server components and api routes.
NOTE04: for the client side data fething using React Query for caching and revalidation.
NOTE05: for the forms use @react-hook-form lib and validate with valibot.

## AUTH

used next-auth lib with credentials provider, and custom login page.
the entire process involves saving the session-ucoach cookie [no matter the auth flow] once we get it server and save it on client [has cookies setting has be re-adjusted when same domain will be used in production].

## when the user considered logged in?

- if we have the session-ucoach cookie along with next-auth cookies in the browser and the server side, then the user is logged in.
- and the session-ucoach is valid. [all valid for now due to backend issues].

## when the user considered logged out?

- if we don't have the session-ucoach in the browser and the server side.[checking the cookie value in the server (in server requests) and client(in client requests)].
- if the response status code is 401 [need adjustments for role based auth].
  NOTE: to be implemented: if the user tries to remove the cookie maually from the browser we will detect it[when the window gains focus after being blured] we will check if the cookie is removed or not, if it's removed we will logout the user immediately.

## animations

regading the animations i've used framer-motion lib instead of tailwindcss-animate pulgin, it's easy to use and it's the best for react apps.
