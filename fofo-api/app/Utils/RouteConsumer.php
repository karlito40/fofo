<?php

namespace App\Utils;

use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpFoundation\Response;

class RouteConsumer
{


    /**
     * @param $method
     * @param $route
     * @param array $data
     * @param array $headers
     * @return Response
     * @throws \Exception
     */
    public function call($method, $route, $data = [], $headers = [])
    {
        $request = Request::create($route, $method, $data);
        foreach($headers as $key => $value)
        {
            $request->headers->set($key, $value);
        }

        return app()->handle($request);
    }

}