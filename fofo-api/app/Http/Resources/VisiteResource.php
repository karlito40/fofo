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
        if(!$this->relationLoaded('site')) {
            throw new \Exception('VisiteResource need to be load with site relation');

        }

        return [
            'id' => $this->site->id,
            'domain' => $this->site->domain,
            'viewed_at' => $this->viewed_at
        ];
    }
}
