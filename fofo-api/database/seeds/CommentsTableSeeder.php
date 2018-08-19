<?php

use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
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
        ],
        'highlights' => [
            'Model' => App\Models\Highlight::class,
            'Seeder' => HighlightsTableSeeder::class,
        ]
    ];

    public function runWithDeps()
    {
        $this->addComments($this->highlights, rand(2, 5));
        $this->addComments($this->pages, rand(2, 5));
    }

    protected function addComments($sources, $nbCommentsBySrc = 1)
    {
        $sources->each(function($source) use($nbCommentsBySrc)
        {
            $comments = factory(\App\Models\Comment::class, $nbCommentsBySrc)->make();
            $comments->each(function($comment) use($source)
            {
                $comment->user()->associate($this->users->random());
                $source->comments()->save($comment);
            });

        });
    }

}
