<?php

namespace Tests\Feature\API;

use App\Models\Page;
use App\Models\Site;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ActivityTest extends TestCase
{
    use \App\Traits\TestSetup;

    /**
     * @test
     *
     * phpunit --filter GET_feed_root_should_return_the_recent_global_activty ActivityTest tests/Feature/API/ActivityTest.php
     */
    public function GET_feed_root_should_return_the_recent_global_activty()
    {
        $domains = collect([
            'domain1.test',
            'domain2.test',
            'domain3.test',
        ]);

        $comments = collect([]);
        $comments->push($this->createComment($domains->first(), 'path1'));
        $comments->push($this->createComment($domains->last(), 'path2'));

        for($i = 0; $i < 5; $i++) {
            $comments->push($this->createComment($domains->random(), 'loop' . $i));
        }

        $response = $this->api('GET', '/feed');
        $content = json_decode($response->getContent());

        $response->assertJsonStructure([
            'data' => [
                [
                    'site_id',
                    'uri'
                ]
            ]
        ]);

        $comments = $comments->sortByDesc('id')
            ->groupBy('commentable_id')
            ->flatten(1);

        foreach($comments as $key => $comment) {
            $page = $content->data[$key];
            $this->assertEquals($comment->commentable_id, $page->id);
        }
    }

    /**
     * @test
     *
     * phpunit --filter GET_feed_domain_should_return_the_recent_domain_activty ActivityTest tests/Feature/API/ActivityTest.php
     */
    public function GET_feed_domain_should_return_the_recent_domain_activty()
    {
        $domain = 'simple-domain.com';

        $comments = collect([]);
        $comments->push($this->createComment($domain, 'path1'));
        $comments->push($this->createComment($domain, 'path2'));

        for($i = 0; $i < 5; $i++) {
            $comments->push($this->createComment($domain, 'loop' . $i));
        }

        $response = $this->api('GET', '/feed/' . $domain);
        $content = json_decode($response->getContent());
        $response->assertJsonStructure([
            'data' => [
                [
                    'site_id',
                    'uri'
                ]
            ]
        ]);


        $comments = $comments->sortByDesc('id')
            ->flatten(1);

        foreach($comments as $key => $comment) {
            $page = $content->data[$key];
            $this->assertEquals($comment->commentable->uri, $page->uri);
        }
    }

    /**
     * @test
     *
     * phpunit --filter GET_feed_page_should_return_the_recent_comment_for_the_given_page ActivityTest tests/Feature/API/ActivityTest.php
     */
    public function GET_feed_page_should_return_the_recent_comment_for_the_given_page()
    {
        $domain = 'simple-domain2.com';
        $uri = '/testuri';

        $comments = collect([]);

        for($i = 0; $i < 5; $i++) {
            $comments->push($this->createComment($domain, $uri));
        }

        $response = $this->api('GET', '/feed/' . $domain . $uri);

        $content = json_decode($response->getContent());
        $response->assertJsonStructure([
            'data' => [
                [
                    'user_id',
                    'content'
                ]
            ]
        ]);

        $comments = $comments->sortByDesc('id')
            ->flatten(1);

        foreach($comments as $key => $comment) {
            $this->assertEquals($comment->content, $content->data[$key]->content);
        }
    }

    protected function createComment($domain, $uri)
    {
        $site = Site::firstOrCreate([
            'domain' => $domain,
        ]);

        $page = Page::where('site_id', $site->id)
            ->where('uri', $uri)
            ->first();

        if(!$page) {
            $page = new Page([
                'uri' => $uri,
                'title' => 'Test' . $domain . $uri
            ]);

            $page->site()->associate($site);
            $page->save();
        }

        $this->cleanable($site);

        $comment = factory(\App\Models\Comment::class)->make();
        $comment->user()->associate($this->user);
        $comment->commentable()->page()->associate($page);
        $comment->save();

        $this->cleanable($comment);

        return $comment;
    }
}
