<?php

namespace App\Traits;

trait TestSetup
{
    protected $user;
    protected $cleans = [];

    protected function setUp()
    {
        parent::setUp();

        $this->user = factory(\App\User::class)->create();
        $this->user->createToken(config('app.name'))->accessToken;
        $this->cleanable($this->user);
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
        $this->cleans[] = $o;
    }
}