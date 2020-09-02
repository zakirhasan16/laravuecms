<?php

namespace App\Http\Controllers;

use App\BlogCategory;
use App\Http\Resources\Admin\BlogCategoryOptionCollection;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function blog_categories()
    {
        $blogCategories = BlogCategory::all();

        return BlogCategoryOptionCollection::make($blogCategories);
    }
}
