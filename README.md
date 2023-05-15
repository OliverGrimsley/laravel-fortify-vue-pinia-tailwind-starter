# Laravel Fortify Vue Pinia Tailwind Starter

I did not want to use Intertia or Livewire, and I could not find a Fortify only Vue template fully implemented with two factor authentication, email and password verification etc. This template is an opinionated starter - using Laravel, Fortify, Vue, Vue-Router, Pinia and Tailwind, with a minimalist base layout. Two factor and email verification fully implemented.

Even if you dont use this, hopefully this would help you get a Vue only front end going with Fortify faster - without Inertia or Livewire.

Assumptions/dependencies:

- the javascript is served by the same server as the backend (monolith/session based)
- Configured to require a registration key (see example `example.env` file) - meaning, the initial user must also add this key - in my apps public registration is generally not permitted - this requirement could be removed. This could also be changed to use a signed URL and dynamic registration key
- assumes you have some local server running (I use [Valet](https://laravel.com/docs/10.x/valet))
- this does not implement a Teams feature, or authorization system (it is already opinionated enough)
- Uses [Ziggy](https://github.com/tighten/ziggy) to publish routes (and uses them in the Vue Router) - you might not like this and/or want to not publish all endpoints
- Uses `<script setup lang="ts"></script>`
- Uses a [Pinia](https://pinia.vuejs.org/) authstore
- implements a [Mitt](https://github.com/developit/mitt) event bus on the `window`

## Install

Clone the repo

run `npm install` and `composer install`

Copy the `env.example` file to `.env`

Run `php artisan key:generate`

Configure your database in the `.env` file

Run `php artisan migrate`

If you are not using [Valet](https://laravel.com/docs/10.x/valet), you might need to edit `vite.config.js` as it assumes this is being served locally in development on a Valet server.

(Assuming server is running and serving files from the directory) run `npm run build` to build the assets or `npm run dev` to start the Vite dev server.

## Testing

Run `php artisan test` (or `php artisan test --coverage`) in the command line.

## next steps

You will probably want to implement an admin panel and authorization, and possibly passwordless login as well as mandatory 2FA etc.

My actual application implements a backend admin panel to require 2FA for defined users, implements Bouncer for permissions and authorization etc.

## Not done / to do 

- enhance tests (base testing is working)
- responsive design

## License

This template is open source licensed under the [MIT license](https://opensource.org/licenses/MIT).
