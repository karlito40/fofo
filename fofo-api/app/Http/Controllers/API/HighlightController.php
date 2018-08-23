<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\AddHighlightRequest;
use App\Http\Requests\DeleteHighlightRequest;
use App\Http\Resources\HighlightResource;
use App\Models\Highlight;
use App\Models\Page;
use App\Utils\WWWAddress;

class HighlightController extends APIController
{

    public function add(AddHighlightRequest $request)
    {
        $page = Page::findOrCreateWithAddress(WWWAddress::from($request->input('address')));

        $highlight = new Highlight([
            'location' => $request->input('location'),
            'content' => $request->input('content')
        ]);

        $highlight->page()->associate($page);
        $highlight->user()->associate($request->user());
        $highlight->save();

        return $this->ok(new HighlightResource($highlight));
    }

    public function delete(DeleteHighlightRequest $request, Highlight $highlight)
    {
        $highlight->delete();
        return $this->ok(new HighlightResource($highlight));
    }
}
