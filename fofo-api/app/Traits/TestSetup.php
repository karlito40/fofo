<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait TestSetup
{
    protected $user;
    protected $cleans = [];

    protected function setUp()
    {
        parent::setUp();

        $this->user = factory(\App\User::class)->create();
        $this->accessToken = $this->user->createToken(config('app.name'))->accessToken;
        $this->cleanable($this->user);
    }

    protected function tearDown()
    {
        foreach ($this->cleans as $target)
        {
            $target->forceDelete();
        }

        parent::tearDown();
    }

    protected function cleanable($o)
    {
        if(!isset($o)) {
            return;
        }

        if(!is_array($o)) {
            $o = [$o];
        }

        $this->cleans = array_merge($this->cleans, $o);
    }

    /**
     * Call the given URI with a JSON request.
     *
     * @param  string  $method
     * @param  string  $uri
     * @param  array  $data
     * @param  array  $headers
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function api()
    {
        $args = func_get_args();
        $args[1] = '/api/v1' . $args[1];

        return call_user_func_array([$this, 'json'], $args);
    }

    protected function withAuth($withUser = null)
    {
        $token = $this->accessToken;
        if(isset($withUser)) {
            $token = $withUser->createToken(config('app.name'))->accessToken;
        }

        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ]);
    }


    public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
    {
        $res = parent::call($method, $uri, $parameters, $cookies, $files, $server, $content);
        $this->flushHeaders();
        return $res;
    }

}