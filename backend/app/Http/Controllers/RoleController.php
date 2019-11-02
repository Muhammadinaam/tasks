<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Role;
use App\Permission;
use DataTables;
use Auth;

class RoleController extends CommonController
{
    public function __construct() {
        parent::__construct('role', '\App\Role', 'permissions');
    }

    public function index()
    {
        return Role::get();
    }

    public function dataTable()
    {
        $data = Role::select('roles.*');

        return DataTables::eloquent($data)->toJson();
    }

    public function getAllPermissions()
    {
        return Permission::all()->groupBy('group');
    }

    public function validateRequest($id)
    {
        $this->validate(request(), [
            'name' => 'required|unique:roles,name,' . $id,
            'level' => 'required|numeric'
        ]);
    }

    public function storeData()
    {
        $this->saveData(null);
    }

    public function updateData($id)
    {
        $this->saveData($id);
    }

    public function saveData($id)
    {
        $role = $id == null ? new Role() : Role::find($id);
        $role->name = request()->name;
        $role->level = request()->level;
        $role->save();

        $role->permissions()->detach();
        foreach(request()->permissions as $idt => $value)
        {
            if($value == 1 || $value == true || $value == 'true')
            {
                $permission = Permission::where('idt', $idt)->first();
                $role->permissions()->attach( $permission->id );
            }
        }

        return $role->id;
    }
}
