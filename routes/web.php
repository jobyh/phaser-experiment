<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/games/{name}', function (string $name) {
    if (! File::exists(resource_path(sprintf("js/games/%s", $name)))) {
        abort(404);
    }
    return view('app', ['game' => $name]);
});
