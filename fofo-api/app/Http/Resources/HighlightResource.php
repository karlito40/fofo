<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HighlightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'location' => $this->location,
            'content' => $this->content,
            'deleted_at' => $this->deleted_at,
            'page' => new PageResource($this->page),
            'user' => new UserResource($this->user),
        ];
    }
}
