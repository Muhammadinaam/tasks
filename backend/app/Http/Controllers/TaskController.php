<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DataTables;
use App\Task;
use Auth;

class TaskController extends CommonController
{
    public function __construct() {
        parent::__construct('task', '\App\Task', []);
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

    public function validateRequest($id)
    {
        $this->validate(request(), [
            'task_description' => 'required',
            'due_date' => 'required|date',
            'assigned_to' => 'required',
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
        foreach(request()->assigned_to as $assigned_to)
        {
            $task = Task::where('id', $id)->where('assigned_to', $assigned_to)->first();
            if($task == null)
            {
                Task::where('id', $id)->delete();
                $task = new Task();
                $task->assigned_by = Auth::user()->id;
                $task->task_status_id = \App\TaskStatus::where('idt', 'assigned')->first()->id;
            }
            $task->task_description = request()->task_description;
            $task->due_date = \Carbon\Carbon::parse(request()->due_date)->format('Y-m-d H:i:s');
            $task->assigned_to = $assigned_to;
        }
        
        $task->save();
        return $task->id;
    }
}
