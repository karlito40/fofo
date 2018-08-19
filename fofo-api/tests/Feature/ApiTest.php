<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiTest extends TestCase
{
    use \App\Traits\TestSetup;

    /** @test **/
    public function it_should_contain_a_root_route()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }


    /*public function testApi() {

        $response = $this->json('GET', '/api/v1/user', []);

        $response
             ->assertStatus(201)
             ->assertJson([
                 'created' => true,
             ]);
    }*/


}
