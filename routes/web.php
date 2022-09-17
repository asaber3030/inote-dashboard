<?php

use App\Http\Controllers\MaterialSheetsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StoresController;
use App\Http\Controllers\EquipmentsController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\ContractorsController;
use App\Http\Controllers\ContractorSheetsController;
use App\Http\Controllers\EngineerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EquipmentSheetsController;

Route::get('/test', [\App\Http\Controllers\HomeController::class, 'testing']);

Route::middleware('auth')->group(function () {

  Route::get('/sheets', [HomeController::class, 'AllSheets'])->name('sheets');

  Route::name('stores.')->group(function () {
    Route::controller(StoresController::class)->group(function () {
      Route::prefix('stores')->group(function () {
        Route::get('/', 'Stores')->name('list');

        Route::get('/trash', 'TrashedStores')->name('trashed');

        Route::get('add', 'CreateStoreView')->name('add');
        Route::post('add', 'CreateStoreAction');

        Route::get('update/{store}', 'UpdateStoreView')->name('update');
        Route::put('update/{store}', 'UpdateStoreAction');

        Route::get('delete/{store}', 'DeleteStoreView')->name('delete');
        Route::post('delete/{store}', 'DeleteStoreAction');

        Route::get('restore/{id}', 'RestoreStoreView')->name('restore');
        Route::post('restore/{id}', 'RestoreStoreAction');

        Route::post('restore-selected', 'RestoreSelected')->name('restore.selected');
        Route::post('delete-selected', 'DeleteSelected')->name('delete.selected');

        Route::post('export', 'ExportStores')->name('export');

        Route::get('materials/{store}', 'StoredMaterials')->name('materials');

        Route::get('materials/{store}/add', 'AddMaterialView')->name('materials.add');
        Route::post('materials/{store}/add', 'AddMaterialAction');

        Route::get('materials/update/{material}', 'UpdateMaterialView')->name('materials.update');
        Route::post('materials/update/{material}', 'UpdateMaterialAction');

        Route::get('materials/restore/{id}', 'RestoreMaterialView')->name('materials.restore');
        Route::post('materials/restore/{id}', 'RestoreMaterialAction');

        Route::get('materials/delete/{material}', 'DeleteMaterialView')->name('materials.delete');
        Route::post('materials/delete/{material}', 'DeleteMaterialAction');
      });
    });
  });

  Route::name('materials.')->group(function () {
    Route::controller(MaterialsController::class)->group(function () {
      Route::prefix('materials')->group(function () {
        Route::get('/', 'Materials')->name('list');

        Route::get('add', 'AddMaterialView')->name('add');
        Route::post('add', 'AddMaterialAction');

        Route::get('working-hours/{material}', 'WorkingHours')->name('hours');

        Route::get('working-hours/add/{material}', 'AddHourView')->name('hours.add');
        Route::post('working-hours/add/{material}', 'AddHourAction');

        Route::get('working-hours/{material}/{filter}/{day}/{month?}', 'FilterHours')->name('hours.search');
      });
    });
  });

  Route::name('equipments.')->group(function () {
    Route::controller(EquipmentsController::class)->group(function () {
      Route::prefix('equipments')->group(function () {
        Route::get('/', 'Equipments')->name('list');

        Route::get('add', 'AddEquipmentView')->name('add');
        Route::post('add', 'AddEquipmentAction');

        Route::get('update/{equipment}', 'UpdateEquipmentView')->name('update');
        Route::post('update/{equipment}', 'UpdateEquipmentAction');

        Route::get('delete/{equipment}', 'DeleteEquipmentView')->name('delete');
        Route::post('delete/{equipment}', 'DeleteEquipmentAction');

        Route::post('restore-selected', 'RestoreSelected')->name('restore.selected');
        Route::post('delete-selected', 'DeleteSelected')->name('delete.selected');

        Route::get('restore/{id}', 'RestoreEquipmentView')->name('restore');
        Route::post('restore/{id}', 'RestoreEquipmentAction');

        Route::get('working-hours/{equipment}', 'WorkingHours')->name('hours');

        Route::get('working-hours/add/{equipment}', 'AddHourView')->name('hours.add');
        Route::post('working-hours/add/{equipment}', 'AddHourAction');

        Route::get('working-hours/{equipment}/{filter}/{day}/{month?}', 'FilterHours')->name('hours.search');
      });
    });
  });

  Route::name('contractors.')->group(function () {
    Route::controller(ContractorsController::class)->group(function () {
      Route::prefix('contractors')->group(function () {
        Route::get('/', 'Contractors')->name('list');

        Route::get('add', 'AddContractorView')->name('add');
        Route::post('add', 'AddContractorAction');

        Route::get('update/{contractor}', 'UpdateContractorView')->name('update');
        Route::post('update/{contractor}', 'UpdateContractorAction');

        Route::get('view/{contractor}', 'ShowContractorView')->name('view');

        Route::get('view/{contractor}/workers', 'ContractorWorkers')->name('workers');
        Route::get('view/{contractor}/techicians', 'ContractorTechs')->name('techs');

        Route::get('view/{contractor}/filtering/{month?}/{day?}', 'FilterData')->name('filter');

        Route::get('equipments/{contractor}/{month?}/{day?}', 'ContractorEquipmentsView')->name('equipments');

        Route::get('new-equipment/{contractor}', 'ContractorEquipmentsAddView')->name('equipments.add');
        Route::post('new-equipment/{contractor}', 'ContractorEquipmentsAddAction');

        Route::get('meters/{contractor}/{month?}/{day?}', 'ContractorMetersView')->name('meters');

        Route::get('new-meter/{contractor}', 'ContractorMetersAddView')->name('meters.add');
        Route::post('new-meter/{contractor}', 'ContractorMetersAddAction');

        Route::get('add-worker/{contractor?}/{type?}', 'AddWorkerView')->name('workers.add');
        Route::post('add-worker/{contractor?}/{type?}', 'AddWorkerAction');

        Route::get('delete/{contractor}', 'DeleteContractorView')->name('delete');
        Route::post('delete/{contractor}', 'DeleteContractorAction');

        Route::get('restore/{id}', 'RestoreContractorView')->name('restore');
        Route::post('restore/{id}', 'RestoreContractorAction');

        Route::post('restore-selected', 'RestoreSelected')->name('restore.selected');
        Route::post('delete-selected', 'DeleteSelected')->name('delete.selected');

      });
    });
  });

  Route::name('engineers.')->group(function () {
    Route::controller(EngineerController::class)->group(function () {
      Route::prefix('engineers')->group(function () {
        Route::get('/', 'Engineers')->name('list');

        Route::get('add', 'AddEngineerView')->name('add');
        Route::post('add', 'AddEngineerAction');

        Route::get('update/{engineer}', 'UpdateEngineerView')->name('update');
        Route::post('update/{engineer}', 'UpdateEngineerAction');

        Route::get('delete/{engineer}', 'DeleteEngineerView')->name('delete');
        Route::post('delete/{engineer}', 'DeleteEngineerAction');

        Route::get('restore/{id}', 'RestoreEngineerView')->name('restore');
        Route::post('restore/{id}', 'RestoreEngineerAction');

        Route::post('restore-selected', 'RestoreSelected')->name('restore.selected');
        Route::post('delete-selected', 'DeleteSelected')->name('delete.selected');

      });
    });
  });

  Route::name('profile.')->group(function () {
    Route::controller(EngineerController::class)->group(function () {
      Route::prefix('profile')->group(function () {
        Route::get('/', 'PublicProfileView')->name('main');
        Route::post('/', 'PublicProfileAction');

        Route::get('contact', 'ContactInformationView')->name('contact');
        Route::post('contact', 'ContactInformationAction');

        Route::get('picture', 'PictureView')->name('picture');
        Route::post('picture', 'PictureAction');

        Route::get('password', 'PasswordView')->name('password');
        Route::post('password', 'PasswordAction');

        Route::get('security', 'ProfileSecurityView')->name('security');
        Route::post('security', 'ProfileSecurityAction');

        Route::get('export-data', 'ExportDataView')->name('export-data');

        Route::get('themes', 'ChangeThemeView')->name('theme');
        Route::post('themes', 'ChangeThemeAction');

        Route::get('languages', 'ChangeLanguageView')->name('language');
        Route::post('languages', 'ChangeLanguageAction');

        Route::get('timeline', 'EngineerTimeLine')->name('timeline');

        Route::get('database', 'DatabaseView')->name('database');

        Route::get('tables', 'TablesView')->name('tables');

        Route::get('tables/view/{table}', 'ViewTable')->name('tables.view');

      });
    });

  });

  // Contractor Sheets
  Route::name('contractor.sheets.')->group(function () {

    Route::controller(ContractorSheetsController::class)->group(function () {

      Route::prefix('contractors/sheets')->group(function () {

        Route::get('/', 'SheetsList')->name('list');

        Route::get('/view/{sheet}', 'ViewSheet')->name('view');

        Route::get('/create', 'CreateSheetView')->name('add');
        Route::post('/create', 'CreateSheetAction');

        Route::post('/change-summary-status/{sheet}', 'ChangeSummaryStatus')->name('change');

      });

    });

  });

  // Materials Sheets
  Route::name('material.sheets.')->group(function () {

    Route::controller(MaterialSheetsController::class)->group(function () {

      Route::prefix('materials/sheets')->group(function () {

        Route::get('/', 'SheetsList')->name('list');

        Route::get('/view/{sheet}', 'ViewSheet')->name('view');

        Route::get('/create/{material}', 'CreateSheetView')->name('add');
        Route::post('/create/{material}', 'CreateSheetAction');

        Route::post('/change-summary-status/{sheet}', 'ChangeSummaryStatus')->name('change');

      });

    });

  });

  // Equipments Sheets
  Route::name('equipment.sheets.')->group(function () {

    Route::controller(EquipmentSheetsController::class)->group(function () {

      Route::prefix('equipments/sheets')->group(function () {

        Route::get('/', 'SheetsList')->name('list');

        Route::get('/view/{sheet}', 'ViewSheet')->name('view');

        Route::get('/create/{equipment}', 'CreateSheetView')->name('add');
        Route::post('/create/{equipment}', 'CreateSheetAction');

        Route::post('/change-summary-status/{sheet}', 'ChangeSummaryStatus')->name('change');

      });

    });

  });

  Route::get('change-language/{language}/{id}', [\App\Http\Controllers\HandleApi::class, 'ChangeLanguage'])->name('change.language');
  Route::get('change-theme/{theme}/{id}', [\App\Http\Controllers\HandleApi::class, 'ChangeTheme'])->name('change.theme');

});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
