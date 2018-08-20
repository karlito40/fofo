<?php

namespace App\Http\Responses;

class APIResponse
{
    public static function error($data)
    {
        return response()->json([
            'success' => false,
            'error' => $data,
        ]);
    }

    public static function ok($data)
    {
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}