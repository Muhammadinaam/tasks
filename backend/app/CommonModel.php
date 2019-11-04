<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class CommonModel extends Model
{
    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->created_by = Auth::user()->id;
        });

        self::saving(function ($model) {
            $model->updated_by = Auth::user()->id;
        });
    }
}
