<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
foreach (['about','events','news','media','volunteer','contact','prayer-request','donate','campaigns','partners','reports','transparency','privacy','terms'] as $page) {
    Route::view('/'.$page, 'page', ['page' => ucfirst($page)]);
}
Route::view('/programs', 'page', ['page' => 'Programs']);
Route::view('/programs/{slug}', 'page', ['page' => 'Program']);
Route::view('/projects', 'page', ['page' => 'Projects']);
Route::view('/projects/{slug}', 'page', ['page' => 'Project']);
