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
        parent::__construct('user', '\App\User', 'role');
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
        $this->saveData(null);
    }

    public function updateData($id)
    {
        $this->saveData($id);
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
        $user->save();
        return $user->id;
    }
}
