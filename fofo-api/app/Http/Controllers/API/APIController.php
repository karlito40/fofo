<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Responses\APIResponse;

class APIController extends Controller
{
    protected function okRaw($data)
    {
        return APIResponse::okRaw($data);
    }

    protected function ok($data)
    {
        return APIResponse::ok($data);
    }

    public function err($data, $status = 200)
    {
        return APIResponse::error($data, $status);
    }
}