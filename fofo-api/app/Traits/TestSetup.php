<?php

namespace App\Traits;

trait TestSetup
{
    protected $user;
    protected $cleans = [];

    protected function setUp()
    {
        parent::setUp();

        $user = factory(\App\User::class)->create();
        $this->accessToken = $user->createToken(config('app.name'))->accessToken;
        $this->cleanable($user);
    }

    protected function tearDown()
    {
        foreach ($this->cleans as $target)
        {
            $target->delete();
        }

        parent::tearDown();
    }

    protected function cleanable($o)
    {
        if(!isset($o)) {
            return;
        }

        $this->cleans[] = $o;
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

    protected function withAuth()
    {
        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->accessToken,
        ]);
    }
}