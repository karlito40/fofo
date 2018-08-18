<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class APIController extends Controller
{
    protected function res($data, $status = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data
        ], $status);
    }

    public function err($data, $status = 200)
    {
        return response()->json([
            'success' => false,
            'error' => $data,
        ], $status);
    }
}