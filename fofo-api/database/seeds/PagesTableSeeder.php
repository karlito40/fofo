<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class PagesTableSeeder extends Seeder
{
    use App\Traits\DependenciesSeeder;

    protected $dependencies = [
        'sites' => [
            'Model' => App\Models\Site::class,
            'Seeder' => SitesTableSeeder::class,
        ],
    ];

    public function runWithDeps()
    {
        $this->sites->each(function($site) {
            $pages = factory(App\Models\Page::class, rand(5, 15))->make();

            $pages->each(function($page) use($site) {
                $site->pages()->save($page);
            });
        });
    }

}
