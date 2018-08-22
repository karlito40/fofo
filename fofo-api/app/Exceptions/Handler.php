<?php

namespace App\Exceptions;

use App;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use App\Http\Responses\APIResponse;
use Illuminate\Support\Facades\Log;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if(starts_with($request->path(), 'api')) {
            return APIResponse::error([
                'code' => 'UNAUTHENTICATED'
            ], 401);
        }

        return parent::unauthenticated($request, $exception);

    }

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof \App\Exceptions\InvalidCredentialsException) {
            return $exception->render($request);
        }

        return parent::render($request, $exception);

        /*Log::debug('handler render');
        $message = (App::environment('production'))
            ? 'An error occured'
            : $exception->getMessage();

        return APIResponse::error([
            'code' => 'UNHANDLED_EXCEPTION',
            'message' => $message,
        ], 400);*/

    }
}
