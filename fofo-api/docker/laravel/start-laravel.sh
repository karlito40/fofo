#!/bin/bash
service php7.2-fpm start 
composer install
chown -R www-data:www-data /var/www

echo "Starting migration..."
php artisan migrate --force
echo "Migration done!"

echo 'Nginx started'
nginx -g 'daemon off;'
echo 'Nginx closed !'