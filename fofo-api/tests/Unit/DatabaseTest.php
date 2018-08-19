<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;


class DatabaseTest extends TestCase
{
    /** @test **/
    public function db_should_have_a_working_schema()
    {
        $NB_HIGHLIGHT_IN_PAGE = 2;
        $NB_COMMENTS_IN_HIGHLIGHT = 2;
        $NB_COMMENTS_IN_PAGE = 3;

        $user = factory(\App\User::class)->create();

        $this->assertDatabaseHas($user->getTable() , [
            'id' => $user->id
        ]);

        $site = factory(\App\Models\Site::class)->create();

        $this->assertDatabaseHas($site->getTable(), [
            'id' => $site->id
        ]);

        $page = factory(\App\Models\Page::class)->make();
        $site->pages()->save($page);

        $this->assertDatabaseHas($page->getTable(), [
            'id' => $page->id
        ]);

        $highlights = factory(\App\Models\Highlight::class, $NB_HIGHLIGHT_IN_PAGE)->make();
        $highlights->each(function($highlight) use($user, $page, $NB_COMMENTS_IN_HIGHLIGHT)
        {
            $highlight->user()->associate($user);
            $highlight->page()->associate($page);
            $highlight->save();

            $this->assertDatabaseHas($highlight->getTable(), [
                'id' => $highlight->id
            ]);

            $this->addComment($user, $highlight, $NB_COMMENTS_IN_HIGHLIGHT);
        });

        $comments = factory(\App\Models\Comment::class, $NB_COMMENTS_IN_PAGE)->make();
        $comments->each(function($comment) use($user, $page)
        {
            $comment->user()->associate($user);
            // $page->comments()->save($comment);
            $comment->commentable()->page()->associate($page);
            $comment->save();

            $this->assertDatabaseHas($comment->getTable() , [
                'id' => $comment->id
            ]);
        });

        $checkPage = \App\Models\Page::find($page->id);

        $this->assertCount($NB_COMMENTS_IN_PAGE, $checkPage->comments, 'Test: $NB_COMMENTS_IN_PAGE');
        $this->assertCount($NB_HIGHLIGHT_IN_PAGE, $checkPage->highlights, 'Test: $NB_HIGHLIGHT_IN_PAGE');

        $checkHighlight = \App\Models\Highlight::find($highlights[0]->id);
        $this->assertCount($NB_COMMENTS_IN_HIGHLIGHT, $checkHighlight->comments, 'Test: $NB_COMMENTS_IN_HIGHLIGHT');

        $nbMessagesExpected = $NB_COMMENTS_IN_PAGE + ($NB_HIGHLIGHT_IN_PAGE * $NB_COMMENTS_IN_HIGHLIGHT);
        $this->assertEquals($nbMessagesExpected, \App\Models\Comment::concatAll($page->id)->count(), 'Test: total expected messages');

        $user->delete();
        $site->delete();
    }

    private function addComment($user, $source, $size = 1)
    {
        for($i = 0; $i < $size; $i++) {
            $comment = factory(\App\Models\Comment::class)->make();
            $comment->user()->associate($user);
            $source->comments()->save($comment);
        }

    }

}
