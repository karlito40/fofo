<?php

namespace App\Http\Requests;

class DeleteHighlightRequest extends APIRequest
{

    public function authorize()
    {
        return $this->user()->can('delete', $this->route('highlight'));
    }

}
