<?php

namespace App\Utils;


use App\Exceptions\InvalidCredentialsException;

class OAuthProxy
{
    public function __construct(RouteConsumer $routeConsumer)
    {
        $this->routeConsumer = $routeConsumer;
    }

    public function login($email, $password)
    {
        $response = $this->routeConsumer->call('POST', '/oauth/token', [
            'grant_type' => 'password',
            'client_id' => config('oauth.proxy.client_id'),
            'client_secret' => config('oauth.proxy.client_secret'),
            'username' => $email,
            'password' => $password
        ]);

        if(!$response->isSuccessful()) {
            throw new InvalidCredentialsException('Invalid credentials');
        }

        return json_decode($response->getContent(), true);

    }
}