#!/bin/bash

if [[ `git status --porcelain` ]]; then
  echo "Please, commit your changes before executing this";
  exit 1
fi

DATE=`date +%F_%H-%M-%S`
DEPLOY_BRANCH="deploy-${DATE}"
git checkout -b ${DEPLOY_BRANCH}

php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:clear

cp .env.production .env

echo "" > ./storage/logs/laravel.log 

eb deploy

git checkout master
git branch -d ${DEPLOY_BRANCH}