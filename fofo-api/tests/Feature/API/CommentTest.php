<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    use \App\Traits\TestSetup;

    /** @test */
    public function POST_comment_should_be_bind_to_a_page()
    {
        $site = factory(\App\Models\Site::class)->make();
        $page = factory(\App\Models\Page::class)->make();
        $comment = factory(\App\Models\Comment::class)->make();

        $response = $this->withAuth()->api('POST', '/comment', [
            'content' => $comment->content,
            'address' => $site->domain . '/' . $page->uri
        ]);

        $response
            ->assertJsonStructure([
                'success',
                'data' => [
                    'comment',
                    'page',
                    'site'
                ]
            ])
            ->assertJson(['success' => true]);

        $content = json_decode($response->getContent());

        $site = \App\Models\Site::find($content->data->site->id);
        $page = \App\Models\Page::find($content->data->page->id);
        $comment = \App\Models\Comment::find($content->data->comment->id);

        $this->cleanable($site);
        $this->cleanable($page);
        $this->cleanable($comment);

        $this->assertNotEmpty($site);
        $this->assertNotEmpty($page);
        $this->assertNotEmpty($comment);

    }
}
