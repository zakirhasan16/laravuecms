<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::get('refresh', 'AuthController@refresh');
    Route::get('user', 'AuthController@user');
});

Route::group([
    'middleware' => ['jwt.auth', 'isAdmin'],
    'prefix' => 'admin'
], function($router) {
    Route::apiResource('blog-category', 'Admin\BlogCategoryController');
    Route::apiResource('blog', 'Admin\BlogController');

    Route::get('blog-categories', 'AdminController@blog_categories');
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('blog-categories', 'FrontController@blog_categories');
    Route::get('blogs', 'FrontController@blogs_search');
    Route::get('blogs/{url}', 'FrontController@category_blogs');
    Route::get('blog/{url}', 'FrontController@blog');

});
