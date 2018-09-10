<?php

namespace App\Http\Requests;

use App\Utils\WWWAddress;

class AddressRequest extends APIRequest
{
    public function rules()
    {
        return [
            'address' => 'required',
        ];
    }

    public function authorize()
    {
        $this->request->set('www', WWWAddress::from($this->query('address')));
        return true;
    }

}