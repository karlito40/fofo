<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\AddCommentRequest;
use App\Http\Requests\DeleteCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Page;
use Validator;
use App\Utils\WWWAddress;

class CommentController extends APIController
{

    public function add(AddCommentRequest $request)
    {

        $page = Page::findOrCreateWithAddress(WWWAddress::from($request->input('address')));

        $comment = new Comment([
            'content' => $request->input('content')
        ]);

        $comment->commentable()->page()->associate($page);
        $comment->user()->associate($request->user());
        $comment->save();

        return $this->ok(new CommentResource($comment));
    }

    public function delete(DeleteCommentRequest $request, Comment $comment)
    {
        $comment->delete();
        return $this->ok(new CommentResource($comment));
    }
}
