<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RouteController extends Controller
{
    public function control(Request $request)
    {
        $token = $request->input('token');

        $request->header('Authorization', $token);

        $user = Auth::guard('api')->user();

        if ($user && $user->role === 'admin') {
            $redirect = $request->post('redirect');
            return view('admin', compact('redirect'));
        }
        return redirect('/admin/login');
    }
}
