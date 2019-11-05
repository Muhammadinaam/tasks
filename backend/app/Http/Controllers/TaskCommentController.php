<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\TaskComment;
use Auth;
use DB;

class TaskCommentController extends Controller
{
    public function store()
    {
        $task_id = request()->task_id;
        $comment = request()->task_comment;   
        
        $task_comment = new TaskComment();
        $task_comment->task_id = $task_id;
        $task_comment->comment = $comment;
        $task_comment->created_by = Auth::user()->id;

        $task_comment->save();

        return ['success' => true, 'message' => 'Task Comment posted successfully'];
    }
}
