<?php

namespace App\Http\Controllers\Admin;

use App\Blog;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\BlogCollection;
use App\Http\Resources\Admin\Blog as BlogResource;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return BlogCollection
     */
    public function index()
    {
        $blogs = Blog::all();

        return BlogCollection::make($blogs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function store(Request $request)
    {
        $blog = new Blog($request->all());

        $blog->save();

        if($request->hasFile('image')) {
            $blog->addMedia($request->file('image'))->toMediaCollection('image');
        }

        return [
            'success' => true,
            'notify' => [
                'message' => 'Kayıt Başarıyla Eklendi.'
            ]
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param Blog $blog
     * @return BlogResource
     */
    public function show(Blog $blog)
    {
        return BlogResource::make($blog);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Blog $blog
     * @return array
     */
    public function update(Request $request, Blog $blog)
    {
        $blog->fill($request->all());

        $blog->save();

        if($request->hasFile('image')) {
            $blog->clearMediaCollection('image');

            $blog->addMedia($request->file('image'))->toMediaCollection('image');
        }

        return [
            'success' => true,
            'notify' => [
                'message' => 'Kayıt Başarıyla Düzenlendi.'
            ]
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Blog $blog
     * @return array
     */
    public function destroy(Blog $blog)
    {
        $blog->clearMediaCollection('image');

        $blog->delete();

        return [
            'success' => true,
            'notify' => [
                'message' => 'Kayıt Başarıyla Silindi.'
            ]
        ];
    }
}
