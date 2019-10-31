<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DataTables;
use App\Task;
use Auth;

class TaskController extends CommonController
{
    public function index()
    {
        
    }

    public function dataTable()
    {
        $tasks = Task::with(['assignedTo', 'assignedBy', 'taskStatus'])
            ->select('tasks.*');

        if(Auth::user()->is_super_admin == 0) {
            $tasks = $tasks
                ->where('assigned_to', Auth::user()->id)
                ->orWhere('assigned_by', Auth::user()->id);
        }

        return DataTables::eloquent($tasks)->toJson();
    }
}
