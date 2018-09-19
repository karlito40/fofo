<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'avatar' => $this->getAvatar(),
            'highlights' =>  HighlightResource::collection($this->whenLoaded('highlights')),
            //'visites' =>  VisiteResource::collection($this->whenLoaded('visites')),
            'visites' =>  VisiteSiteResource::collection($this->whenLoaded('visites')),
            'comments' =>  CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
