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
        parent::__construct('role', '\App\Role', ['users', 'permissions'], ['users']);
    }

    public function index()
    {
        return Role::get();
    }

    public function dataTable()
    {
        Auth::user()->abortIfDontHavePermission('roles_list');

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
        return $this->saveData(null);
    }

    public function edit($id)
    {
        $this->abortIfUserDontHaveAccessToRole($id);
        return parent::edit($id);
    }

    public function updateData($id)
    {
        $this->abortIfUserDontHaveAccessToRole($id);
        return $this->saveData($id);
    }

    private function abortIfUserDontHaveAccessToRole($id)
    {
        $allowedRolesIds = Role::allowedRolesIds();

        if(!in_array($id, $allowedRolesIds->toArray())) {
            abort(403, 'You are not allowed to edit/delete this role');
        }
    }

    public function destroy($id)
    {
        $this->abortIfUserDontHaveAccessToRole($id);
        return parent::destroy($id);
    }

    public function saveData($id)
    {
        $role = $id == null ? new Role() : Role::find($id);
        $role->name = request()->name;
        $role->level = request()->level;
        $role->save();

        $new_permissions = [];
        foreach(request()->permissions as $idt => $value)
        {
            if($value == 1 || $value == true || $value == 'true')
            {
                if(Auth::user()->hasPermission($idt))
                {
                    $permission = Permission::where('idt', $idt)->first();
                    $new_permissions[] = $permission->id;
                }
            }
        }
        $role->permissions()->sync( $new_permissions );

        return $role->id;
    }

    public function getAllowedRoles()
    {
        $allowedRolesIds = Role::allowedRolesIds();
        return Role::whereIn('id', $allowedRolesIds)->get();
    }
}
