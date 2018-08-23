<?php

namespace App\Http\Resources;

use App\Models\Page;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $res = [
            'id' => $this->id,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];

        $commentable = $this->commentable;

        $explodeClass = explode('\\', $this->commentable_type);
        $commentableModel = $explodeClass[count($explodeClass)-1];
        $withResource = 'App\\Http\\Resources\\' . $commentableModel . 'Resource';

        $type = strtolower($commentableModel);
        $res['commentable'] = [
            'type' => $type,
            $type => new $withResource($commentable)
        ];

        return $res;
    }
}
