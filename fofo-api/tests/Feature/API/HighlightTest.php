<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HighlightTest extends TestCase
{
    use \App\Traits\TestSetup;

    /**
     * @test
     *
     * phpunit --filter POST_highlight_should_be_bind_to_a_page HighlightTest tests/Feature/API/HighlightTest.php
     */
    public function POST_highlight_should_be_bind_to_a_page()
    {
        $site = factory(\App\Models\Site::class)->make();
        $page = factory(\App\Models\Page::class)->make();
        $highlight = factory(\App\Models\Highlight::class)->make();

        $response = $this->withAuth()->api('POST', '/highlight', [
            'location' => $highlight->location,
            'content' => $highlight->content,
            'address' => $site->domain . '/' . $page->uri
        ]);

        $response
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'page' => [
                        'site'
                    ]
                ]
            ])
            ->assertJson(['success' => true]);

        $content = json_decode($response->getContent());

        $site = \App\Models\Site::find($content->data->page->site->id);
        $page = \App\Models\Page::find($content->data->page->id);
        $highlight = \App\Models\Highlight::find($content->data->id);

        $this->cleanable([$site, $page, $highlight]);

        $this->assertNotEmpty($site);
        $this->assertNotEmpty($page);
        $this->assertNotEmpty($highlight);

    }

    /**
     * @test
     *
     * phpunit --filter POST_highlight_on_invalid_request_should_return_an_error HighlightTest tests/Feature/API/HighlightTest.php
     */
    public function POST_highlight_on_invalid_request_should_return_an_error()
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
        $highlight = factory(\App\Models\Highlight::class)->make();

        $validate($this->withAuth()->api('POST', '/highlight', [
        ]), [
            'address',
            'content',
            'location'
        ]);

        $validate($this->withAuth()->api('POST', '/highlight', [
            'content' => '',
            'address' => 'domain.com/path.html'
        ]), [
            'content',
            'location'
        ]);

        $validate($this->withAuth()->api('POST', '/highlight', [
            'address' => 'domain.com/path.html'
        ]), [
            'location',
            'content'
        ]);

        $validate($this->withAuth()->api('POST', '/highlight', [
            'content' => 'simple-content',
        ]), [
            'address',
            'location'
        ]);

    }

    /**
     * @test
     *
     * phpunit --filter POST_highlight_on_invalid_request_should_return_an_error HighlightTest tests/Feature/API/HighlightTest.php
     */
    public function POST_highlight_should_be_invalid_without_authorization()
    {
        $response = $this->api('POST', '/highlight');

        $response->assertJson([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHENTICATED'
            ]
        ]);
    }

    /**
     * @test
     *
     * phpunit --filter DELETE_highlight_should_be_remove HighlightTest tests/Feature/API/HighlightTest.php
     */
    public function DELETE_highlight_should_be_remove()
    {
        $highlight = $this->createHighlight();

        $response = $this->withAuth()->api('DELETE', '/highlight/' . $highlight->id);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'deleted_at',
            ]
        ])->assertJson(['success' => true]);

        $content = json_decode($response->getContent());
        $this->assertNotEmpty($content->data->deleted_at);

        $this->assertEmpty(\App\Models\Highlight::find($highlight->id));
    }

    /**
     * @test
     *
     * phpunit --filter DELETE_highlight_shouldnt_be_remove_by_a_foreigner HighlightTest tests/Feature/API/HighlightTest.php
     */
    public function DELETE_highlight_shouldnt_be_remove_by_a_foreigner()
    {
        $highlight = $this->createHighlight();

        $foreigner = factory(\App\User::class)->create();
        $this->cleanable($foreigner);

        $response = $this->withAuth($foreigner)->api('DELETE', '/comment/' . $highlight->id);

        $response->assertJson([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHORIZED'
            ]
        ]);

        $this->assertNotEmpty(\App\Models\Comment::find($highlight->id));
    }

    protected function createHighlight($withUser = null)
    {

        $user = (!isset($withUser))
            ? $this->user
            : $withUser;
        $site = factory(\App\Models\Site::class)->create();
        $page = factory(\App\Models\Page::class)->make();
        $site->pages()->save($page);

        $highlight = factory(\App\Models\Highlight::class)->make();
        $highlight->user()->associate($user);
        $page->highlights()->save($highlight);

        $this->cleanable([$user, $site, $highlight]);

        return $highlight;
    }
}
