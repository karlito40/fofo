<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class UsersTableSeeder extends Seeder
{

    public function run()
    {
        Log::debug('UsersTableSeeder::run');
        factory(App\User::class, 40)->create();
    }
}
