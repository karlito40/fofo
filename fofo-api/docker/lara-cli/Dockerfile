FROM php:cli

RUN apt-get update -y && apt-get install -y openssl zip unzip git libpq-dev
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_mysql

COPY . /var/www/fofo-api
WORKDIR /var/www/fofo-api
