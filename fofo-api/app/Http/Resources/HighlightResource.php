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
            'page' => new PageResource($this->whenLoaded('page')),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
