<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Site::class, function (Faker $faker) {
    return [
        'domain' => uniqid() . '.' . rand(0, 100000) . '.' . $faker->unique()->domainName,
    ];
});
