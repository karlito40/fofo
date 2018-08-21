<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\AddCommentRequest;
use App\Http\Requests\DeleteCommentRequest;
use App\Models\Comment;
use App\Models\Page;
use App\Models\Site;
use Illuminate\Support\Facades\Log;
use Validator;
use App\Utils\WWWAddress;

class CommentController extends APIController
{

    public function add(AddCommentRequest $request)
    {
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

        return $this->ok(compact('comment', 'site', 'page'));
    }

    public function delete(DeleteCommentRequest $request, Comment $comment)
    {
        $comment->delete();
        return $this->ok($comment);
    }
}
