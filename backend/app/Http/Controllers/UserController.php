<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DataTables;
use Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends CommonController
{
    public function __construct() {
        parent::__construct(
            'user', 
            '\App\User', 
            ['role'], 
            ['tasksAssignedToThisUser', 'tasksAssignedByThisUser']);
    }

    public function getActivatedUsers()
    {
        return User::where('is_activated', 1)->get();
    }

    public function dataTable()
    {
        $data = User::with('role')->select('users.*');

        return DataTables::eloquent($data)->toJson();
    }

    public function validateRequest($id)
    {
        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => $id == null ? 'required|confirmed' : 'confirmed',
        ]);
    }

    public function storeData()
    {
        return $this->saveData(null);
    }

    public function edit($id)
    {
        $this->abortIfUserDontHaveAccessToUser($id);
        return parent::edit($id);
    }

    public function updateData($id)
    {
        $this->abortIfUserDontHaveAccessToUser($id);
        return $this->saveData($id);
    }

    private function abortIfUserDontHaveAccessToUser($id)
    {
        if(Auth::user()->is_super_admin == 1)
        {
            return true;
        }

        $user = \App\User::find($id);
        if($user->is_super_admin == 0 && Auth::user()->role->level >= $user->role->level)
        {
            return true;
        }

        abort(403, 'You are not allowed to edit/delete this user');
    }

    public function destroy($id)
    {
        $this->abortIfUserDontHaveAccessToUser($id);
        return parent::destroy($id);
    }

    public function saveData($id)
    {
        $user = $id == null ? new User() : User::find($id);
        $user->name = request()->name;
        $user->email = request()->email;
        if(request()->password != null && request()->password != '') {
            $user->password = Hash::make(request()->password);
        }
        $user->is_super_admin = 
            request()->is_super_admin == 1 || request()->is_super_admin == true || request()->is_super_admin == 'true'
            ? 1 : 0;

        $user->role_id = request()->role_id;
        if($user->is_super_admin != 1 && $user->role_id == '') 
        {
            throw new \Exception("Please select Role", 1);
        }

        $user->save();
        return $user->id;
    }

    public function getCurrentUser()
    {
        $user = \App\User::with(['role.permissions'])->where('users.id', Auth::user()->id)->first();

        //this is code for convert to std class
        $user = json_encode($user);
        $user = json_decode($user);

        if($user->is_super_admin == 1) {
            // all permissions
            $user->role = [
                'name' => 'Super Admin',
                'permissions' => \App\Permission::all(),
            ];
        }

        return response()->json($user);
    }
}