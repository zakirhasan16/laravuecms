<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'url',
        'content'
    ];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id','id');
    }
}
