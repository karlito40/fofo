<?php

namespace App\Utils;


class Url
{
    public static function formatAddress($address)
    {
        return parse_url('//' . $address);
    }
}