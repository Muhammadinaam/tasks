<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo('\App\Role');
    }

    public function tasksAssignedToThisUser()
    {
        return $this->hasMany('\App\Task', 'assigned_to');
    }

    public function tasksAssignedByThisUser()
    {
        return $this->hasMany('\App\User', 'assigned_by');
    }

    public function hasPermission($idt)
    {
        if($this->is_super_admin == 1)
        {
            return true;
        }

        $permission = $this->role->permissions()->where('idt', $idt)->first();
        return $permission != null;
    }

    public function abortIfDontHavePermission($idt)
    {
        if(!$this->hasPermission($idt))
        {
            abort(403, 'You do not have permission to perform this operation');
        }
    }
}
