<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class UserTest extends TestCase
{
    use \App\Traits\TestSetup;


    /** @test **/
    public function POST_register_should_generate_a_user()
    {
        $password = 'simple-password';
        $response = $this->api('POST', '/register', [
            'password' => $password,
            'c_password' => $password,
            'email' => uniqid() . '@fezf.com',
            'name' => 'basicPseudo',
        ]);

        $response->assertJsonStructure([
            'success',
            'data' => [
                'user',
                'access_token'
            ]
        ])->assertJson(['success' => true]);

        $content = json_decode($response->getContent());
        $user = \App\User::find($content->data->user->id);
        $this->cleanable($user);

        $this->assertNotEmpty($user);

    }

    /** @test **/
    public function POST_register_on_invalid_request_should_return_an_error()
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

        $password = 'simple-password';
        $validate($this->api('POST', '/register', [
            'password' => $password,
            'c_password' => $password,
            'email' => uniqid() . '@fezf.com',
        ]), [
            'name'
        ]);

        $validate($this->api('POST', '/register', [
            'password' => $password,
            'c_password' => 'different-password',
            'email' => uniqid() . '@fezf.com',
            'name' => uniqid()
        ]), [
            'c_password'
        ]);

        $validate($this->api('POST', '/register'), [
            'password',
            'c_password',
            'email',
            'name'
        ]);

        $validate($this->api('POST', '/register', [
            'password' => $password,
            'c_password' => $password,
            'email' => uniqid() . '@missingdot',
            'name' => uniqid()
        ]), [
            'email',
        ]);

    }

    /** @test **/
    public function GET_me_should_contain_a_user()
    {
        $response = $this->withAuth()->api('GET', '/me');

        $response->assertJsonStructure([
            'success',
            'data'
        ])->assertJson(['success' => true]);
    }

    /** @test **/
    public function GET_me_should_be_invalid_without_authorization()
    {
        $response = $this->api('GET', '/me');

        $response->assertJson([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHENTICATED'
            ]
        ]);
    }


}
