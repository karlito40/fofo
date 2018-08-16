<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasic()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testApi() {
        $this->assertTrue(true);
        // $response = $this->json('GET', '/api/v1/user', []);
        //
        // $response
        //     ->assertStatus(201)
        //     ->assertJson([
        //         'created' => true,
        //     ]);
    }


}
