<?php

namespace App\Http\Controllers\Admin;

use App\BlogCategory;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\BlogCategoryCollection;
use App\Http\Resources\Admin\BlogCategory as BlogCategoryResource;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return BlogCategoryCollection
     */
    public function index()
    {
        $blocCategories = BlogCategory::all();

        return BlogCategoryCollection::make($blocCategories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function store(Request $request)
    {
        $blogCategory = new BlogCategory($request->all());

        $blogCategory->save();

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
     * @param  \App\BlogCategory  $blogCategory
     * @return BlogCategoryResource
     */
    public function show(BlogCategory $blogCategory)
    {
        return BlogCategoryResource::make($blogCategory);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BlogCategory  $blogCategory
     * @return array
     */
    public function update(Request $request, BlogCategory $blogCategory)
    {
        $blogCategory->fill($request->all());

        $blogCategory->save();

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
     * @param  \App\BlogCategory  $blogCategory
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(BlogCategory $blogCategory)
    {
        if($blogCategory->blogs) {
            return response()->json([
                'error' => true,
                'notify' => [
                    'message' => 'Bu Kategoriye Ait İçerikler Var. Bu Kategori Silinemez.'
                ]
            ], 500);
        }

        $blogCategory->delete();

        return response()->json([
            'success' => true,
            'notify' => [
                'message' => 'Kayıt Başarıyla Silindi.'
            ]
        ]);
    }
}
