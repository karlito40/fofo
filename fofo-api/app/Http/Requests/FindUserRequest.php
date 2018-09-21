<?php

namespace App\Http\Requests;

class FindUserRequest extends APIRequest
{
    public function rules()
    {
        return [
            'id' => 'required_without_all:name,email',
            'email' => 'required_without_all:id,name',
            'name' => 'required_without_all:id,email',
        ];
    }

}