Fofo is a WebExtension which aim to create communities around websites. Ever dream to discuss and share your opinion with people browsing the same page as you ? 


- No reviews on Netflix ? Fine, just open Fofo on your Netflix movie and browse other people reaction.
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

## Usage & Installation

### Api

First make sure to follow the [laravel installation](https://laravel.com/docs/5.6/homestead) and install all the dependencies.

`cd fofo-api && composer install`

Next, create the database.

`php artisan migrate`

Generate the oauth tables and encryption keys.

`php artisan passport:install`

Generate a password oauth client. 

`php artisan passport:client --password`

Create the .env

`cp .env.development .env`

Edit and add to `.env` your fresh oauth client_id and secret.

```
OAUTH_PASSWORD_CLIENT_ID=2
OAUTH_PASSWORD_CLIENT_SECRET=YOUR_SECRET_KEY_HERE
```

Follow this [tutorial](https://medium.com/@adnanxteam/how-to-setup-https-with-laravel-homestead-ad7915470fa8) to make the https works on your server. Next, go to https://your-local-api-domain and accept the certificate.

Now, run the seeder to add some data to your database.

`php artisan db:seed`

You may import `fofo-api.postman_collection.json` into postman to check the api.

---

**Do not hesitate to contact me if you encounter any issues with this procedure**

---

### Front

The front can be run independently from the WebExtension. 

`cd fofo-front && npm run start`

Alternatively, you may execute the script from the root directory to achieve the same.

`npm run start-front`

### WebExtension

Build the project from the root directory

`npm run build-web-ext`

Next, go to **[chrome://extensions/](chrome://extensions/)**, active the developer mode and load the unzip extension from `fofo-web-ext/dist`


## Some work to do...

- [ ] I18N
- [ ] Refactoring & Documentation
- [ ] Automate test on fofo-front & fofo-web-ext
- [ ] Create a logo and switch to a different name
- [ ] Create a Markdown editor
- [ ] Animations
- [ ] Like a post
- [ ] Tag someone on a post
- [ ] Add a profile page   
- [ ] Export to Firefox
- [ ] Deploy
