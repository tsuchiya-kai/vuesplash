<?php

//VueRouterで制御するための記述
Route::get('/{any?}', function () {
    return view('index');
})->where('any', '.+');
