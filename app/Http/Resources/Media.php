<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Media extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);

        $data['src'] = $this->resource->getFullUrl();
        $data['ext'] = $this->resource->extension;

        $data = collect($data)->only('id', 'src', 'ext', 'file_name', 'size', 'mime_type', 'updated_at')->all();

        return $data;
    }
}
