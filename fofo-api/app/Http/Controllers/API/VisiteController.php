<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\AddCommentRequest;
use App\Http\Requests\AddressRequest;
use App\Http\Requests\APIRequest;
use App\Http\Requests\DeleteCommentRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\SiteResource;
use App\Http\Resources\VisiteResource;
use App\Http\Resources\VisiteSiteResource;
use App\Models\Comment;
use App\Models\Page;
use App\Models\Site;
use App\Models\Visite;
use Carbon\Carbon;
use Validator;
use App\Utils\WWWAddress;

class VisiteController extends APIController
{

    public function listByIp(APIRequest $request)
    {
        $visites = Visite::bySites()
            ->where('ip', $request->ip())
            ->get();

        return $this->ok(VisiteSiteResource::collection($visites));
    }

    public function add(AddressRequest $request)
    {
        $user = $request->user('api');

        $page = Page::findOrCreateWithAddress($request->get('www'));

        $visite = Visite::with('page')
            ->where('page_id', $page->id)
            ->where('ip', $request->ip())
            ->first();

        if(!$visite) {
            $visite = new Visite([
                'ip' => $request->ip(),
            ]);

            $visite->page()->associate($page);
        }

        if($user) {
            $visite->user()->associate($user);
        }

        $visite->load('page.site');

        $visite->viewed_at = Carbon::now();
        $visite->save();

        return $this->ok(new VisiteResource($visite));
    }



}
