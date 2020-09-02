<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\Media;
use Illuminate\Http\Resources\Json\JsonResource;

class Blog extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request) +
        [
            'media' => [
                'image' => Media::make($this->resource->image)
            ]
        ];
    }
}
