<?php

namespace App\Http\Resources;

use App\Models\Page;
use Illuminate\Http\Resources\Json\JsonResource;

class VisiteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if(!$this->relationLoaded('page')) {
            throw new \Exception('VisiteResource need to be load with page relation');

        }

        return [
            'id' => $this->id,
            'viewed_at' => $this->viewed_at->toW3cString(),
            'page' => new PageResource($this->page),
        ];
    }
}
