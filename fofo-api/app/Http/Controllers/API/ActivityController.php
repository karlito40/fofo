<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\AddressRequest;
use App\Models\Comment;
use App\Models\Page;
use App\Models\Site;
use App\Utils\WWWAddress;
use Faker\Provider\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        $sites = Site::byLatestActivity()
            ->simplePaginate();


        return $this->okRaw(array_merge([
            'type' => 'world',
        ], $sites->toArray()));
    }

    /**
     * Display the most recent|active pages
     * for the given site.
     *
     * @param $host
     * @return \Illuminate\Http\JsonResponse
     */
    public function site(AddressRequest $request)
    {
        $address = $request->get('www');

        $pages = Page::byLatestActivity($address->getDomain())
            ->simplePaginate()
            ->appends($request->all());

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
    public function page(AddressRequest $request)
    {
        $perPage = 15;
        $address = $request->get('www');

        $cursor = (int) $request->query('cursor');

        $comments = Page::findLatestComment($address->getDomain(), $address->getUri())
            ->when($cursor, function($query, $cursor) {
                $query->where('id', '<=', $cursor);
            })
            ->take($perPage)
            ->get();

        $lastComment = $comments->last();

        return $this->okRaw([
            'type' => 'page',
            'data' => $comments->all(),
            'next_cursor' => $lastComment ? $lastComment->id - 1 : -1,
            'has_more' => $comments->count() >= $perPage,
            'per_page' => $perPage,
        ]);
    }

    /*public function address($url)
    {
        $address = WWWAddress::from($url);

        if(!$address->isOk()) {
            return $this->world();
        }

        if(!$address->hasUri()) {
            return $this->site($address->getDomain());
        }

        return $this->page($address->getDomain(), $address->getUri());
    }*/


    /*public function comments($url)
    {
        $address = WWWAddress::from($url);

        if(!$address->isOk()) {
            return $this->err(['code' => 'INVALID_ADDRESS']);
        }

        return $this->page($address->getDomain(), $address->getUri());
    }*/

}
