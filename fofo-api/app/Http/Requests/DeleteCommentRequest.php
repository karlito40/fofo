<?php

namespace App\Http\Requests;

use App\Models\Comment;
use Illuminate\Support\Facades\Log;

class DeleteCommentRequest extends APIRequest
{
    public function authorize()
    {
        return $this->user()->can('delete', $this->route('comment'));
    }


}
