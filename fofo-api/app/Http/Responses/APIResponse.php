<?php

namespace App\Http\Responses;

use Illuminate\Http\Resources\Json\JsonResource;

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
        if($data instanceof JsonResource) {
            $data = $data->toArray((request()));
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}