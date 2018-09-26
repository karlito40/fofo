<?php

namespace App\Http\Requests;


class DeleteCommentRequest extends APIRequest
{
    public function authorize()
    {
        return $this->user()->can('delete', $this->route('comment'));
    }

}
