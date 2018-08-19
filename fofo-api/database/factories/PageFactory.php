<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Page::class, function (Faker $faker) {
    // $url = parse_url($faker->unique()->url);
    // $uri = (isset($url['path'])) ? $url['path'] : '/';

    return [
        'uri' => uniqid() . '.test'
    ];
});
