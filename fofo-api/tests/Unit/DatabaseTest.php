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
            'id' => $page->id,
            'site_id' => $site->id
        ]);

        $highlight = factory(\App\Models\Highlight::class)->make();
        $highlight->user()->associate($user);
        $highlight->page()->associate($page);
        $highlight->save();

        $this->assertDatabaseHas($highlight->getTable(), [
            'id' => $highlight->id,
            'user_id' => $user->id,
            'page_id' => $page->id,
        ]);

        $commentOnHighlight = $this->addComment($user, $highlight, 1)->first();

        $this->assertDatabaseHas($commentOnHighlight->getTable(), [
            'id' => $commentOnHighlight->id,
            'commentable_id' => $highlight->id,
            'commentable_type' => \App\Models\Highlight::class,
        ]);

        $commentOnPage = $this->addComment($user, $page, 1)->first();
        $this->assertDatabaseHas($commentOnPage->getTable(), [
            'id' => $commentOnPage->id,
            'commentable_id' => $page->id,
            'commentable_type' => \App\Models\Page::class,
        ]);

        $user->forceDelete();
        $site->forceDelete();
    }

    /** @test */
    public function it_should_contains_comments_from_page_and_highlights()
    {
        $NB_HIGHLIGHTS_IN_PAGE = 2;
        $NB_COMMENTS_IN_HIGHLIGHT = 2;
        $NB_COMMENTS_IN_PAGE = 3;

        $user = factory(\App\User::class)->create();
        $site = factory(\App\Models\Site::class)->create();
        $page = factory(\App\Models\Page::class)->make();

        $site->pages()->save($page);

        $highlights = factory(\App\Models\Highlight::class, $NB_HIGHLIGHTS_IN_PAGE)->make();
        $highlights->each(function($highlight) use($user, $page, $NB_COMMENTS_IN_HIGHLIGHT)
        {
            $highlight->user()->associate($user);
            $highlight->page()->associate($page);
            $highlight->save();

            $this->addComment($user, $highlight, $NB_COMMENTS_IN_HIGHLIGHT);
        });

        $this->addComment($user, $page, $NB_COMMENTS_IN_PAGE);
        $checkPage = \App\Models\Page::find($page->id);

        $this->assertCount($NB_COMMENTS_IN_PAGE, $checkPage->comments, 'Test: $NB_COMMENTS_IN_PAGE');
        $this->assertCount($NB_HIGHLIGHTS_IN_PAGE, $checkPage->highlights, 'Test: $NB_HIGHLIGHT_IN_PAGE');

        $checkHighlight = \App\Models\Highlight::find($highlights[0]->id);
        $this->assertCount($NB_COMMENTS_IN_HIGHLIGHT, $checkHighlight->comments, 'Test: $NB_COMMENTS_IN_HIGHLIGHT');

        $nbMessagesExpected = $NB_COMMENTS_IN_PAGE + ($NB_HIGHLIGHTS_IN_PAGE * $NB_COMMENTS_IN_HIGHLIGHT);
        $this->assertEquals($nbMessagesExpected, \App\Models\Comment::concatAll($page->id)->count(), 'Test: total expected messages');

        $user->forceDelete();
        $site->forceDelete();
    }

    private function addComment($user, $source, $size = 1)
    {
        $res = collect([]);
        for($i = 0; $i < $size; $i++) {
            $comment = factory(\App\Models\Comment::class)->make();
            $comment->user()->associate($user);
            $source->comments()->save($comment);
            $res->push($comment);
        }

        return $res;
    }

}
