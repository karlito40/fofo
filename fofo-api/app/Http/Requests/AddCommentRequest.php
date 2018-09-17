<?php

namespace App\Http\Requests;

use App\Utils\WWWAddress;

class AddCommentRequest extends AddressRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return array_merge(parent::rules(), [
            'content' => 'required|min:1',
        ]);
    }


}
