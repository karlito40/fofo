<?php

namespace App\Http\Controllers\API;

use App\Models\Page;
use App\Models\Site;
// use League\Uri\Schemes\Http;
use League\Uri;

class ActivityController extends APIController
{
    public function world()
    {
        // TODO: ActivityController::world
        return $this->res(['from' => 'world']);
    }

    /**
     * Display the most recent|active pages
     * for the given site.
     *
     * @param $host
     * @return \Illuminate\Http\JsonResponse
     */
    public function site($domain)
    {
        // TODO: ActivityController::site
        return $this->res(array_merge(compact('domain'), ['from' => 'site']));
    }

    /**
     * Display the most recent|active comment for the given page.
     *
     * `_` as uri retrieve the root page.
     *
     * @param $host
     * @param $uri
     * @return \Illuminate\Http\JsonResponse
     */
    public function page($domain, $uri)
    {
        // TODO: ActivityController::page
        return $this->res(array_merge(compact('domain', 'uri'), ['from' => 'page']));
    }

    public function address($address)
    {
        $parts = parse_url('//' . $address);

        if(!isset($parts['host'])) {
            return $this->world();
        }

        if(!isset($parts['path'])) {
            return $this->site($parts['host']);
        }

        return $this->page($parts['host'], $parts['path']);
    }
}