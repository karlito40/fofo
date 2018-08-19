<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Log;

class HighlightsTableSeeder extends Seeder
{
    use App\Traits\DependenciesSeeder;

    protected $dependencies = [
        'users' => [
            'Model' => App\User::class,
            'Seeder' => UsersTableSeeder::class,
        ],
        'pages' => [
            'Model' => App\Models\Page::class,
            'Seeder' => PagesTableSeeder::class,
        ]
    ];

    public function runWithDeps()
    {
        $this->pages->each(function($page)
        {
            $highlights = factory(\App\Models\Highlight::class, rand(2, 5))->make();
            $highlights->each(function($highlight) use($page)
            {
                $highlight->user()->associate($this->users->random());
                $highlight->page()->associate($page);
                $highlight->save();
            });
        });
    }

}
