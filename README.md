Ever dream to discuss and share your opinion with people browsing the same page as you ? 


- No reviews on Netflix anymore ? Fine, just open Fofo and discover what others are saying.
- No comment section on this debatable news ? Fine, just open Fofo and share your feelings on it.

---

**Fofo is a work in progress. Feel free to contribute and experiment with me.**

---

*Working prototype in action*

<figure><img src="https://blog.karlidev.fr/images/web-extension/sidebar-panel.png" width="650">
<figcaption>Fofo dock to the left of Wikipedia</figcaption>
</figure>

<figure><img src="https://blog.karlidev.fr/images/web-extension/bottom-panel.png" width="650">
<figcaption>Fofo dock to the bottom of Wikipedia</figcaption>
</figure>

## How to build the API

### With docker, the easiest solution

The project comes with a one liner command which provide an interactive way to build everything from the database to nginx.

`cd fofo-api && npm run laravel`

Next, create the .env file

`cp .env.example .env`

Add your fresh oauth client_id and secret key into it.

```
OAUTH_PASSWORD_CLIENT_ID=2
OAUTH_PASSWORD_CLIENT_SECRET=YOUR_SECRET_KEY_HERE
```

Make sure to update your `/etc/hosts`.

` 127.0.0.1 fofo-api.local`

If you want some data into your database go with the following script.

`npm run db:seed`

### With homestead

First make sure to follow the [laravel installation](https://laravel.com/docs/5.6/homestead) and install all the dependencies.

`cd fofo-api && composer install`

Next, create the database.

`php artisan migrate`

Generate oauth tables and encryption keys.

`php artisan passport:install`

Generate a password oauth client. 

`php artisan passport:client --password`

Create the .env file

`cp .env.example .env`

Add your fresh oauth client_id and secret key in it.

```
OAUTH_PASSWORD_CLIENT_ID=2
OAUTH_PASSWORD_CLIENT_SECRET=YOUR_SECRET_KEY_HERE
```


Follow this [tutorial](https://medium.com/@adnanxteam/how-to-setup-https-with-laravel-homestead-ad7915470fa8) to make the https works on your server. Next, go to https://your-local-api-domain and accept the certificate.

Now, run the seeder.

`php artisan db:seed`

#### Postman

You may import `fofo-api.postman_collection.json` into postman to have an understanding of the api.

---

**Do not hesitate to contact me if you encounter any issues with this procedure**

---

## How to build the Front

Create the .env file

`cp .env.example .env`

Launch the project from the root directory (not fofo-front)

`npm run start-front`

## How to build the WebExtension

From the root directory.

`npm run build-web-ext`

Next, go to **[chrome://extensions/](chrome://extensions/)**, active the developer mode and load the unzip extension from `fofo-web-ext/dist`
