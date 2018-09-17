<?php

namespace App\Http\Requests;

use App\Utils\WWWAddress;

class AddressRequest extends APIRequest
{
    public function rules()
    {
        return [
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

    public function authorize()
    {
        $this->request->set('www', WWWAddress::from($this->input('address')));
        return true;
    }

}