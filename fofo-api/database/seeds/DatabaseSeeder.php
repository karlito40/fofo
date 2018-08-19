<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            SitesTableSeeder::class,
            PagesTableSeeder::class,
            HighlightsTableSeeder::class,
            CommentsTableSeeder::class,
        ]);
    }

}
