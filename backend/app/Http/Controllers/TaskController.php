<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DataTables;
use App\Task;
use Auth;

class TaskController extends CommonController
{
    public function __construct() {
        parent::__construct('task', '\App\Task', ['assignedTo', 'assignedBy', 'taskStatus'], []);
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
        return $this->saveData(null);
    }

    public function edit($id)
    {
        $this->abortIfUserDontHaveAccessToTask($id);
        return parent::edit($id);
    }

    public function updateData($id)
    {
        $this->abortIfUserDontHaveAccessToTask($id);
        return $this->saveData($id);
    }

    private function abortIfUserDontHaveAccessToTask($id)
    {
        if(Auth::user()->is_super_admin == 1)
        {
            return true;
        }

        $task = \App\Task::find($id);
        if(Auth::user()->id == $task->assignedBy->id)
        {
            return true;
        }

        abort(403, 'You are not allowed to edit/delete this task');
    }

    public function destroy($id)
    {
        $this->abortIfUserDontHaveAccessToTask($id);
        return parent::destroy($id);
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
            $task->task_title = request()->task_title;
            $task->task_description = request()->task_description;
            $task->due_date = \Carbon\Carbon::parse(request()->due_date)->format('Y-m-d H:i:s');
            $task->assigned_to = $assigned_to;
        }
        
        $task->save();
        return $task->id;
    }

    public function getAllTaskStatuses()
    {
        return \App\TaskStatus::get();
    }

    public function changeTaskStatus()
    {
        $task_id = request()->task_id;
        $status_idt = request()->status_idt;

        $status = \App\TaskStatus::where('idt', $status_idt)->first();

        \App\Task::where('id', $task_id)->update([
            'task_status_id' => $status->id,
        ]);

        return [
            'success' => true,
            'message' => 'Status changed successfully'
        ];
    }
}
