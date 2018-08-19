<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class SitesTableSeeder extends Seeder
{

    public function run()
    {
        Log::debug('SiteTableSeeder::run');
        factory(App\Models\Site::class, 60)->create();
    }
}


