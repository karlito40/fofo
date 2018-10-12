#!/bin/bash
service php7.2-fpm start 
composer install
echo 'Nginx started'
nginx -g 'daemon off;'
echo 'Nginx closed !'