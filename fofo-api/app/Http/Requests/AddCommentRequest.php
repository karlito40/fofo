<?php

namespace App\Http\Requests;

use App\Utils\WWWAddress;

class AddCommentRequest extends AddressRequest
{

    public function rules()
    {
        return array_merge(parent::rules(), [
            'content' => 'required|min:1',
        ]);
    }


}
