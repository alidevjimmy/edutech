<?php

namespace App\Http\Controllers;

use App\info;
use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function store(Request $request)
    {
        $validateData = $request->validate([
           'name' => 'required',
           'family' => 'required',
           'phone' => 'required',
            'description' => 'required'
        ]);

        info::create($validateData);
        return response()->json([
            'status' => 'success',
            'message' => 'اطلاعات با موفقیت ثبت شد'
        ]);
    }
}
