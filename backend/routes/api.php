<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function(){

    Route::resource('tasks', 'TaskController');
    Route::post('tasks-datatable', 'TaskController@dataTable');
    Route::get('get-all-task-statuses', 'TaskController@getAllTaskStatuses');
    Route::post('change-task-status', 'TaskController@changeTaskStatus');

    Route::resource('task-comments', 'TaskCommentController');

    Route::resource('roles', 'RoleController');
    Route::post('roles-datatable', 'RoleController@dataTable');
    Route::get('get-all-permissions', 'RoleController@getAllPermissions');
    Route::get('allowed-roles', 'RoleController@getAllowedRoles');

    Route::resource('users', 'UserController');
    Route::post('users-datatable', 'UserController@dataTable');
    Route::get('get-activated-users', 'UserController@getActivatedUsers');
    Route::get('get-current-user', 'UserController@getCurrentUser');

    Route::get('dashboard-tasks', 'DashboardController@dashboardTasks');

});
