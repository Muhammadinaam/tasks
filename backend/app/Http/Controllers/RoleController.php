<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Role;
use DataTables;
use Auth;

class RoleController extends CommonController
{
    public function dataTable()
    {
        $data = Role::select('roles.*');

        return DataTables::eloquent($data)->toJson();
    }
}
