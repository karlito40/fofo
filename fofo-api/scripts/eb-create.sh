#!/bin/bash

if [[ `git status --porcelain` ]]; then
  echo "Please, commit your changes before executing this";
  exit 1
fi

DATE=`date +%F_%H-%M-%S`
DEPLOY_BRANCH="create-env-${DATE}"
git checkout -b ${DEPLOY_BRANCH}

php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:clear

cp .env.production .env

echo "" > ./storage/laravel.log 

eb create api-prod

git stash
git checkout master
git branch -d ${DEPLOY_BRANCH}