<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;
use DB;

class Role extends Model
{
    public function permissions()
    {
        return $this->belongsToMany('\App\Permission');
    }

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public static function allowedRolesIds()
    {
        $user = Auth::user();
        if($user->is_super_admin) {
            return self::all()->pluck('id');
        }

        return self::where('level', '<=', $user->role->level)->get()->pluck('id');
    }
}
