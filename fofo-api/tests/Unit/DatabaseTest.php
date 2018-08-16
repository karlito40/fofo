<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DatabaseTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testSchema()
    {
        $user = factory(\App\User::class)->create();

        $this->assertDatabaseHas('users' , [
            'id' => $user->id
        ]);

        $site = factory(\App\Models\Site::class)->create();

        $this->assertDatabaseHas('sites' , [
            'id' => $site->id
        ]);

        $page = factory(\App\Models\Page::class)->make();
        $site->pages()->save($page);

        $this->assertDatabaseHas('pages' , [
            'id' => $page->id
        ]);

        $highlight = factory(\App\Models\Highlight::class)->make();
        $highlight->user()->associate($user);
        $highlight->page()->associate($page);
        $highlight->save();

        $this->assertDatabaseHas('highlights' , [
            'id' => $highlight->id
        ]);

        $comment = factory(\App\Models\Comment::class)->make();
        $comment->user()->associate($user);
        // $page->comments()->save($comment);
        $comment->commentable()->page()->associate($page);
        $comment->save();

        $this->assertDatabaseHas('comments' , [
            'id' => $comment->id
        ]);

        $user->delete();
        $site->delete();
    }

}
