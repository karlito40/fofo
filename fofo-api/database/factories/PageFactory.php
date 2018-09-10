<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Page::class, function (Faker $faker) {
    return [
        'uri' => uniqid() . '.test',
        'title' => $faker->text
    ];
});
