<?php

namespace App\Http\Requests;

use App\Utils\WWWAddress;

class AddHighlightRequest extends APIRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'location' => 'required',
            'content' => 'required|min:1',
            'address' => [
                'required',
                function($attribute, $value, $fail) {
                    if(!WWWAddress::ok($value)) {
                        return $fail($attribute.' is invalid.');
                    }
                }
            ],
        ];
    }


}
