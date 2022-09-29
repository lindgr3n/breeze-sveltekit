# Laravel Breeze - SvelteKit Edition 🦅

## Introduction

This repository is an SvelteKit implementation of the [Breeze Next](https://github.com/laravel/breeze-next) application.

This is an implementing of the [Laravel Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [SvelteKit](https://kit.svelte.dev/). All of the authentication boilerplate is already written for you - powered by [Laravel Sanctum](https://laravel.com/docs/sanctum), allowing you to quickly begin pairing your beautiful SvelteKit frontend with a powerful Laravel backend.

If you do not want to install the backend from scratch you can find the repo tested against [here](https://github.com/lindgr3n/breeze-backend-api)

## Official Documentation

### Installation

First, create a SvelteKit compatible Laravel backend by installing Laravel Breeze into a [fresh Laravel application](https://laravel.com/docs/installation) and installing Breeze's API scaffolding:

```bash
# Create the Laravel application...
laravel new sveltekit-backend

cd next-backend

# Install Breeze and dependencies...
composer require laravel/breeze

php artisan breeze:install api
```

> Note: Don't forget to create a database and set up your enviroment file to point out the databse. Also run the migrations. More info in [databases and migrations](https://laravel.com/docs/9.x/installation#databases-and-migrations)

Next, ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000`, respectively.

After defining the appropriate environment variables, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env.local` and supply the URL of your backend:

```
VITE_BACKEND_URL=http://localhost:8000
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```

> Note: Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.

### Authentication Hook

Authentication of the user is done via the `hooks` file to check if the provided cookies is valid. Here we also check if the route accessed is a guest route or a protected route.
By setting the user in the `getSession` we can access it in each page by the context `load` method to check if we are allowed to access this route together with the guest flag. This also makes us take advantage of SSR the page with correct user information.

## Security Vulnerabilities

Please review the [security policy](https://github.com/laravel/breeze-next/security/policy) on how to report security vulnerabilities.
