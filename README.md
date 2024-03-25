# GENIUSEE Test Task

## Clone repository

```
git clone https://github.com/OlegSyng/ucoach.git
cd ucoach
```

## Install dependencies

```
nvm use // use project version of Node.js if you are using nvm
npm install
```

## Run development server

```
npm run dev
```

## Test task


### Objective

You need to create a simple checkout form. Main goal of the task is to create good and smooth UI/UX for the end user. Also it's important to make this solution maintainable and build good architecture of the application. Don't hesitate to use third-party packages for form validation and UI libraries.

### Requirements
- Add a minimal styling for the form.
- Validate passed values.
- Log form values on successful submit.
### Contents of form
Section 1: Personal information
- First name - string, required.
- Last name - string, required.

Section 2. Contact information
- Email for receipt - string, should fit email format, optional.
- Phone numbers - an array of strings, min - 1 entry, max - 3 entries
- Country - string, required, should be a select.
- Address - string, required.

Section 3. Payment details
- Credit card - 16 digits, required.
- CVV2 code - 3 digits, required.
- Agreement with terms of use - boolean, required.

### Validation
- Validate fields on field blur and on form submit.
- Show error messages if the entered value is invalid.
- Clear error if the field had been invalid and a user passed a valid value later.

### UI/UX requirements
1. Add input masks for credit card, CVV2 code fields, email and phone field.
2. Add logic on submission failure: the app should scroll to the first invalid input and focus
on it if validation failed
3. Add async validation for the email field. For development purposes, you need to create a
mock handler that resolves a promise in 75% after 1s.
4. Each section should contain a sticky heading.
5. Add logic that prevents multiple submissions. A submit handler should resolve a
promise after 1s. The button should indicate loading state

<!-- # Frontend Dashboard

## project structure

- src/
- schemas/
  valibot schemas for the api responses, and form validation.(brand new zod alternative few bytes and faster).

- ui/
  - components => small piece that renders markup(most are client components).
  - partials => large components.
  - hooks(custom hooks that can do magic).
  - charts (need more work, but we can use it for now).
  - providers (context providers).
  - utils (helper functions and constants for the ui purpose).
  
- app/
  - pages and layouts [we are using nextjs13 app router]
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
        - the widget's preview pages.[we control them by url search params and embed them inside the iframe in the workshop page]

## Notes

NOTE: some of the components are not used, but we can use them in the future.
NOTE02: we are using tailwindcss for styling, so we don't need to create a lot of css files.
NOTE03: we are using nextjs13, so consider taking advantage of server components and api routes.
NOTE04: for the client side data fething we used swr for caching and revalidation.
NOTE05: for the forms use @formiz lib and validate with valibot.

## AUTH

i've not used any auth lib, i've created a simple auth flow with nextjs api routes and cookies.
the entire process is to save the auth_token [no matter the auth flow] once we get it from the openchat api we save it in browser.  
the problem that we want to sync the cookie with the server side ["nextjs"], so we can use it in the server side rendering.
so i created login api endpoint inside api/ dir and let nextjs to set the cookie via set-Cookie header [the same value that we set in the browser].

## when the user considered logged in?

- if we have the auth_token in the browser and the server side, then the user is logged in.
- and the auth_token is valid. [all valid for now due to backend issues].

## when the user considered logged out?

- if we don't have the auth_token in the browser and the server side.[checking the cookie value in the server (in server requests) and client(in client requests)].
- if the response status code is 401 [need adjustments for role based auth].
NOTE: if the user tries to remove the cookie maually from the browser we will detect it[when the window gains focus after being blured] we will check if the cookie is removed or not, if it's removed we will logout the user immediately.

## animations

regading the animations i've used framer-motion lib instead of tailwindcss-animate pulgin, it's easy to use and it's the best for react apps. -->