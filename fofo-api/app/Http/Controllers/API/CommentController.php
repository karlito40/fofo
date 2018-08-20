<?php

namespace App\Http\Controllers\API;

use App\Models\Comment;
use App\Models\Page;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Validator;
use App\Utils\WWWAddress;

class CommentController extends APIController
{

    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|min:1',
            'address' => [
                'required',
                function($attribute, $value, $fail) {
                    if(!WWWAddress::ok($value)) {
                        return $fail($attribute.' is invalid.');
                    }
                }
            ],
        ]);

        if ($validator->fails()) {
            return $this->err([
                'code' => 'INVALID_INPUTS',
                'validator' => $validator->errors()
            ]);
        }

        $address = WWWAddress::from($request->input('address'));
        Log::debug('[addr: ' . $request->input('address') .'] Comment add on address ', [$address]);

        $site = Site::firstOrCreate([
            'domain' => $address->getDomain(),
        ]);

        $page = Page::firstOrNew([
            'uri' => $address->getUri(),
        ]);

        if(!isset($page->created_at)) {
            $site->pages()->save($page);
        }

        $comment = new Comment([
            'content' => $request->input('content')
        ]);

        $comment->commentable()->page()->associate($page);
        $comment->user()->associate($request->user());
        $comment->save();

        return $this->res(compact('comment', 'site', 'page'));
    }

    public function delete($id)
    {

    }
}
