<?php

use App\Http\Controllers\ControllerGetAll;
use App\Http\Controllers\ControllerDeleteOne;
use App\Http\Controllers\ControllerPostOne;
use App\Http\Controllers\ControllerPutOne;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerMenu;
use App\Http\Controllers\ControllerItensMenu;
use Illuminate\Http\Request;

Route::get('/', [ControllerMenu::class, 'chamaHome']);

$controllerItensMenu = new ControllerItensMenu();
$itensMenuVeiculos = $controllerItensMenu->itensMenuVeiculos_trait();
$itensMenuRelatorios = $controllerItensMenu->itensMenuRelatorios_trait();
$itensMenuPessoal =  $controllerItensMenu->itensMenuPessoal_trait();
$itensMenuLinhas =  $controllerItensMenu->itensMenuLinhas_trait();

foreach ($itensMenuVeiculos as $item) {
    $rota = $item[0];
    Route::get($rota, function () use ($rota) {
        return app(ControllerGetAll::class)->getAll($rota);
    })->name('getAll_' . $rota);

    Route::delete($rota . '/{id}', function ($id) use ($rota) {
        return app(ControllerDeleteOne::class)->deleteOne($rota, $id);
    })->name('deleteOne_' . $rota);

    Route::put($rota . '/{id}', function (Request $request, $id) use ($rota) {
        $dados = $request->all();
        return app(ControllerPutOne::class)->putOne($rota, $id, $dados);
    })->name('putOne_' . $rota);

    Route::post($rota, function (Request $request) use ($rota) {
        $dados = $request->all();
        return app(ControllerPostOne::class)->postOne($rota, $dados);
    })->name('postOne_' . $rota);

};

foreach ($itensMenuRelatorios as $item) {
    $rota = $item[0];
    Route::get($rota, function () use ($rota) {
        return app(ControllerGetAll::class)->getAll($rota);
    })->name('getAll_' . $rota);

    Route::delete($rota . '/{id}', function ($id) use ($rota) {
        return app(ControllerDeleteOne::class)->deleteOne($rota, $id);
    })->name('deleteOne_' . $rota);

    Route::put($rota . '/{id}', function (Request $request, $id) use ($rota) {
        $dados = $request->all();
        return app(ControllerPutOne::class)->putOne($rota, $id, $dados);
    })->name('putOne_' . $rota);

    Route::post($rota, function (Request $request) use ($rota) {
        $dados = $request->all();
        return app(ControllerPostOne::class)->postOne($rota, $dados);
    })->name('postOne_' . $rota);

};

foreach ($itensMenuPessoal as $item) {
    $rota = $item[0];
    Route::get($rota, function () use ($rota) {
        return app(ControllerGetAll::class)->getAll($rota);
    })->name('getAll_' . $rota);

    Route::delete($rota . '/{id}', function ($id) use ($rota) {
        return app(ControllerDeleteOne::class)->deleteOne($rota, $id);
    })->name('deleteOne_' . $rota);

    Route::put($rota . '/{id}', function (Request $request, $id) use ($rota) {
        $dados = $request->all();
        return app(ControllerPutOne::class)->putOne($rota, $id, $dados);
    })->name('putOne_' . $rota);

    Route::post($rota, function (Request $request) use ($rota) {
        $dados = $request->all();
        return app(ControllerPostOne::class)->postOne($rota, $dados);
    })->name('postOne_' . $rota);

};

foreach ($itensMenuLinhas as $item) {
    $rota = $item[0];
    Route::get($rota, function () use ($rota) {
        return app(ControllerGetAll::class)->getAll($rota);
    })->name('getAll_' . $rota);

    Route::delete($rota . '/{id}', function ($id) use ($rota) {
        return app(ControllerDeleteOne::class)->deleteOne($rota, $id);
    })->name('deleteOne_' . $rota);

    Route::put($rota . '/{id}', function (Request $request, $id) use ($rota) {
        $dados = $request->all();
        return app(ControllerPutOne::class)->putOne($rota, $id, $dados);
    })->name('putOne_' . $rota);

    Route::post($rota, function (Request $request) use ($rota) {
        $dados = $request->all();
        return app(ControllerPostOne::class)->postOne($rota, $dados);
    })->name('postOne_' . $rota);

};