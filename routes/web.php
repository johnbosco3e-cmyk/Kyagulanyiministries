<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
foreach (['about','programs','projects','news','volunteer','contact','donate'] as $page) {
    Route::view('/'.$page, 'page', ['page' => ucfirst($page)]);
}
