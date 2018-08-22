<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class LoginTest extends TestCase
{
    use \App\Traits\TestSetup;

    /** @test **/
    public function POST_login_should_generate_a_token()
    {
        $password = 'my-testing-password';
        $validUser = factory(\App\User::class)->create([
            'password' => Hash::make($password)
        ]);
        $this->cleanable($validUser);

        $response = $this->api('POST', '/login', [
            'email' => $validUser->email,
            'password' => $password
        ]);

        $response->assertJsonStructure([
            'success',
            'data' => [
                'user',
                'access_token'
            ]
        ])->assertJson(['success' => true]);

    }

    /**
     * @test
     *
     * phpunit --filter POST_login_on_invalid_credentials_should_contain_an_error LoginTest tests/Feature/API/LoginTest.php
     */
    public function POST_login_on_invalid_credentials_should_contain_an_error()
    {
        $validate = function($res, $code = 'INVALID_INPUTS') {
            $res->assertJson([
                'success' => false,
                'error' => [
                    'code' => $code,
                ]
            ]);
        };

        $password = 'my-testing-password';
        $validUser = factory(\App\User::class)->create([
            'password' => Hash::make($password)
        ]);
        $this->cleanable($validUser);

        $validate($this->api('POST', '/login'));

        $validate($this->api('POST', '/login', [
            'email' => $validUser->email,
            'password' => 'bad-password'
        ]), 'INVALID_CREDENTIALS');

        $validate($this->api('POST', '/login', [
            'email' => 'bad-email',
            'password' => $password
        ]));

        $validate($this->api('POST', '/login', [
            'email' => $validUser->email,
        ]));

        $validate($this->api('POST', '/login', [
            'password' => $password
        ]));
    }

    /**
     * @test
     *
     * phpunit --filter POST_logout_should_revoke_an_access_token LoginTest tests/Feature/API/LoginTest.php
     */
    public function POST_logout_should_revoke_an_access_token()
    {
        $response = $this->withAuth()->api('POST', '/logout', ['flushCache' => uniqid()]);
        $response->assertJson([
            'success' => true
        ]);

        // We flush the app to remove
        // the grant attribute cache with the route
        $this->refreshApplication();

        // Token has been revoked.
        // Next api call with restricted access should throw an error
        $response = $this->api('POST', '/logout', ['flushCache' => uniqid(), 'toto' => true]);
        $response->assertJson([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHENTICATED'
            ]
        ]);
    }

}
