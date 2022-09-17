<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
      return array_merge(parent::share($request), [
        'auth' => [
          'user' => $request->user(),
        ],
        'ziggy' => function () use ($request) {
          return array_merge((new Ziggy)->toArray(), [
            'location' => $request->url(),
          ]);
        },
        'is_authenticated' => auth()->check(),
        'is_guest' => auth()->guest(),
        'userData' => auth()->user(),
        'timeline' => '',
        'appURL' => 'http://127.0.0.1:8000/',
        'path' => request()->url(),
        'flash' => [
          'msg' => session('msg'),
          'msg_type' => session('msg_type') ?? 'success',
          'msg_title' => session('msg_title'),
        ]
      ]);
    }
}
