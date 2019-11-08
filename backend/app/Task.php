<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends CommonModel
{
    protected $table = 'tasks';

    public function assignedTo()
    {
        return $this->belongsTo('\App\User', 'assigned_to');
    }

    public function assignedBy()
    {
        return $this->belongsTo('\App\User', 'assigned_by');
    }

    public function taskStatus()
    {
        return $this->belongsTo('\App\TaskStatus', 'task_status_id');
    }

    public function taskComments()
    {
        return $this->hasMany('\App\TaskComment');
    }
}
