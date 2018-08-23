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
        $data = static::transformData($data);

        return static::okRaw([
            'success' => true,
            'data' => $data
        ]);
    }

    public static function okRaw($data)
    {
        $data = static::transformData($data);

        return response()->json($data);
    }

    public static function transformData($data)
    {
        if($data instanceof JsonResource) {
            $data = $data->toArray((request()));
        }

        return $data;
    }
}