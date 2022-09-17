<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class HomeController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
  }

  public function AllSheets() {
    return inertia('Sheets/AllSheets/AllSheets');
  }

  public function testing() {
    return 'DEVELOPMENT PAGE';
  }


  public function index()
  {
    return \inertia('Example');
  }
}
