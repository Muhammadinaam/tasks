<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use App\TaskStatus;
use Auth;

class DashboardController extends Controller
{
    public function dashboardTasks()
    {
        $hidden_task_statuses = TaskStatus::
            whereIn('idt', ['cancelled', 'completed_and_approved'])
            ->get()
            ->pluck('id');

        $assigned_to_me_by_others = 
            Task::with(['assignedTo', 'assignedBy', 'taskStatus'])
            ->where('assigned_to', Auth::user()->id)
            ->whereNotIn('task_status_id', $hidden_task_statuses)
            ->orderBy('due_date', 'asc')->get();
        $assigned_by_me_to_others = 
            Task::with(['assignedTo', 'assignedBy', 'taskStatus'])
            ->where('assigned_by', Auth::user()->id)
            ->where('assigned_to', '<>', Auth::user()->id)
            ->whereNotIn('task_status_id', $hidden_task_statuses)
            ->orderBy('due_date', 'asc')->get();

        return compact('assigned_to_me_by_others', 'assigned_by_me_to_others');
    }
}
