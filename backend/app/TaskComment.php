<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskComment extends Model
{
    public function taskCommentReads()
    {
        return $this->hasMany('\App\TaskCommentRead', 'comment_id');
    }

    public function createdBy()
    {
        return $this->belongsTo('\App\User', 'created_by');
    }
}
