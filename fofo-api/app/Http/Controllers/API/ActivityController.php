<?php

namespace App\Http\Controllers\API;

use App\Models\Comment;
use App\Models\Page;
use App\Models\Site;
use App\Utils\WWWAddress;
use Illuminate\Support\Facades\DB;

class ActivityController extends APIController
{
    /**
     * Display the most recent|active pages
     * for the world.
     *
     * @param $host
     * @return \Illuminate\Http\JsonResponse
     */
    public function world()
    {
        $pages = Page::byLatestActivity()->paginate();

        return $this->okRaw(array_merge([
            'type' => 'world',
        ], $pages->toArray()));
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
        $address = WWWAddress::from($domain);

        $pages = Page::byLatestActivity($address->getDomain())->paginate();

        return $this->okRaw(array_merge([
            'type' => 'site',
        ], $pages->toArray()));

    }

    /**
     * Display the most recent comments for the given page.
     *
     * `_` as uri retrieve the root page.
     *
     * @param $host
     * @param $uri
     * @return \Illuminate\Http\JsonResponse
     */
    public function page($domain, $uri)
    {
        $comments = Page::findLatestComment($domain, $uri)
            ->paginate()
            ->toArray();

        $data = (empty($comments)) ? ['data' => []] : $comments;
        
        return $this->okRaw(array_merge([
            'type' => 'page'
        ], $data));
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

        return $this->page($address->getDomain(), $address->getUri());
    }

}
