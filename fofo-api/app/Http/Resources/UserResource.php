<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

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
        $user = $request->user('api');

        $belongToSelf = $user && $user->id === $this->id;

        return [
            'id' => $this->id,
            'name' => $this->name,
            $this->mergeWhen($belongToSelf, [
                'email' => $this->email
            ]),
            'avatar' => $this->getAvatar(),
            'highlights' =>  HighlightResource::collection($this->whenLoaded('highlights')),
            'visites' =>  VisiteSiteResource::collection($this->whenLoaded('visites')),
            'comments' =>  CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
