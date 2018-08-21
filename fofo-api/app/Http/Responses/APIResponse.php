<?php

namespace App\Http\Responses;

class APIResponse
{
    public static function error($data, $status = 200)
    {
        return response()->json([
            'success' => false,
            'error' => $data,
        ], $status);
    }

    public static function ok($data)
    {
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}