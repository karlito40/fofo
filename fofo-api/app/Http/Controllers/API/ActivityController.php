<?php

namespace App\Http\Controllers\API;

use App\Utils\WWWAddress;

class ActivityController extends APIController
{
    public function world()
    {
        // TODO: ActivityController::world
        return $this->ok(['from' => 'world']);
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

        $domain = WWWAddress::from($domain)->getDomain();

        return $this->ok(array_merge(compact('domain'), ['from' => 'site']));
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
        return $this->ok(array_merge(compact('domain', 'uri'), ['from' => 'page']));
    }

    public function address($url)
    {
        $address = WWWAddress::from($url);

        if(!$address->isOk()) {
            return $this->world();
        }

        if(!$address->hasUri()) {
            return $this->site($address->getDomain());
        }

        return $this->page($address->getDomain(), $address->getUri());
    }


    public function comments($url)
    {
        $address = WWWAddress::from($url);

        if(!$address->isOk()) {
            return $this->err(['code' => 'INVALID_ADDRESS']);
        }

        return $this->page($address->getDomain(), $address->getUri(''));
    }

}
