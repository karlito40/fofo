<?php

namespace App\Http\Requests;


class UpdateCommentRequest extends APIRequest
{
    public function rules()
    {
        return array_merge(parent::rules(), [
            'content' => 'sometimes|min:1',
        ]);
    }

    public function authorize()
    {
        return $this->user()->can('update', $this->route('comment'));
    }

}
