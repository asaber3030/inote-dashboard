<?php

namespace App\Exports;

use App\Models\Stores;
use Vitorccs\LaravelCsv\Concerns\Exportable;
use Vitorccs\LaravelCsv\Concerns\FromQuery;

class ExportStores implements FromQuery
{
  use Exportable;
  public function query() {
    return Stores::query();
  }
}
