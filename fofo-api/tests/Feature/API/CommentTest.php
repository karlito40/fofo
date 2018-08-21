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

        $this->cleanable([$site, $page, $comment]);

        $this->assertNotEmpty($site);
        $this->assertNotEmpty($page);
        $this->assertNotEmpty($comment);

    }

    /** @test */
    public function POST_comment_on_invalid_request_should_return_an_error()
    {
        $validate = function($res, $structure = []) {
            $res->assertJsonStructure([
                'success',
                'error' => [
                    'validator' => $structure
                ]
            ])->assertJson([
                'success' => false,
                'error' => [
                    'code' => 'INVALID_INPUTS',
                ]
            ]);
        };

        $site = factory(\App\Models\Site::class)->make();
        $page = factory(\App\Models\Page::class)->make();
        $comment = factory(\App\Models\Comment::class)->make();

        $validate($this->withAuth()->api('POST', '/comment', [
        ]), [
            'address',
            'content'
        ]);

        $validate($this->withAuth()->api('POST', '/comment', [
            'content' => '',
            'address' => 'domain.com/path.html'
        ]), [
            'content'
        ]);

        $validate($this->withAuth()->api('POST', '/comment', [
            'address' => 'domain.com/path.html'
        ]), [
            'content'
        ]);

        $validate($this->withAuth()->api('POST', '/comment', [
            'content' => 'simple-content',
        ]), [
            'address'
        ]);

    }

    /** @test */
    public function POST_comment_should_be_invalid_without_authorization()
    {
        $response = $this->api('POST', '/comment');

        $response->assertJson([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHENTICATED'
            ]
        ]);
    }

    /** @test */
    public function DELETE_comment_should_be_remove()
    {
        $comment = $this->createComment();

        $response = $this->withAuth()->api('DELETE', '/comment/' . $comment->id);

        $response->assertJsonStructure([
            'success',
            'data' => [
                'deleted_at',
            ]
        ])->assertJson(['success' => true]);

        $this->assertEmpty(\App\Models\Comment::find($comment->id));
    }

    /** @test */
    public function DELETE_comment_shouldnt_be_remove_by_a_foreigner()
    {
        $comment = $this->createComment();

        $foreigner = factory(\App\User::class)->create();
        $this->cleanable($foreigner);

        $response = $this->withAuth($foreigner)->api('DELETE', '/comment/' . $comment->id);

        $response->assertJson([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHORIZED'
            ]
        ]);

        $this->assertNotEmpty(\App\Models\Comment::find($comment->id));
    }

    protected function createComment($withUser = null)
    {

        $user = (!isset($withUser))
            ? $this->user
            : $withUser;
        $site = factory(\App\Models\Site::class)->create();
        $page = factory(\App\Models\Page::class)->make();
        $site->pages()->save($page);

        $comment = factory(\App\Models\Comment::class)->make();
        $comment->user()->associate($user);
        $page->comments()->save($comment);

        $this->cleanable([$user, $site, $comment]);

        return $comment;
    }
}
