<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Highlight::class, function (Faker $faker) {
    return [
        'location' => $faker->paragraph,
    ];
});
