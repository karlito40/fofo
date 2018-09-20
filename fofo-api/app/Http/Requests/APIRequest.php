<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use App\Http\Responses\APIResponse;
use Illuminate\Support\Facades\App;

class APIRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }


    public function failedAuthorization()
    {
        throw new HttpResponseException(APIResponse::error([
            'code' => 'UNAUTHORIZED'
        ]));

    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(APIResponse::error([
            'code' => 'INVALID_INPUTS',
            'validator' => $validator->errors()
        ]));
    }

    public function ip()
    {
        if(App::environment('local')) {
            // Emulate a different "ip" reference 
            return \Browser::browserFamily();
        }

        return parent::ip();
    }
}
