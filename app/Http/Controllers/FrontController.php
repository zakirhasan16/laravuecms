<?php

namespace App\Http\Controllers;

use App\Blog;
use App\BlogCategory;
use App\Http\Resources\Admin\Blog as BlogResource;
use App\Http\Resources\Admin\BlogCollection;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function blog_categories()
    {
        return BlogCategory::all();
    }

    public function category_blogs($url)
    {
        $blogCategory = BlogCategory::query()->where('url', $url)->with('blogs')->firstOrFail();

        return BlogCollection::make($blogCategory->blogs);
    }

    public function blog($url)
    {
        $blog = Blog::query()->where('url',$url)->firstOrFail();

        return BlogResource::make($blog);
    }

    public function blogs_search(Request $request)
    {
        $q = $request->input('q');
        $blogs = Blog::query()
                        ->where('title', 'LIKE',"%$q%")
                        ->get();

        return BlogCollection::make($blogs);
    }
}
