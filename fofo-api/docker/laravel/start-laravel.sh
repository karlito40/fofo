#!/bin/bash
service php7.2-fpm start 
composer install
chown -R www-data:www-data /var/www
echo 'Nginx started'
nginx -g 'daemon off;'
echo 'Nginx closed !'