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

        $common_query = Task::with(['assignedTo', 'assignedBy', 'taskStatus', 'taskComments.taskCommentReads', 'taskComments.createdBy'])
            ->whereNotIn('task_status_id', $hidden_task_statuses)
            ->orderBy('due_date', 'asc');

        $assigned_to_me_by_others = 
            (clone $common_query)
            ->where('assigned_to', Auth::user()->id)
            ->get();
        $assigned_by_me_to_others = 
            (clone $common_query)
            ->where('assigned_by', Auth::user()->id)
            ->where('assigned_to', '<>', Auth::user()->id)
            ->get();

        $other_users_tasks = [];

        if(Auth::user()->hasPermission('has_access_to_other_users_tasks'))
        {
            $other_users_tasks = 
                (clone $common_query)
                ->where('assigned_by', '<>', Auth::user()->id)
                ->where('assigned_to', '<>', Auth::user()->id)
                ->get();
        }

        return compact('assigned_to_me_by_others', 'assigned_by_me_to_others', 'other_users_tasks');
    }
}
