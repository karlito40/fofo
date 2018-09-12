<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\AddCommentRequest;
use App\Http\Requests\AddressRequest;
use App\Http\Requests\APIRequest;
use App\Http\Requests\DeleteCommentRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\SiteResource;
use App\Http\Resources\VisiteResource;
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
        $visites = Visite::with('site')
            ->where('ip', $request->ip())
            ->orderByDesc('viewed_at')
            ->get();

        return $this->ok(VisiteResource::collection($visites));
    }

    public function add(AddressRequest $request)
    {
        $user = $request->user('api');
        $address = $request->get('www');

        $site = Site::firstOrCreate([
            'domain' => $address->getDomain(),
        ]);

        $visite = Visite::with(['user', 'site'])
            ->where('site_id', $site->id)
            ->where('ip', $request->ip())
            ->first();

        if(!$visite) {
            $visite = new Visite([
                'ip' => $request->ip(),
            ]);

            $visite->site()->associate($site);

        }

        if($user) {
            $visite->user()->associate($user);
        }

        $visite->viewed_at = Carbon::now();

        $visite->save();


        return $this->ok(new VisiteResource($visite));
    }



}
