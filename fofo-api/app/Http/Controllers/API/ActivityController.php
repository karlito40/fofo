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


        return $this->okRaw($sites->toArray());
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
        $perPage = 15;

        $sizeRequest = (int) $request->get('size', 1);
        $address = $request->get('www');

        $take = $perPage * $sizeRequest;

        $pages = Page::byLatestActivity($address->getDomain())
            ->take($take)
            ->get();

        $hasMore = $pages->count() >= $take;

        return $this->okRaw([
            'data' => $pages->all(),
            'has_more' => $hasMore,
            'current_size' => $sizeRequest,
            'next_size' => ($hasMore) ? $sizeRequest + 1 : null,
        ]);

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
        $prev = $request->query('prev');

        $operation = (!$prev) ? '<=' : '>';
        $take = ($prev && $prev === 'all' && $cursor) ? -1 : $perPage;

        $comments = Page::findLatestComment($address->getDomain(), $address->getUri())
            ->when($cursor, function($query, $cursor) use($operation) {
                $query->where('id', $operation, $cursor);
            })
            ->take($take)
            ->get();

        $lastComment = $comments->last();

        return $this->okRaw([
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
