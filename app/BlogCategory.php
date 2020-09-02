<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    protected $fillable = [
        'title',
        'url'
    ];

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'category_id','id');
    }
}
